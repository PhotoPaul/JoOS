import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';
import { LocalizationService } from '../../../../../../localization/localization.service';
import { CITIZENSHIP_COUNTRIES } from '../../general-application/components/personal-info-form/countries';

declare let $;

@Component({
    templateUrl: './references.component.html'
})
export class ISPReferencesComponent implements OnInit {
    userId;
    applicationId = 11;
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    modelChanged = false;

    countries = CITIZENSHIP_COUNTRIES;

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private router: Router,
        private localizationService: LocalizationService
    ) { }

    get isEnglish(): boolean {
        return this.localizationService.getActiveLanguage() === 'en';
    }

    get sortedCountries() {
        const isEng = this.isEnglish;
        return [...this.countries].sort((a, b) => {
            const nameA = isEng ? a.en : a.gr;
            const nameB = isEng ? b.en : b.gr;
            return nameA.localeCompare(nameB, isEng ? 'en' : 'el');
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            this.applicationService.getUserApplicationData(this.userId, this.applicationId)
            .then((applicationData: ApplicationData) => {
                if (applicationData) {
                    this.applicationData = applicationData;
                }
                this.formLoading = false;
            });
        });
    }

    getDecisionColor(referenceId) {
        if (typeof referenceId === 'undefined' || referenceId === null) {
            return 'blue';
        } else if (referenceId === '0') {
            return 'red';
        } else {
            return 'green';
        }
    }

    firstReferenceInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#firstReferenceInfo').collapse('hide');
                $('#secondReferenceInfo').collapse('show');
                this.formLoading = false;
            });
    }

    secondReferenceInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#secondReferenceInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#firstReferenceInfo').collapse('show');
        $('#secondReferenceInfo').collapse('show');
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        this.applicationService.submitUserApplication(this.userId, this.applicationId)
        .then(() => {
            this.router.navigate(['/cp']);
        });
    }
}
