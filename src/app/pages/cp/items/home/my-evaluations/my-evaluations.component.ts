import { Component, Input, OnInit } from '@angular/core';

import { LocalizationPipe } from '../../../../../localization/localization.pipe';
import { AjaxService } from '../../../../../services/ajax.service';
import { FormData } from '../../../../../ui/form/form.component';
import { ModalService } from '../../../../../ui/modal/modal.service';

declare let $;

@Component({
    selector: 'my-evaluations',
    templateUrl: './my-evaluations.component.html'
})
export class MyEvaluationsComponent implements OnInit {
    @Input() evaluationsData: EvaluationFormData[];

    constructor(private ajax: AjaxService, private l: LocalizationPipe, private modal: ModalService) { }

    async ngOnInit() {
        this.evaluationsData = this.evaluationsData.map((evaluationsData: any) => {
            return {
                forUserId: evaluationsData.forUserId,
                forCourseId: evaluationsData.forCourseId,
                courseCode: evaluationsData.code,
                courseCodeName: this.l.transform('code', evaluationsData),
                courseName: this.l.transform('name', evaluationsData),
                photoURI: evaluationsData.photoURI,
                lastName: evaluationsData.lastName,
                firstName: evaluationsData.firstName,
                id: 'form' + evaluationsData.forUserId + evaluationsData.forCourseId,
                heading: this.l.transform('title', evaluationsData),
                submitText: 'submitAnonymously',
                questions: evaluationsData.questions
            };
        });
    }

    onSubmitSuccess(submittedFormData) {
        this.modal.show({
            type: 'ok',
            title: 'formSubmissionTitle',
            message: 'evaluationFormSubmission',
            onOk: (modalRef) => {
                modalRef.hide();
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                this.evaluationsData = this.evaluationsData.filter(form => {
                    return !(
                        form.forCourseId === submittedFormData.forCourseId &&
                        form.forUserId === submittedFormData.forUserId
                    );
                });
            }
        });
    }
}

interface EvaluationFormData extends FormData {
    forCourseId: number;
    forUserId: number;
    lastName: string;
    firstName: string;
    photoURI: string;
    courseCodeName: string;
    courseCode: string;
    courseName: string;
}
