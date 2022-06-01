import { Component, OnInit } from '@angular/core';

import { LibraryService } from '../library.service';

@Component({
    selector: 'checked-out-books',
    templateUrl: './checked-out-books.component.html'
})
export class CheckedOutBooksComponent implements OnInit {
    constructor(
        public libraryService: LibraryService
    ) { }

    async ngOnInit() {
        this.libraryService.getCheckedOutBooks();
    }

    hasExpiredBooks(card) {
        if (card.hasExpiredBooks === undefined) {
            if (card.checkedOutBooks && card.checkedOutBooks.some(book => {
                if ((new Date(book.due_date)).valueOf() - (new Date()).valueOf() < 0) {
                    return true;
                }
            })) {
                card.hasExpiredBooks = true;
            }
        }
        return card.hasExpiredBooks ? 'portlet-red' : 'portlet-green';
    }

    getStatusClass(expired) {
        expired = true;
        if (expired) {
            return 'transaction-payment';
        } else if (!expired) {
            return 'transaction-charge';
        }
    }
}
