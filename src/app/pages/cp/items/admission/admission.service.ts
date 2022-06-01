import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizationService } from '../../../../localization/localization.service';
import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ModalService } from '../../../../ui/modal/modal.service';
import { Candidate } from './admission';

@Injectable()
export class AdmissionService {
    constructor(
        private ajax: AjaxService,
        private auth: AuthenticationService,
        private router: Router,
        private localization: LocalizationService,
        private modalService: ModalService
    ) { }

    getApplicantsData(filter, id?) {
        return new Promise((resolve) => {
            this.ajax.get(['getApplicantsData', 'getProgramsData'], { filter: filter, id: id })
                .then((response: AjaxResponse) => {
                    resolve({
                        applicantsData: response[0].data as Candidate[],
                        programsData: response[1].data
                    });
                });
        });
    }

    isPendingSubmission(status) {
        return status === '0';
    }

    isPendingApproval(status) {
        return status === '2';
    }

    isRejected(status) {
        return status === '3';
    }

    getCandidateStatusClass(status: string) {
        if (this.isRejected(status)) {
            return 'orange';
        } else if (!this.isPendingSubmission(status)) {
            return 'green';
        }
    }

    getCandidateStatusText(status: string) {
        if (this.isPendingSubmission(status)) {
            return this.localization.s('notSubmitted');
        } else if (this.isRejected(status)) {
            return this.localization.s('pendingResubmission');
        } else {
            return this.localization.s('submitted');
        }
    }

    getAdmissionStatusClass(status: string) {
        if (this.isPendingSubmission(status)) {
            return 'hidden';
        } else if (this.isPendingApproval(status)) {
            return 'orange';
        } else if (this.isRejected(status)) {
            return 'red';
        } else {
            return 'green';
        }
    }

    getAdmissionStatusText(status: string) {
        if (status === '0') {
            return this.localization.s('notSubmitted');
        } else if (status === '1') {
            return this.localization.s('recorded');
        } else if (status === '2') {
            return this.localization.s('pendingDecision');
        } else if (status === '3') {
            return this.localization.s('notRecorded');
        }
    }

    getCandidatesVotingData(id?) {
        return new Promise((resolve) => {
            this.ajax.get('getCandidatesVotingData', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data as Candidate[]);
                });
        });
    }

    getAdmissionsCompleteApplication(id) {
        return new Promise((resolve) => {
            this.ajax.get('getAdmissionsCompleteApplication', { userId: id, applicationId: 1 })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    getAdmissionsSupportingDocuments(candidateId) {
        return new Promise((resolve) => {
            this.ajax.get('getRegistrationSupportingDocuments', { id: candidateId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    decideForUserApplication(userId, applicationId, status) {
        return this.ajax.get('decideForUserApplication', { userId: userId, applicationId: applicationId, applicationStatus: status });
    }

    decideForReference(userId, priority, decision) {
        return new Promise((resolve) => {
            this.ajax.get('decideForReference', { userId: userId, priority: priority, decision: decision })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    deleteDocument(filename) {
        return new Promise((resolve) => {
            this.modalService.show({
                type: 'yesNo',
                message: 'deleteDocumentConfirmation',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('deleteDocument', { filename: filename })
                        .then((response: AjaxResponse) => {
                            modalRef.hide();
                            resolve(response.data);
                        });
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                    resolve(false);
                }
            });
        });
    }

    voteForCandidate(id, approved) {
        return this.ajax.get('voteForCandidate', { id: id, approved: approved });
    }

    removeVoteFromCandidate(userId, candidateId) {
        return new Promise(resolve => {
            this.modalService.show({
                type: 'yesNo',
                message: 'removeVoteFromCandidate',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('removeVoteFromCandidate', { userId: userId, candidateId: candidateId })
                        .then((response: AjaxResponse) => {
                            modalRef.hide();
                            resolve(response.data);
                        });
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                    resolve(false);
                }
            });
        });
    }

    resetApplicant(userId) {
        return new Promise(resolve => {
            this.modalService.show({
                type: 'yesNo',
                message: 'resetApplicantConfirmation',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('resetApplicant', { userId: userId })
                        .then((response: AjaxResponse) => {
                            modalRef.hide();
                            resolve(response.data);
                        });
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                    resolve(false);
                }
            });
        });
    }

    promoteCandidateToStudent(candidateId, programId) {
        return this.ajax.get('promoteCandidateToStudent', { candidateId: candidateId, programId: programId });
    }

    removeCandidateRole(id) {
        return this.ajax.get('removeCandidateRole', { id: id });
    }

    getUserApplicationData(userId, applicationId) {
        return new Promise((resolve) => {
            this.ajax.get('getUserApplicationFormModel', { userId: userId, applicationId: applicationId })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    hasAccess(roles) {
        return roles === undefined || this.auth.hasAccess(roles.split(','));
    }

    boolStringToString(dbValue) {
        return dbValue ? (dbValue === '1' ? this.localization.s('yes') : this.localization.s('no')) : '';
    }

    showApplication(viewPath, userId) {
        this.router.navigate([viewPath, userId]);
    }

    editApplication(editPath, userId) {
        this.router.navigate([editPath], { queryParams: { userId: userId } });
    }

    returnToList(userId) {
        this.router.navigate(['cp/admission/applications', userId]);
    }
}
