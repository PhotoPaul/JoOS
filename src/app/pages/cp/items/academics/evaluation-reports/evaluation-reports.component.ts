import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';
import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { ModalService } from '../../../../../ui/modal/modal.service';

@Component({
    templateUrl: './evaluation-reports.component.html'
})
export class EvaluationReportsComponent implements OnInit {
    public reportData;
    public filter;
    public ajaxPending: boolean;

    constructor(
        private ajax: AjaxService,
        private changeDetectorRef: ChangeDetectorRef,
        private modalService: ModalService
    ) { }

    async ngOnInit() {
        this.clearFilter();
        this.filterOptions();
    }

    removePendingEvaluation(fromUserId, forCourseId, forUserId, $buttonControl: ActionButtonComponent) {
        this.modalService.show({
            type: 'yesNo',
            message: 'removePendingEvaluationConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                await this.ajax.get('removePendingEvaluation', { fromUserId: fromUserId, forCourseId: forCourseId, forUserId: forUserId });
                modalRef.hide();
                this.reportData.pendingReports.some((report, i) => {
                    if (report.fromUserId === fromUserId) {
                        if (report.forUsers.some((user, j) => {
                            if (user.forCourseId === forCourseId && user.forUserId === forUserId) {
                                report.forUsers.splice(j, 1);
                                return true;
                            }
                        })) {
                            if (report.forUsers.length === 0) {
                                this.reportData.pendingReports.splice(i, 1);
                            }
                            return true;
                        }
                        return true;
                    }
                });
                $buttonControl.ajax.state = 'idle';
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            }
        });
    }

    async filterOptions() {
        this.ajaxPending = true;
        this.changeDetectorRef.detectChanges();
        this.reportData = (await this.ajax.get('getEvaluationReportData', this.filter) as AjaxResponse).data;
        this.ajaxPending = false;
    }

    clearFilter() {
        this.filter = {
            courseId: null,
            userId: null,
            yearFrom: null,
            yearTo: null
        };
        this.filterOptions();
    }

    keepTextOnly(questions) {
        return questions.filter(question => {
            return question.type !== '3';
        });
    }
}
