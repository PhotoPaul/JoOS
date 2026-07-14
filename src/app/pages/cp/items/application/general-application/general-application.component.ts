import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../application.service';
import { FinancesService } from '../../finances/finances.service';

declare let $;

@Component({
    templateUrl: './general-application.component.html'
})
export class GeneralApplicationComponent implements OnInit {
    userId;
    formLoading = true;
    validate = false;
    modelChanged = false;
    underage = false;
    maxDate: Date = new Date(new Date().getFullYear() - 16, 11, 31);
    orderUrl: string;

    // Aggregated form datasets
    personalData: any;
    educationData: any;
    healthData: any;
    christianLifeData: any;
    referencesData: any;
    financialData: any;
    documentsList: any[] = [];

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private financesService: FinancesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;

            // Concurrently load the General Application form, References, and Supporting Documents
            Promise.all([
                this.applicationService.getUserApplicationData(this.userId, 23).catch(() => null), // General Application
                this.applicationService.getUserApplicationData(this.userId, 5).catch(() => null), // References
                this.applicationService.getUserApplicationData(this.userId, 12).catch(() => null) // Supporting Documents
            ]).then(([general, references, documents]: any[]) => {
                this.personalData = general;
                this.educationData = general;
                this.healthData = general;
                this.christianLifeData = general;
                this.referencesData = references;
                this.financialData = general;

                if (this.financialData && this.financialData.application) {
                    if (this.financialData.application.financialApproval !== true && this.financialData.application.financialApproval !== '1') {
                        this.financialData.application.financialApproval = false;
                    }
                }

                if (documents && documents.application) {
                    this.documentsList = documents.application;
                }

                if (this.personalData && this.personalData.application) {
                    this.updateUnderage(this.personalData.application.birthDate);
                }

                if (this.financialData && this.financialData.application && this.financialData.application.deposit === '31') {
                    this.createOrder();
                }

                this.formLoading = false;
            });
        });
    }

    // Personal Form specific methods
    updateDateModel($event: Date | any) {
        if (this.personalData) {
            this.personalData.application.birthDate = this.financesService.getDateAsString($event);
            this.modelChanged = true;
            this.updateUnderage($event);
        }
    }

    updateUnderage(birthDate) {
        if (!birthDate) return;
        this.underage = ~~((Date.now() - new Date(birthDate).getTime()) / (31557600000)) < 18;
        if (!this.underage && this.personalData) {
            this.personalData.application.guardianFirstName = null;
            this.personalData.application.guardianLastName = null;
            this.personalData.application.guardianOccupation = null;
            this.personalData.application.guardianEmail = null;
            this.personalData.application.guardianPhone = null;
            this.personalData.application.guardianAddressSame = null;
            this.personalData.application.guardianAddress = null;
            this.personalData.application.guardianCity = null;
            this.personalData.application.guardianCountry = null;
            this.personalData.application.guardianOpinion = null;
        }
    }

    // References specific methods
    getDecisionColor(referenceId) {
        if (typeof referenceId === 'undefined' || referenceId === null) {
            return 'blue';
        } else if (referenceId === '0') {
            return 'red';
        } else {
            return 'green';
        }
    }

    // Financial specific methods
    createOrder() {
        if (!this.financialData) return;
        this.formLoading = true;
        this.applicationService.vivaCreateOrder({
            Amount: 30,
            CustomerTrns: 'Παράβολο Επεξεργασίας Αίτησης Εγγραφής',
            RequestLang: 'el-GR',
            PaymentTimeOut: 7776000 // 90 days
        })
            .then((orderUrl: string) => {
                this.modelChanged = false;
                this.orderUrl = orderUrl;
                this.formLoading = false;
            });
    }

    openOrder() {
        if (this.orderUrl) {
            window.open(this.orderUrl);
            this.orderUrl = null;
        }
    }

    collapsePanel(currentPanel: string, nextPanel: string) {
        if (currentPanel) {
            $(`#${currentPanel}`).collapse('hide');
        }
        if (nextPanel) {
            $(`#${nextPanel}`).collapse('show');
        }
    }

    // Unified step progression and auto-save handler
    saveSection(currentPanel: string, nextPanel: string, formId: number, applicationData: any) {
        this.formLoading = true;

        // Clone applicationData to avoid mutating the in-memory Angular model
        const payload = JSON.parse(JSON.stringify(applicationData));

        // Perform standard conditional fields sanitization before saving
        if (formId === 1) {
            this.updateUnderage(payload.application.birthDate);
            if (payload.application.greekCitizen === '1') {
                payload.application.citizenship = null;
                payload.application.euCitizen = null;
                payload.application.passportNumber = null;
                payload.application.residencePermit = null;
            } else {
                payload.application.greekIdNumber = null;
                if (payload.application.euCitizen === '1') {
                    payload.application.residencePermit = null;
                }
            }
            payload.application.familySpouseFirstName = null;
            payload.application.familySpouseLastName = null;
            payload.application.familyKids = null;
            payload.application.familyKidsNamesAges = null;
        } else if (formId === 2) {
            payload.application.elementaryName = null;
            payload.application.elementaryGraduationYear = null;
            payload.application.middleSchoolName = null;
            payload.application.middleSchoolGraduationYear = null;
            if (payload.application.secondarySchoolGraduate === '0' || payload.application.secondarySchoolGraduate === 0 || !payload.application.secondarySchoolGraduate) {
                payload.application.secondarySchoolName = null;
                payload.application.secondarySchoolGraduationYear = null;
                payload.application.secondarySchoolDiscipline = null;
            }
            payload.application.presentationFluency = null;
        } else if (formId === 3) {
            const booleanFields = [
                'tonsillitis', 'chickenPox', 'bronchialAsthma', 'diphtheria', 'epilepsy',
                'rubella', 'measles', 'yellowFever', 'meningitis', 'mumps', 'polio', 'cholera',
                'heartAbnormality', 'otherDiseases',
                'tuberculosis', 'pneumonia', 'asthma', 'heartDiseases', 'hypertension',
                'gastricUlcer', 'kidneyDiseases', 'diabetes', 'liverDiseases', 'rheumatism',
                'anemia', 'cancer', 'physicalDisability', 'gallbladderDiseases',
                'drugsUse'
            ];
            booleanFields.forEach(field => {
                const val = payload.application[field];
                if (val === true || val === '1') {
                    payload.application[field] = '1';
                } else {
                    payload.application[field] = '0';
                }
            });

            if (payload.application.otherDiseases === '0') {
                payload.application.otherDiseasesDetails = null;
            }
            if (payload.application.drugsUse === '0') {
                payload.application.drugsUseDetails = null;
            }
            if (payload.application.currentDiseases === '0') {
                payload.application.currentDiseasesDetails = null;
            }
            if (payload.application.currentSymptoms === '0') {
                payload.application.currentSymptomsDetails = null;
            }
            if (payload.application.currentMedicines === '0') {
                payload.application.currentMedicinesDetails = null;
            }
            if (payload.application.foodAllergy === '0') {
                payload.application.foodAllergyDetails = null;
            }
            payload.application.doctor = '0';
            payload.application.doctorFirstName = null;
            payload.application.doctorLastName = null;
            payload.application.doctorPhone = null;
            payload.application.doctorAddress = null;
            payload.application.doctorCity = null;
            payload.application.doctorZipCode = null;
            payload.application.doctorCountry = null;
            payload.application.doctorContactApproval = null;
        } else if (formId === 4) {
            const booleanFields = ['statementOfFaithApproval', 'churchMember'];
            booleanFields.forEach(field => {
                const val = payload.application[field];
                if (val === true || val === '1') {
                    payload.application[field] = '1';
                } else {
                    payload.application[field] = '0';
                }
            });
            if (payload.application.churchMember === '0') {
                payload.application.churchMemberHowLong = null;
            }
        } else if (formId === 6) {
            payload.application.selfPaid = null;
            payload.application.sponsors = null;
            payload.application.sponsorsTotal = null;
            payload.application.debtApproval = null;
            payload.application.programInterested = 'other';
        }

        const targetFormId = (formId === 5) ? 5 : 23;
        this.applicationService.saveUserApplicationData(this.userId, targetFormId, payload)
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

        // Find all panels that contain invalid elements
        const panels = [
            'idInfo', 'guardianInfo',
            'educationInfo',
            'currentHealthInfo',
            'testimonyInfo',
            'recommendationsInfo',
            'studentPackage', 'financialInfo', 'depositInfo'
        ];

        panels.forEach(id => {
            const panelEl = $(`#${id}`);
            // Check if there's any element inside this panel with class 'ng-invalid'
            const hasInvalidElements = panelEl.find('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').length > 0;
            if (hasInvalidElements) {
                panelEl.collapse('show');
            }
        });

        setTimeout(() => {
            const firstInvalid = $('input.ng-invalid, select.ng-invalid, textarea.ng-invalid').first();
            console.log('First invalid element:', firstInvalid);
            if (firstInvalid.length > 0) {
                let scrollToEl = firstInvalid;
                if (firstInvalid.attr('type') === 'hidden' || firstInvalid.is(':hidden')) {
                    const formGroup = firstInvalid.closest('.form-group');
                    if (formGroup.length > 0) {
                        scrollToEl = formGroup;
                    }
                }
                $('html, body').animate({
                    scrollTop: scrollToEl.offset().top - 100
                }, 500);
            }
        }, 500);
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        const activeFormIds = [];
        if (this.referencesData) activeFormIds.push(5);
        activeFormIds.push(23);

        const submissions = activeFormIds.map(id => this.applicationService.submitUserApplication(this.userId, id));

        Promise.all(submissions)
            .then(() => {
                this.formLoading = false;
                this.router.navigate(['/cp']);
            });
    }
}
