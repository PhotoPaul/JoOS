import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ModalService } from '../../../../../../ui/modal/modal.service';
import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    selector: 'app-application-fee',
    templateUrl: './application-fee.component.html'
})
export class ISPApplicationFeeComponent implements OnInit {
    userId;
    applicationId = 22;
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    modelChanged = false;
    onlinePaymentClicked = false;

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private modalService: ModalService,
        private router: Router
    ) { }

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

    createOrder(amount) {
        this.formLoading = true;
        this.applicationService.vivaCreateOrder({
            Amount: amount,
            CustomerTrns: amount === 35 ? 'Application Fee' : 'Application & Visa Assistance Fee',
            RequestLang: 'en-US',
            PaymentTimeOut: 5184000 // 60 days
        })
            .then((orderUrl: string) => {
                this.applicationData.application.feeUrl = orderUrl;
                this.formLoading = false;
            });
    }

    openOrder() {
        window.open(this.applicationData.application.feeUrl);
        this.onlinePaymentClicked = true;
    }

    applicationFeeInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#applicationFeeInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    submitForm() {
        this.formLoading = true;
        this.modalService.show({
            type: 'yesNo',
            message: 'markAsPaidConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                await this.applicationService.submitUserApplication(this.userId, this.applicationId);
                this.router.navigate(['/cp']);
                modalRef.hide();
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                this.formLoading = false;
            }
        });
    }
}
