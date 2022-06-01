import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LibraryService } from '../library.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
    barcode: string;

    constructor(
        private route: ActivatedRoute,
        public libraryService: LibraryService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            this.barcode = params.barcode;
            const allRecords = await this.libraryService.getRecordsForLibraryCard(params.barcode);
            this.libraryService.libraryUser = allRecords.libraryUser;
            this.libraryService.activeRecords = allRecords.activeRecords;
            this.libraryService.historicalRecords = allRecords.historicalRecords;
        });
    }
}
