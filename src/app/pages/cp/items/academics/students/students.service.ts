import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';
import { ModalService } from '../../../../../ui/modal/modal.service';
import { StudentProgress, StudentProgressItem } from './student-progress';

@Injectable()
export class StudentsService {
    students: StudentProgress[] = [];

    constructor(
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    async getStudentsData() {
        return new Promise(async (resolve) => {
            const response = await this.ajax.get('getStudentsData') as AjaxResponse;
            resolve(response.data as StudentProgress[]);
        });
    }

    getStudentProgressData(id) {
        return new Promise((resolve) => {
            this.ajax.get('getStudentProgressData', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data as StudentProgressItem[]);
                });
        });
    }

    deleteStudent(studentId) {
        return new Promise(resolve => {
            this.modalService.show({
                type: 'yesNo',
                message: 'deleteStudentConfirmation',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('deleteStudent', { studentId: studentId })
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
}
