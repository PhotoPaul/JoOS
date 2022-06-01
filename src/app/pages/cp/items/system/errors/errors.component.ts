import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Component({
    templateUrl: 'errors.component.html'
})
export class ErrorsComponent implements OnInit {
    errors: SystemError[];
    constructor(public ajax: AjaxService, private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.ajax.get('getOpenSystemErrors')
            .then((response: AjaxResponse) => {
                if (response.data) {
                    this.errors = response.data.map((error) => {
                        error.message = this.sanitizer.bypassSecurityTrustHtml(error.message);
                        return error;
                    });
                }
            });
    }

    getFileLine(error) {
        let file = error.file ? error.file : '';
        file = file.replace(/\\/g, '/');
        file = file.split('/');
        file = file[file.length - 1];
        return file + ' :' + (error.line ? error.line : 0);
    }

    clearErrors($this) {
        this.ajax.get('clearErrors')
            .then(() => {
                this.errors = null;
                $this.ajax.state = 'idle';
            });
    }
}

export interface SystemError {
    id: number;
    source: string;
    userId: number;
    firstName: string;
    lastName: string;
    message: string;
    uri: string;
    file: string;
    line: string;
    dateTime: string;
    open: boolean;
}
