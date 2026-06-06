import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: 'health.component.html'
})
export class HealthComponent implements OnInit {
    userId;
    applicationId = 3;
    applicationData: ApplicationData;
    documentsList: any[] = [];
    formLoading = true;
    validate = false;
    modelChanged = false;

    constructor(private route: ActivatedRoute, public applicationService: ApplicationService, private router: Router) { }

    sanitizeData() {
        if (!this.applicationData || !this.applicationData.application) return;
        const booleanFields = [
            'tonsillitis', 'chickenPox', 'bronchialAsthma', 'diphtheria', 'epilepsy',
            'rubella', 'measles', 'yellowFever', 'meningitis', 'mumps', 'polio', 'cholera',
            'heartAbnormality', 'otherDiseases', 'vaccineDiphtheria', 'vaccinePertussis',
            'vaccineTetanus', 'vaccineSmallpox', 'vaccineRubella', 'vaccineMeasles',
            'vaccineMumps', 'vaccinePolio', 'vaccineCholera', 'otherVaccines',
            'tuberculosis', 'pneumonia', 'asthma', 'heartDiseases', 'hypertension',
            'gastricUlcer', 'kidneyDiseases', 'diabetes', 'liverDiseases', 'rheumatism',
            'anemia', 'cancer', 'physicalDisability', 'gallbladderDiseases',
            'tetanusVaccine', 'diphtheriaVaccine', 'pertussisVaccine', 'polioVaccine',
            'measlesVaccine', 'mumpsVaccine', 'rubellaVaccine', 'drugsUse'
        ];
        booleanFields.forEach(field => {
            const val = this.applicationData.application[field];
            if (val === true || val === '1') {
                this.applicationData.application[field] = '1';
            } else {
                this.applicationData.application[field] = '0';
            }
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            Promise.all([
                this.applicationService.getUserApplicationData(this.userId, this.applicationId),
                this.applicationService.getUserApplicationData(this.userId, 12).catch(() => null)
            ]).then(([applicationData, documents]: any[]) => {
                if (applicationData) {
                    this.applicationData = applicationData;
                    this.sanitizeData();
                }
                if (documents && documents.application) {
                    this.documentsList = documents.application;
                }
                this.formLoading = false;
            });
        });
    }

    healthHistoryInfoOnSubmit() {
        this.formLoading = true;
        this.sanitizeData();
        if (this.applicationData.application.otherDiseases === '0') {
            this.applicationData.application.otherDiseasesDetails = null;
        }
        if (this.applicationData.application.otherVaccines === '0') {
            this.applicationData.application.otherVaccinesDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#healthHistoryInfo').collapse('hide');
                $('#drugsUseInfo').collapse('show');
                this.formLoading = false;
            });
    }

    drugsUseInfoOnSubmit() {
        this.formLoading = true;
        this.sanitizeData();
        if (this.applicationData.application.drugsUse === '0') {
            this.applicationData.application.drugsUseDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#drugsUseInfo').collapse('hide');
                $('#currentHealthInfo').collapse('show');
                this.formLoading = false;
            });
    }

    currentHealthInfoOnSubmit() {
        this.formLoading = true;
        this.sanitizeData();
        if (this.applicationData.application.currentDiseases === '0') {
            this.applicationData.application.currentDiseasesDetails = null;
        }
        if (this.applicationData.application.currentSymptoms === '0') {
            this.applicationData.application.currentSymptomsDetails = null;
        }
        if (this.applicationData.application.currentMedicines === '0') {
            this.applicationData.application.currentMedicinesDetails = null;
        }
        if (this.applicationData.application.foodAllergy === '0') {
            this.applicationData.application.foodAllergyDetails = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#currentHealthInfo').collapse('hide');
                $('#emergencyContactsInfo').collapse('show');
                this.formLoading = false;
            });
    }

    emergencyContactsInfoOnSubmit() {
        this.formLoading = true;
        this.sanitizeData();
        if (this.applicationData.application.doctor === '0') {
            this.applicationData.application.doctorFirstName = null;
            this.applicationData.application.doctorLastName = null;
            this.applicationData.application.doctorPhone = null;
            this.applicationData.application.doctorAddress = null;
            this.applicationData.application.doctorCity = null;
            this.applicationData.application.doctorZipCode = null;
            this.applicationData.application.doctorCountry = null;
            this.applicationData.application.doctorContactApproval = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#emergencyContactsInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#healthHistoryInfo').collapse('show');
        $('#drugsUseInfo').collapse('show');
        $('#currentHealthInfo').collapse('show');
        $('#emergencyContactsInfo').collapse('show');
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
