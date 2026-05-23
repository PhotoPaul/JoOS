import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: 'education.component.html'
})
export class EducationComponent implements OnInit {
    userId;
    applicationId = 2;
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

    primarySecondaryEducationInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#primarySecondaryEducationInfo').collapse('hide');
                $('#computerUseInfo').collapse('show');
                this.formLoading = false;
            });
    }

    computerUseInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.computerFluency !== '1' && this.applicationData.application.computerFluency !== 1) {
            this.applicationData.application.computerAccess = null;
            this.applicationData.application.internetAccess = null;
            this.applicationData.application.wordProcessingFluency = null;
            this.applicationData.application.presentationFluency = null;
        }
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#computerUseInfo').collapse('hide');
                $('#languagesInfo').collapse('show');
                this.formLoading = false;
            });
    }

    languagesInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#languagesInfo').collapse('hide');
                $('#higherEducationInfo').collapse('show');
                this.formLoading = false;
            });
    }

    higherEducationInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#higherEducationInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#primarySecondaryEducationInfo').collapse('show');
        $('#computerUseInfo').collapse('show');
        $('#languagesInfo').collapse('show');
        $('#higherEducationInfo').collapse('show');
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
