import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../application.service';

declare let $;

@Component({
    templateUrl: './general-registration.component.html'
})
export class GeneralRegistrationComponent implements OnInit {
    userId;
    formLoading = true;
    validate = false;
    modelChanged = false;

    registrationData: any;

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;

            this.applicationService.getUserApplicationData(this.userId, 24)
                .then((registration: any) => {
                    this.registrationData = registration;
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

    saveSection(currentPanel: string, nextPanel: string, applicationData: any) {
        this.formLoading = true;

        // Boolean values formatting before saving
        const booleanFields = [
            'acceptStudentManual', 'acceptOnlineManual', 'acceptPrivacyPolicy', 'financialLiabilityApproval'
        ];
        booleanFields.forEach(field => {
            const val = applicationData.application[field];
            if (val === true || val === '1') {
                applicationData.application[field] = '1';
            } else {
                applicationData.application[field] = '0';
            }
        });

        if (applicationData.application.hasContagiousDisease === '0') {
            applicationData.application.hasContagiousDisease = '0';
            applicationData.application.contagiousDiseaseDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, 24, applicationData)
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
            'regStudyModeInfo', 'regCourseSelectionInfo', 'regMedicalInfo', 'regContractInfo', 'regFinancialInfo'
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
        this.applicationService.submitUserApplication(this.userId, 24)
            .then(() => {
                this.formLoading = false;
                this.router.navigate(['/cp']);
            });
    }
}
