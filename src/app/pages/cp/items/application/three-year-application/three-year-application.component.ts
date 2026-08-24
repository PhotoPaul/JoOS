import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../application.service';

declare let $;

@Component({
    templateUrl: './three-year-application.component.html'
})
export class ThreeYearApplicationComponent implements OnInit {
    userId;
    formLoading = true;
    validate = false;
    modelChanged = false;

    applicationData: any;

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;

            this.applicationService.getUserApplicationData(this.userId, 25)
                .then((appData: any) => {
                    this.applicationData = appData;
                    this.formLoading = false;
                }).catch(() => {
                    this.formLoading = false;
                });
        });
    }

    collapsePanel(currentPanel: string, nextPanel: string) {
        if (currentPanel) {
            $(`#${currentPanel}`).collapse('hide');
        }
        if (nextPanel) {
            $(`#${nextPanel}`).collapse('show');
        }
    }

    saveSection(currentPanel: string, nextPanel: string, appData: any) {
        this.formLoading = true;

        // Boolean mapping
        const booleanFields = [
            'schoolRegulationsAgreement', 'academicDirectorApproval', 'generalDirectorApproval'
        ];
        booleanFields.forEach(field => {
            const val = appData.application[field];
            if (val === true || val === '1') {
                appData.application[field] = '1';
            } else {
                appData.application[field] = '0';
            }
        });

        if (appData.application.maritalStatus !== 'maritalStatusChanged') {
            appData.application.maritalStatusDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, 25, appData)
            .then(() => {
                this.modelChanged = false;
                if (currentPanel) {
                    $(`#${currentPanel}`).collapse('hide');
                }
                if (nextPanel) {
                    $(`#${nextPanel}`).collapse('show');
                }
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        
        const panels = [
            'threeYearIdentityInfo', 'threeYearFinancialInfo', 'threeYearCallingInfo', 'threeYearSubmissionInfo'
        ];

        panels.forEach(id => {
            const panelEl = $(`#${id}`);
            const hasInvalidElements = panelEl.find('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').length > 0;
            if (hasInvalidElements) {
                panelEl.collapse('show');
            }
        });

        setTimeout(() => {
            const firstInvalid = $('input.ng-invalid:visible, select.ng-invalid:visible, textarea.ng-invalid:visible').first();
            if (firstInvalid.length > 0) {
                $('html, body').animate({
                    scrollTop: firstInvalid.offset().top - 100
                }, 500);
            }
        }, 500);
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        this.applicationService.submitUserApplication(this.userId, 25)
            .then(() => {
                this.formLoading = false;
                this.router.navigate(['/cp']);
            });
    }
}
