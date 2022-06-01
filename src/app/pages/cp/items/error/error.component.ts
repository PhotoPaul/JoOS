import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AjaxService } from '../../../../services/ajax.service';

@Component({
    templateUrl: 'error.component.html'
})
export class ErrorComponent implements OnInit {
    errorReason: SafeHtml;
    latestRequest: SafeHtml;

    constructor(
        public ajax: AjaxService,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        this.errorReason = this.sanitizer.bypassSecurityTrustHtml(this.ajax.errorReason);
        this.latestRequest = this.sanitizer.bypassSecurityTrustHtml(this.ajax.latestRequest);
    }
}
