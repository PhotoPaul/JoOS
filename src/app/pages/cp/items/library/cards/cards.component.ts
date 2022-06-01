import { Component, OnInit } from '@angular/core';

import { LibraryCard, LibraryService } from '../library.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {
    libraryCardInputVisible: boolean;
    libraryCardInputIsEdit: boolean;
    libraryCardModel = this.initLibraryCardModel();

    constructor(public libraryService: LibraryService) { }

    initLibraryCardModel() {
        return {
            barcode: '',
            photoURI: '',
            userId: null,
            first: '',
            last: '',
            email: '',
            type: null,
            categoryName: '',
            categoryCredits: 0,
            categoryDays: 0,
            credits: 0,
            enabled: '1'
        };
    }

    ngOnInit() {
        this.libraryService.getLibraryCards();
    }

    showLibraryCardInput(libraryCard: LibraryCard) {
        if (libraryCard) {
            this.libraryCardInputIsEdit = true;
            this.libraryCardModel = {
                barcode: libraryCard.barcode,
                photoURI: libraryCard.photoURI,
                userId: libraryCard.userId,
                first: libraryCard.first,
                last: libraryCard.last,
                email: libraryCard.email,
                type: libraryCard.type,
                categoryName: libraryCard.categoryName,
                categoryCredits: libraryCard.categoryCredits,
                categoryDays: libraryCard.categoryDays,
                credits: libraryCard.credits,
                enabled: libraryCard.enabled
            };
        } else {
            this.libraryCardInputIsEdit = false;
            this.libraryCardModel = this.initLibraryCardModel();
        }
        this.libraryCardInputVisible = true;
        this.libraryService.getLibraryCardInputData();
    }

    updateLibraryCardFromUser(userId) {
        if (userId !== 'null') {
            const userSelected = this.libraryService.users.find(user => {
                return user.id === userId;
            });
            this.libraryCardModel.first = userSelected.firstName;
            this.libraryCardModel.last = userSelected.lastName;
            this.libraryCardModel.email = userSelected.email;
            this.libraryCardModel.photoURI = userSelected.photoURI;
        } else {
            this.libraryCardModel.userId = null;
            this.libraryCardModel.first = '';
            this.libraryCardModel.last = '';
            this.libraryCardModel.email = '';
        }
    }

    updateCreditsFromUserCategory(categoryId) {
        const categorySelected = this.libraryService.libraryUserCategories.find(category => category.categoryId === categoryId);
        this.libraryCardModel.categoryName = categorySelected.name;
        this.libraryCardModel.categoryCredits = categorySelected.credits;
        this.libraryCardModel.categoryDays = categorySelected.days;
    }

    async libraryCardInputSubmit() {
        this.libraryCardInputVisible = false;
        const creditsLeft = await this.libraryService.saveLibraryCard(this.libraryCardModel);
        if (this.libraryCardInputIsEdit) {
            this.libraryService.libraryCards.some((libraryCard, i) => {
                if (this.libraryCardModel.barcode === this.libraryService.libraryCards[i].barcode) {
                    this.libraryService.libraryCards[i] = {
                        barcode: this.libraryCardModel.barcode,
                        photoURI: this.libraryCardModel.photoURI,
                        userId: this.libraryCardModel.userId,
                        first: this.libraryCardModel.first,
                        last: this.libraryCardModel.last,
                        email: this.libraryCardModel.email,
                        type: this.libraryCardModel.type,
                        categoryName: this.libraryCardModel.categoryName,
                        categoryCredits: this.libraryCardModel.categoryCredits,
                        categoryDays: this.libraryCardModel.categoryDays,
                        credits: creditsLeft,
                        enabled: this.libraryCardModel.enabled
                    };
                    return true;
                }
            });
        } else {
            this.libraryService.libraryCards.unshift(this.libraryCardModel as LibraryCard);
        }
    }
}
