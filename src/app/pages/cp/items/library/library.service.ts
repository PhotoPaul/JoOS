import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { ModalService } from '../../../../ui/modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    public book: Book = {};
    public libraryUser: LibraryCard;
    public reservedBooks: Book[] = [];
    public libraryCards: LibraryCard[];
    public users: User[];
    public libraryUserCategories = [] as LibraryUserCategory[];
    public checkedOutBooks: LibraryCard[];
    public activeRecords: CheckoutRecord[];
    public historicalRecords: CheckoutRecord[];

    constructor(
        private router: Router,
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    async getBookMeta() {
        const book = (await this.ajax.get('getBookMeta', { barcode: this.book.barcode }) as AjaxResponse).data;
        if (book.length) {
            this.book = book[0];
            return true;
        } else {
            return false;
        }
    }

    async getReservedBooks() {
        this.reservedBooks = (await this.ajax.get('getReservedBooks') as AjaxResponse).data;
    }

    async removeBook(barcode) {
        this.modalService.show({
            type: 'yesNo',
            message: 'removeBookConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                await this.ajax.get('removeBook', { barcode: barcode });
                // Update Book Manager
                this.book = {};
                // Update Reserved Books
                this.reservedBooks.some((book, i) => {
                    if (this.reservedBooks[i].barcode === barcode) {
                        this.reservedBooks = this.reservedBooks.slice(i, 1);
                        return true;
                    }
                });
                modalRef.hide();
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
            }
        });
    }

    async reserveBook(barcode) {
        const reservedBookId = (await this.ajax.get('reserveBook', { barcode: barcode }) as AjaxResponse).data.reservedBookId;
        // Update Book Manager
        if (this.book.barcode === barcode) {
            this.book.reservedBookId = reservedBookId;
        }
        // Update Reserved Books if known
        const known = this.reservedBooks.some((book, i) => {
            if (this.reservedBooks[i].barcode === barcode) {
                this.reservedBooks[i].reservedBookId = reservedBookId;
                return true;
            }
        });
        // Update Reserved Books if not known
        if (!known) {
            this.reservedBooks.unshift(this.book);
        }
        return reservedBookId;
    }

    async unreserveBook(barcode) {
        await this.ajax.get('unreserveBook', { barcode: barcode });
        // Update Book Manager
        if (this.book.barcode === barcode) {
            this.book.reservedBookId = null;
        }
        // Update Reserved Books
        this.reservedBooks.some((book, i) => {
            if (this.reservedBooks[i].barcode === barcode) {
                this.reservedBooks[i].reservedBookId = null;
                return true;
            }
        });
    }

    async renewBook(barcode, actionButtonComponent) {
        const book = (await this.ajax.get('renewBook', { barcode: barcode }) as AjaxResponse).data;
        this.modalService.show({
            type: 'ok',
            title: 'bookRenewedTitle',
            message: ['bookRenewed', book.due_date],
        });
        this.activeRecords.some((record, i) => {
            if (record.book_barcode === barcode) {
                this.activeRecords[i].due_date = book.due_date;
                this.activeRecords[i].daysLeft = book.daysLeft;
                return true;
            }
        });
        actionButtonComponent.ajax.state = 'idle';
    }

    showBook(barcode) {
        window.open('https://www.grbc.gr/library/?barcode=' + barcode);
    }

    async getLibraryCards() {
        this.libraryCards = (await this.ajax.get('getLibraryCards') as AjaxResponse).data;
    }

    async getLibraryCardInputData() {
        const libraryCardInputData = await this.ajax.get(['getUsersForLibrary', 'getUserCategoriesForLibrary']);
        this.users = libraryCardInputData[0].data;
        this.libraryUserCategories = libraryCardInputData[1].data;
    }

    async saveLibraryCard(libraryCardModel) {
        return (await this.ajax.get('saveLibraryCard', { libraryCardModel }) as AjaxResponse).data;
    }

    async enableLibraryCard(barcode) {
        await this.ajax.get('enableLibraryCard', { 'barcode': barcode });
        this.libraryCards.some((card, i) => {
            if (card.barcode === barcode) {
                this.libraryCards[i].enabled = '1';
                return true;
            }
        });
    }

    async disableLibraryCard(barcode) {
        await this.ajax.get('disableLibraryCard', { 'barcode': barcode });
        this.libraryCards.some((card, i) => {
            if (card.barcode === barcode) {
                this.libraryCards[i].enabled = '0';
                return true;
            }
        });
    }

    showLibraryCardHistory(barcode) {
        this.router.navigate(['cp/library/card', barcode]);
    }

    async getRecordsForLibraryCard(barcode) {
        return (await this.ajax.get('getRecordsForLibraryCard', { barcode: barcode }) as AjaxResponse).data;
    }

    async getCheckedOutBooks() {
        this.checkedOutBooks = (await this.ajax.get('getCheckedOutBooks') as AjaxResponse).data;
    }

    getMyCheckedOutBooksColor(libraryMyCheckedOutBooksStatus) {
        if (libraryMyCheckedOutBooksStatus < 0) {
            return 'red';
        } else if (libraryMyCheckedOutBooksStatus !== null && libraryMyCheckedOutBooksStatus <= 3) {
            return 'orange';
        } else {
            return 'green';
        }
    }

    getMyCheckedOutBookColor(daysLeft) {
        if (daysLeft < 0) {
            return 'red';
        } else if (daysLeft <= 3) {
            return 'orange';
        } else {
            return 'green';
        }
    }

    canRenew(record) {
        if (record.daysLeft < 0 || record.daysLeft > 3 || record.reservedBookId) {
            return false;
        } else {
            return true;
        }
    }
}

interface Book {
    barcode?: string;
    title?: string;
    subtitle?: string;
    reservedBookId?: boolean;
}

export interface LibraryCard {
    barcode: string;
    user_barcode?: string;
    userId: number;
    photoURI?: string;
    first: string;
    last: string;
    email: string;
    categoryName: string;
    categoryCredits: number;
    categoryDays: number;
    credits: number;
    type: number;
    enabled: string;
    checkedOutBooks?: CheckoutRecord[];
    hasExpiredBooks?: boolean;
}

interface LibraryUserCategory {
    categoryId: number;
    name: string;
    credits: number;
    days: number;
}
interface CheckoutRecord {
    book_barcode: number;
    title: string;
    subtitle?: string;
    date_out: string;
    due_date: string;
    date_in?: string;
    daysLeft?: number;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photoURI: string;
}
