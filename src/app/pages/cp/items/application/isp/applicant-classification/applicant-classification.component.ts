import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdmissionService } from '../../../admission/admission.service';
import { FinancesService } from '../../../finances/finances.service';
import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: './applicant-classification.component.html'
})
export class ISPApplicantClassificationComponent implements OnInit {
    userId: number;
    applicationId = 20;
    minDate: Date = new Date(new Date().getFullYear(), 0, 1);
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    modelChanged = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        public admissionService: AdmissionService,
        private financesService: FinancesService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(async params => {
            this.userId = +params['userId'];
            this.applicationData = await this.applicationService.getUserApplicationData(this.userId, this.applicationId) as ApplicationData;
            this.formLoading = false;
        });
    }

    updateDateModel($event: Date | any) {
        this.applicationData.application.startingDate = this.financesService.getDateAsString($event);
        this.modelChanged = true;
    }

    getClassification(classificationId) {
        if (classificationId === '1') {
            return 'Traditional ISP';
        } else if (classificationId === '2') {
            return 'Ministry Worker';
        } else if (classificationId === '3') {
            return 'Ethnic Church Leader';
        }
    }

    applicantClassificationOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#applicantClassification').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#applicantClassification').collapse('show');
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        this.applicationService.submitUserApplication(this.userId, this.applicationId)
        .then(() => {
            this.router.navigate(['/cp/admission/applications', this.userId]);
        });
    }
}
