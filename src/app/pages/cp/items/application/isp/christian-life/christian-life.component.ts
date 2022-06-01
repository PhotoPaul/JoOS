import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: './christian-life.component.html'
})
export class ISPChristianLifeComponent implements OnInit {
    userId;
    applicationId = 10;
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

    testimonyInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#testimonyInfo').collapse('hide');
                $('#ministryInfo').collapse('show');
                this.formLoading = false;
            });
    }

    ministryInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#ministryInfo').collapse('hide');
                $('#additionalInfo').collapse('show');
                this.formLoading = false;
            });
    }

    additionalInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.conviction === '0') {
            this.applicationData.application.convictionDetails = null;
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
        $('#testimonyInfo').collapse('show');
        $('#ministryInfo').collapse('show');
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
