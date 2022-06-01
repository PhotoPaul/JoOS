import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: 'financial.component.html'
})
export class ISPFinancialComponent implements OnInit {
    userId;
    applicationId = 21;
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

    financialInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.selfPaid === '1') {
            this.applicationData.application.sponsors = null;
            this.applicationData.application.sponsorsTotal = null;
            this.applicationData.application.debtApproval = null;
        }
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#financialInfo').collapse('hide');
                $('#applicationFeeInfo').collapse('show');
                this.formLoading = false;
            });
    }

    // applicationFeeInfoOnSubmit() {
    //     this.formLoading = true;
    //     this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
    //         .then(() => {
    //             this.modelChanged = false;
    //             $('#applicationFeeInfo').collapse('hide');
    //             this.formLoading = false;
    //         });
    // }

    // createOrder(amount) {
    //     this.formLoading = true;
    //     this.applicationService.vivaCreateOrder({
    //         Amount: amount,
    //         CustomerTrns: amount === 35 ? 'Application Fee' : 'Application & Visa Assistance Fee',
    //         RequestLang: 'en-US',
    //         PaymentTimeOut: 2678400 // 31 days
    //     })
    //         .then((orderUrl: string) => {
    //             this.applicationData.application.feeUrl = orderUrl;
    //             this.formLoading = false;
    //         });
    // }

    hideForm() {
        this.formLoading = true;
        this.applicationService.hideUserApplication(this.userId, this.applicationId)
            .then(() => {
                this.applicationData.application.hidden = !this.applicationData.application.hidden;
                this.formLoading = false;
            });
    }

    unhideForm() {
        this.formLoading = true;
        this.applicationService.unhideUserApplication(this.userId, this.applicationId)
            .then(() => {
                this.applicationData.application.hidden = !this.applicationData.application.hidden;
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#financialInfo').collapse('show');
        $('#depositInfo').collapse('show');
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
