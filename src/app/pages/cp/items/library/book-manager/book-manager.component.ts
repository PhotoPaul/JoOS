import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { LibraryService } from '../library.service';

@Component({
    selector: 'book-manager',
    templateUrl: './book-manager.component.html'
})
export class BookManagerComponent implements OnInit {
    notFound: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        public libraryService: LibraryService
    ) { }

    ngOnInit() {
    }

    async onSubmit() {
        this.notFound = null;
        delete this.libraryService.book.title;
        this.changeDetectorRef.detectChanges();
        this.libraryService.book.barcode = this.libraryService.book.barcode.replace(/\D+/g, '');
        if (this.libraryService.book.barcode.length === 14) {
            if (await this.libraryService.getBookMeta() === false) {
                this.notFound = this.libraryService.book.barcode;
            }
        }
    }
}
