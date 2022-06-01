import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: './health.component.html'
})
export class ISPHealthComponent implements OnInit {
    userId;
    applicationId = 9;
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    modelChanged = false;

    constructor(private route: ActivatedRoute, public applicationService: ApplicationService, private router: Router) { }

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

    drugsUseInfoOnSubmit() {
        this.formLoading = true;
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
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#emergencyContactsInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
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
