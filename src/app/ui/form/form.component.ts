import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LocalizationService } from '../../localization/localization.service';
import { AjaxResponse, AjaxService } from '../../services/ajax.service';

declare let $;

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
    @Input() formData: FormData;
    @Output() onSubmitSuccess = new EventEmitter();

    formLoading = false;
    validate = false;

    constructor(private ajax: AjaxService, private localization: LocalizationService) { }

    ngOnInit() {}

    checkForm() {
        this.validate = true;
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }

    async submitForm() {
        this.formLoading = true;
        const result = (await this.ajax.get('submitForm', this.formData) as AjaxResponse).data;
        if (result) {
            this.onSubmitSuccess.emit(this.formData);
        }
    }
}

export interface FormData {
    id: string;
    heading: string;
    submitText: string;
    questions: [{
        questionId: number;
        title_en: string;
        title_gr: string;
        type: number;
    }];
}
