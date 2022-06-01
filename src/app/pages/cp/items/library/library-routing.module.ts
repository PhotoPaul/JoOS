import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { ResourceMateComponent } from './resource-mate/resource-mate.component';

const routes: Routes = [
    { path: 'books', data: { faIcon: 'fa-book', path_title_gr: 'Βιβλία', path_title_en: 'Books', roles: ['admin', 'librarian'] }, component: BooksComponent },
    { path: 'my-card', data: { faIcon: 'fa-address-card', path_title_gr: 'Κάρτα Βιβλιοθήκης', path_title_en: 'Library Card', roles: ['admin', 'librarian'] }, component: CardComponent },
    { path: 'cards', data: { faIcon: 'fa-address-card', path_title_gr: 'Κάρτες Βιβλιοθήκης', path_title_en: 'Library Cards', roles: ['admin', 'librarian'] }, component: CardsComponent },
    { path: 'card/:barcode', data: { faIcon: 'fa-address-card', path_title_gr: 'Κάρτα Βιβλιοθήκης', path_title_en: 'Library Card', roles: ['admin', 'librarian'] }, component: CardComponent },
    { path: 'resource-mate', data: { faIcon: 'fa-database', path_title_gr: 'ResourceMate', path_title_en: 'ResourceMate', roles: ['admin', 'librarian'] }, component: ResourceMateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LibraryRoutingModule { }
