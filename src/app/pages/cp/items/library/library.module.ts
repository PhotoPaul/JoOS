import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../../../localization/localization.module';
import { UIModule } from '../../../../ui/ui.module';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { BooksComponent } from './books/books.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { LibraryRoutingModule } from './library-routing.module';
import { ReservedBooksComponent } from './reserved-books/reserved-books.component';
import { CheckedOutBooksComponent } from './checked-out-books/checked-out-books.component';
import { ResourceMateComponent } from './resource-mate/resource-mate.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        LibraryRoutingModule
    ],
    declarations: [
        CardsComponent,
        CardComponent,
        ReservedBooksComponent,
        BooksComponent,
        BookManagerComponent,
        CheckedOutBooksComponent,
        ResourceMateComponent
    ]
})
export class LibraryModule { }
