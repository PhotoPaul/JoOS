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

    needsCourseEnrollment(): boolean {
        if (!this.registrationData || !this.registrationData.application) {
            return false;
        }
        const app = this.registrationData.application;
        if (app.studyMode === 'greek') {
            if (app.greekTrack === 'online') {
                return true;
            }
            if (app.greekTrack === 'in-person' && (app.greekLoad === 'part-time' || app.greekLoad === 'auditor')) {
                return true;
            }
        }
        return false;
    }

    saveSection(currentPanel: string, nextPanel: string, applicationData: any) {
        this.formLoading = true;

        // Clone applicationData to avoid mutating the in-memory Angular model
        const payload = JSON.parse(JSON.stringify(applicationData));

        // Clean up fields based on studyMode branches
        if (payload.application.studyMode === 'greek') {
            payload.application.ispLoad = null;
            payload.application.ispTrack = null;
            payload.application.ispResidence = null;

            if (payload.application.greekTrack === 'online') {
                payload.application.greekLoad = null;
                payload.application.greekDuration = null;
                payload.application.greekResidence = null;
            } else if (payload.application.greekTrack === 'in-person') {
                if (payload.application.greekLoad !== 'full-time') {
                    payload.application.greekDuration = null;
                }
                if (payload.application.greekLoad === 'auditor') {
                    payload.application.greekResidence = null;
                }
            }
        } else if (payload.application.studyMode === 'isp') {
            payload.application.greekTrack = null;
            payload.application.greekLoad = null;
            payload.application.greekDuration = null;
            payload.application.greekResidence = null;

            if (payload.application.ispLoad === 'full-time') {
                payload.application.ispTrack = null;
            }
        }

        // If courses are not needed for this study mode, clear course fields
        if (!this.needsCourseEnrollment()) {
            payload.application.course1Sem1 = null;
            payload.application.course2Sem1 = null;
            payload.application.course3Sem1 = null;
            payload.application.course4Sem1 = null;
            payload.application.course1Sem2 = null;
            payload.application.course2Sem2 = null;
            payload.application.course3Sem2 = null;
            payload.application.course4Sem2 = null;
            payload.application.coursesOther = null;
            payload.application.coursesAuditor = null;
        } else {
            // If auditor, clear regular course fields; if regular, clear auditor course fields
            if (payload.application.greekLoad === 'auditor') {
                payload.application.course1Sem1 = null;
                payload.application.course2Sem1 = null;
                payload.application.course3Sem1 = null;
                payload.application.course4Sem1 = null;
                payload.application.course1Sem2 = null;
                payload.application.course2Sem2 = null;
                payload.application.course3Sem2 = null;
                payload.application.course4Sem2 = null;
                payload.application.coursesOther = null;
            } else {
                payload.application.coursesAuditor = null;
            }
        }

        // Boolean values formatting before saving
        const booleanFields = [
            'acceptStudentManual', 'acceptOnlineManual', 'acceptPrivacyPolicy', 'financialLiabilityApproval'
        ];
        booleanFields.forEach(field => {
            const val = payload.application[field];
            if (val === true || val === '1') {
                payload.application[field] = '1';
            } else {
                payload.application[field] = '0';
            }
        });

        if (payload.application.hasContagiousDisease === '0') {
            payload.application.hasContagiousDisease = '0';
            payload.application.contagiousDiseaseDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, 24, payload)
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
