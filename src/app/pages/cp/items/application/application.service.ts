import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { OrderModel } from './greek/financial/financial';

@Injectable()
export class ApplicationService {
    constructor(private ajax: AjaxService, private router: Router) { }

    getApplicantHomeData() {
        return new Promise((resolve) => {
            this.ajax.get('getApplicantHomeData')
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    setProgramForApplicant(programId, asAuditor) {
        return new Promise((resolve) => {
            this.ajax.get('setProgramForApplicant', { programId: programId, asAuditor: asAuditor ? asAuditor : null })
                .then((response: AjaxResponse) => {
                    resolve(response.data.applications);
                });
        });
    }

    getUserApplicationData(userId, applicationId) {
        return new Promise((resolve) => {
            this.ajax.get('getUserApplicationFormModel', { userId: userId, applicationId: applicationId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    saveUserApplicationData(userId, applicationId, applicationData) {
        return new Promise((resolve) => {
            this.ajax.get('saveUserApplicationFormModel', {
                userId: userId,
                applicationId: applicationId,
                application: applicationData.application
            }).then((response: AjaxResponse) => {
                    resolve(response.data);
            });
        });
    }

    submitUserApplication(userId, applicationId) {
        return new Promise((resolve) => {
            this.ajax.get('submitUserApplication', { userId: userId, applicationId: applicationId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    hideUserApplication(userId, applicationId) {
        return new Promise((resolve) => {
            this.ajax.get('hideUserApplication', { userId: userId, applicationId: applicationId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    unhideUserApplication(userId, applicationId) {
        return new Promise((resolve) => {
            this.ajax.get('unhideUserApplication', { userId: userId, applicationId: applicationId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    vivaCreateOrder(orderModel: OrderModel) {
        return new Promise((resolve) => {
            this.ajax.get('vivaCreateOrder', { orderModel })
                .then((response: AjaxResponse) => {
                    resolve(response.data as AjaxResponse);
                });
        });
    }

    getSupportingDocumentsFormModel(id?) {
        return new Promise((resolve) => {
            this.ajax.get('getRegistrationSupportingDocuments', { id: id })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    returnToList(userId) {
        this.router.navigate(['cp/admission/applications', userId]);
    }
}
