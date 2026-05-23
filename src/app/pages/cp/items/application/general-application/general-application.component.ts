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

            // Concurrently load all Greek application forms and supporting documents
            Promise.all([
                this.applicationService.getUserApplicationData(this.userId, 1).catch(() => null), // Personal
                this.applicationService.getUserApplicationData(this.userId, 2).catch(() => null), // Education
                this.applicationService.getUserApplicationData(this.userId, 3).catch(() => null), // Health
                this.applicationService.getUserApplicationData(this.userId, 4).catch(() => null), // Christian Life
                this.applicationService.getUserApplicationData(this.userId, 5).catch(() => null), // References
                this.applicationService.getUserApplicationData(this.userId, 6).catch(() => null), // Financial
                this.applicationService.getUserApplicationData(this.userId, 12).catch(() => null) // Supporting Documents
            ]).then(([personal, education, health, christianLife, references, financial, documents]: any[]) => {
                this.personalData = personal;
                this.educationData = education;
                this.healthData = health;
                this.christianLifeData = christianLife;
                this.referencesData = references;
                this.financialData = financial;

                if (documents && documents.application) {
                    this.documentsList = documents.application;
                }

                if (this.personalData) {
                    this.updateUnderage(this.personalData.application.birthDate);
                }

                if (this.financialData && this.financialData.application.deposit === '31') {
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

        // Perform standard conditional fields sanitization before saving
        if (formId === 1) {
            this.updateUnderage(applicationData.application.birthDate);
            if (applicationData.application.greekCitizen === '1') {
                applicationData.application.citizenship = null;
                applicationData.application.euCitizen = null;
                applicationData.application.passportNumber = null;
                applicationData.application.residencePermit = null;
            } else {
                applicationData.application.greekIdNumber = null;
                if (applicationData.application.euCitizen === '1') {
                    applicationData.application.residencePermit = null;
                }
            }
            applicationData.application.familySpouseFirstName = null;
            applicationData.application.familySpouseLastName = null;
            applicationData.application.familyKids = null;
            applicationData.application.familyKidsNamesAges = null;
        } else if (formId === 2) {
            applicationData.application.elementaryName = null;
            applicationData.application.elementaryGraduationYear = null;
            applicationData.application.middleSchoolName = null;
            applicationData.application.middleSchoolGraduationYear = null;
        } else if (formId === 3) {
            if (applicationData.application.otherDiseases === '0') {
                applicationData.application.otherDiseasesDetails = null;
            }
            if (applicationData.application.otherVaccines === '0') {
                applicationData.application.otherVaccinesDetails = null;
            }
            if (applicationData.application.drugsUse === '0') {
                applicationData.application.drugsUseDetails = null;
            }
            if (applicationData.application.currentDiseases === '0') {
                applicationData.application.currentDiseasesDetails = null;
            }
            if (applicationData.application.currentSymptoms === '0') {
                applicationData.application.currentSymptomsDetails = null;
            }
            if (applicationData.application.currentMedicines === '0') {
                applicationData.application.currentMedicinesDetails = null;
            }
            if (applicationData.application.foodAllergy === '0') {
                applicationData.application.foodAllergyDetails = null;
            }
            if (applicationData.application.doctor === '0') {
                applicationData.application.doctorFirstName = null;
                applicationData.application.doctorLastName = null;
                applicationData.application.doctorPhone = null;
                applicationData.application.doctorAddress = null;
                applicationData.application.doctorCity = null;
                applicationData.application.doctorZipCode = null;
                applicationData.application.doctorCountry = null;
                applicationData.application.doctorContactApproval = null;
            }
        } else if (formId === 4) {
            if (applicationData.application.churchMember === '0') {
                applicationData.application.churchMemberHowLong = null;
            }
        } else if (formId === 6) {
            if (applicationData.application.selfPaid === '1') {
                applicationData.application.sponsors = null;
                applicationData.application.sponsorsTotal = null;
                applicationData.application.debtApproval = null;
            }
        }

        this.applicationService.saveUserApplicationData(this.userId, formId, applicationData)
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
        // Expand all panels for user correction
        const panels = [
            'idInfo', 'addressInfo', 'guardianInfo',
            'primarySecondaryEducationInfo', 'languagesInfo', 'higherEducationInfo',
            'healthHistoryInfo', 'drugsUseInfo', 'currentHealthInfo', 'emergencyContactsInfo',
            'churchMinistryInfo', 'testimonyInfo',
            'firstReferenceInfo', 'secondReferenceInfo', 'thirdReferenceInfo',
            'studentPackage', 'depositInfo', 'financialInfo'
        ];
        panels.forEach(id => {
            $(`#${id}`).collapse('show');
        });
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        const activeFormIds = [];
        if (this.personalData) activeFormIds.push(1);
        if (this.educationData) activeFormIds.push(2);
        if (this.healthData) activeFormIds.push(3);
        if (this.christianLifeData) activeFormIds.push(4);
        if (this.referencesData) activeFormIds.push(5);
        if (this.financialData) activeFormIds.push(6);

        const submissions = activeFormIds.map(id => this.applicationService.submitUserApplication(this.userId, id));

        Promise.all(submissions)
            .then(() => {
                this.formLoading = false;
                this.router.navigate(['/cp']);
            });
    }
}
