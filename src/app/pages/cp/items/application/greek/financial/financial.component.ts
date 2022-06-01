import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: 'financial.component.html'
})
export class FinancialComponent implements OnInit {
    userId;
    applicationId = 6;
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    modelChanged = false;
    orderUrl: string;

    constructor(private route: ActivatedRoute, public applicationService: ApplicationService, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            this.applicationService.getUserApplicationData(this.userId, this.applicationId)
            .then((applicationData: ApplicationData) => {
                if (applicationData) {
                    this.applicationData = applicationData;
                }
                if (this.applicationData.application.deposit === '31') {
                    this.createOrder();
                }
                this.formLoading = false;
            });
        });
    }

    depositInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#depositInfo').collapse('hide');
                $('#financialInfo').collapse('show');
                this.formLoading = false;
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
                this.formLoading = false;
            });
    }

    createOrder() {
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
        window.open(this.orderUrl);
        this.orderUrl = null;
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
