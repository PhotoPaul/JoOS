import { Component, OnInit } from '@angular/core';

import { LibraryService } from '../library.service';

@Component({
    selector: 'reserved-books',
    templateUrl: './reserved-books.component.html'
})
export class ReservedBooksComponent implements OnInit {
    constructor(
        public libraryService: LibraryService
    ) { }

    async ngOnInit() {
        this.libraryService.getReservedBooks();
    }
}
