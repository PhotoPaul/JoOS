import { Component, OnInit } from '@angular/core';

import { AjaxService } from '../../../../../services/ajax.service';
import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { ModalService } from '../../../../../ui/modal/modal.service';

@Component({
    selector: 'app-advisors',
    templateUrl: './advisors.component.html'
})
export class AdvisorsComponent implements OnInit {
    advisorAddInputVisible = false;
    advisors: Advisor[] = [];
    nonAdvisors: Advisor[] = [];
    nonAdvisorModel: Advisor;
    nonAdvisees: Advisee[];
    nonAdviseeModel: Advisee;

    constructor(
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    async ngOnInit() {
        this.advisors = (await this.ajax.get('getAdvisors')).data;
    }

    async newAdviseeClicked(advisor) {
        this.nonAdvisees = (await this.ajax.get('getNonAdvisees')).data;
        advisor.newAdviseeAdvisorId = advisor.advisorId;
    }

    async newAdviseeSelected(newAdvisee, advisor) {
        newAdvisee.advisorId = advisor.advisorId;
        if ((await this.ajax.get('addAdvisee', newAdvisee)).success) {
            if (!Array.isArray(advisor.advisees)) {
                advisor.advisees = [newAdvisee];
            } else {
                advisor.advisees.push(newAdvisee);
            }
        }
        delete advisor.newAdviseeAdvisorId;
    }

    async removeAdviseeClicked(adviseeId) {
        await this.ajax.get('removeAdvisee', { adviseeId: adviseeId });
        this.advisors.some(advisor => {
            const noAdvisees = advisor.advisees.length;
            advisor.advisees.some((advisee, i) => {
                if (advisee.adviseeId === adviseeId) {
                    advisor.advisees.splice(i, 1);
                    return true;
                }
            });
            if (advisor.advisees.length !== noAdvisees) {
                return true;
            }
        });
    }

    async newAdvisorClicked() {
        this.nonAdvisors = (await this.ajax.get('getNonAdvisors')).data;
        this.advisorAddInputVisible = true;
    }

    async onSubmit() {
        if ((await this.ajax.get('addAdvisor', this.nonAdvisorModel)).success) {
            this.advisors.unshift(this.nonAdvisorModel);
        }
    }

    async removeAdvisorClicked(advisorId, $buttonControl: ActionButtonComponent) {
        this.modalService.show({
            type: 'yesNo',
            message: 'removeAdvisorConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                if ((await this.ajax.get('removeAdvisor', { advisorId: advisorId })).success) {
                    this.advisors.some((advisor, i) => {
                        if (advisor.advisorId === advisorId) {
                            this.advisors.splice(i, 1);
                            return true;
                        }
                    });
                }
                modalRef.hide();
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            }
        });
    }
}

interface Advisor {
    advisorId: number;
    advisorFirstName: string;
    advisorLastName: string;
    advisorPhotoURI: string;
    advisees: Advisee[];
}

interface Advisee {
    adviseeId: number;
    adviseeFirstName: string;
    adviseeLastName: string;
    adviseePhotoURI: string;
}
