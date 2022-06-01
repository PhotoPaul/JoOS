import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: './education.component.html'
})
export class ISPEducationComponent implements OnInit {
    userId;
    applicationId = 8;
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

    secondaryEducationInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.englishHighSchool === '1') {
            this.applicationData.application.englishCertificate = null;
        }
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#secondaryEducationInfo').collapse('hide');
                $('#higherEducationInfo').collapse('show');
                this.formLoading = false;
            });
    }

    higherEducationInfoOnSubmit() {
        this.formLoading = true;
        if (!this.applicationData.application.communityCollegeName) {
            this.applicationData.application.communityCollegeDatesAttended = null;
            this.applicationData.application.communityCollegeDiscipline = null;
            this.applicationData.application.communityCollegeAddress = null;
            this.applicationData.application.communityCollegeCity = null;
            this.applicationData.application.communityCollegeZipCode = null;
            this.applicationData.application.communityCollegeCountry = null;
        }
        if (!this.applicationData.application.collegeName) {
            this.applicationData.application.collegeDatesAttended = null;
            this.applicationData.application.collegeDiscipline = null;
            this.applicationData.application.collegeAddress = null;
            this.applicationData.application.collegeCity = null;
            this.applicationData.application.collegeZipCode = null;
            this.applicationData.application.collegeCountry = null;
        }
        if (!this.applicationData.application.graduateSchoolName) {
            this.applicationData.application.graduateSchoolDatesAttended = null;
            this.applicationData.application.graduateSchoolDiscipline = null;
            this.applicationData.application.graduateSchoolAddress = null;
            this.applicationData.application.graduateSchoolCity = null;
            this.applicationData.application.graduateSchoolZipCode = null;
            this.applicationData.application.graduateSchoolCountry = null;
        }
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#higherEducationInfo').collapse('hide');
                $('#additionalInfo').collapse('show');
                this.formLoading = false;
            });
    }

    additionalInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.dismissed === '0') {
            this.applicationData.application.dismissedDetails = null;
        }
        if (this.applicationData.application.honors === '0') {
            this.applicationData.application.honorsDetails = null;
        }
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#additionalInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#secondaryEducationInfo').collapse('show');
        $('#higherEducationInfo').collapse('show');
        $('#additionalInfo').collapse('show');
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
