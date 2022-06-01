import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../localization/localization.service';
import { AjaxResponse, AjaxService } from '../../../services/ajax.service';
import { OpenFormDataModel } from '../open-forms';

declare let $;

@Component({
    templateUrl: './letter-of-recommendation.component.html'
})
export class LetterOfRecommendationComponent implements OnInit {
    public referenceId: number;
    public formLoading = true;
    public validate = false;
    public submitted = false;
    public formData: OpenFormDataModel;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ajax: AjaxService,
        private localization: LocalizationService
    ) {}

    ngOnInit() {
        this.route.queryParams.forEach(async queryParams => {
            if (queryParams.lang) {
                localStorage.setItem('language', queryParams.lang);
                this.router.navigate(['/refresh', this.router.url]);
                return;
            }
            if (queryParams.token) {
                this.referenceId = queryParams.token;
                const response = (await this.ajax.get('getLetterOfRecommendationMetaData', { token: this.referenceId, language: this.localization.getActiveLanguage() })) as AjaxResponse;
                if (!response.data) {
                    this.router.navigate(['/auth/login']);
                    return;
                }
                // If a question doesn't have an active language translation switch to English
                if (response.data.questions.some(q => {
                    return q['title_' + this.localization.getActiveLanguage()] === null;
                })) {
                    localStorage.setItem('language', 'en');
                    this.router.navigate(['/refresh', this.router.url]);
                    return;
                }

                this.formLoading = false;
                response.data.meta.cityZipCountry = '';
                if (response.data.meta.city) { response.data.meta.cityZipCountry+= response.data.meta.city; }
                if (response.data.meta.zipCode) { response.data.meta.cityZipCountry+= ', ' + response.data.meta.zipCode; }
                if (response.data.meta.country) { response.data.meta.cityZipCountry+= ', ' + response.data.meta.country; }
                this.formData = response.data;
            } else {
                this.router.navigate(['/auth/login']);
            }
        });
    }

    checkForm() {
        this.validate = true;
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }

    submitForm() {
        this.formLoading = true;
        this.ajax.get('saveLetterOfRecommendationData', { token: this.referenceId, formData: this.formData, language: this.localization.getActiveLanguage() })
        .then((result) => {
            if (result) {
                this.submitted = true;
            }
        });
    }
}
