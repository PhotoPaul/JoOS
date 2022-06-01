import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { ModalService } from '../../../../../ui/modal/modal.service';
import { Course, CourseEnrollmentItem, CourseFraction } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: 'course-registry.component.html'
})
export class CourseRegistryComponent implements OnInit {
    course: Course;
    date: Date = new Date;

    constructor(
        private route: ActivatedRoute,
        private academicsService: AcademicsService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            const id = +params['id'];
            this.course = await this.academicsService.getCourseEnrollmentData(id) as Course;
        });
    }

    async enrollClicked(enrollmentItem: CourseEnrollmentItem, fraction: CourseFraction) {
        if (!fraction && enrollmentItem.fractions.length) {
            fraction = enrollmentItem.fractions[0];
        }
        const response = await this.academicsService.enrollUserToCourse(
            this.course.id, enrollmentItem.userId, fraction ? fraction.fractionEnrollmentId : null, fraction ? fraction.fractionId : 0
        ) as CourseEnrollmentItem;
        if (enrollmentItem.fractions.length) {
            for (const responseFraction of response.fractions) {
                for (const enrollmentItemFraction of enrollmentItem.fractions) {
                    if (+enrollmentItemFraction.fractionId === +responseFraction.fractionId) {
                        enrollmentItemFraction.fractionEnrollmentId = responseFraction.fractionEnrollmentId;
                        enrollmentItemFraction.fractionDateTime = responseFraction.fractionDateTime;
                        break;
                    }
                }
            }
        } else {
            enrollmentItem.fractions = response.fractions;
        }
        enrollmentItem.isEnrolled = response.isEnrolled;
        enrollmentItem.isEnrollmentActive = response.isEnrollmentActive;
    }

    async unenrollClicked(enrollmentItem: CourseEnrollmentItem, fraction: CourseFraction) {
        if (!fraction) {
            if (enrollmentItem.fractions.length) {
                fraction = enrollmentItem.fractions[0];
            } else {
                return false;
            }
        }
        const fractionEnrollmentId = fraction.fractionEnrollmentId;
        const response = await this.academicsService.unenrollUserFromCourse(fractionEnrollmentId) as CourseEnrollmentItem;
        fraction.fractionEnrollmentId = undefined;
        enrollmentItem.isEnrollmentActive = response.isEnrollmentActive;
        enrollmentItem.isEnrolled = response.isEnrolled;
    }

    async sendEvaluationForms(userId: number, $buttonControl: ActionButtonComponent) {
        this.modalService.show({
            type: 'yesNo',
            message: 'sendEvaluationFormsConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                await this.academicsService.sendEvaluationForms(this.course.id, userId);
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            }
        });
    }

    enableGradeInput(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        // Enable gradeInput
        enrollmentItem.gradeInputEnabled = true;

        // Focus and Select gradeInput
        setTimeout(() => {
            gradeInput.focus();
            gradeInput.select();
        }, 0);

        // If there's not a grade then preselect Semester and Year based on current DateTime
        if (enrollmentItem.courseEnrollmentGradeSemester === null) {
            const currentMonth = this.date.getMonth() + 1;
            if (currentMonth >= 3 && currentMonth <= 9) { // Between March and September
                enrollmentItem.courseEnrollmentGradeSemester = '2';
                enrollmentItem.courseEnrollmentGradeYear = this.date.getFullYear();
            } else if (currentMonth > 9) {
                enrollmentItem.courseEnrollmentGradeSemester = '1';
                enrollmentItem.courseEnrollmentGradeYear = this.date.getFullYear();
            } else {
                enrollmentItem.courseEnrollmentGradeSemester = '1';
                enrollmentItem.courseEnrollmentGradeYear = this.date.getFullYear() - 1;
            }
        }
    }

    async updateGrade(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        enrollmentItem.gradeInputEnabled = false;
        await this.academicsService.updateStudentGradeForCourse(
            enrollmentItem.fractions[0].fractionEnrollmentId,
            enrollmentItem.courseEnrollmentGrade,
            enrollmentItem.courseEnrollmentGradeSemester,
            enrollmentItem.courseEnrollmentGradeYear
        );
    }

    updateGradeToIncomplete(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        enrollmentItem.courseEnrollmentGrade = -1;
        this.updateGrade(enrollmentItem, gradeInput);
    }

    updateGradeToPass(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        enrollmentItem.courseEnrollmentGrade = -2;
        this.updateGrade(enrollmentItem, gradeInput);
    }

    updateGradeToNoPass(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        enrollmentItem.courseEnrollmentGrade = -3;
        this.updateGrade(enrollmentItem, gradeInput);
    }

    deleteGrade(enrollmentItem: CourseEnrollmentItem, gradeInput: HTMLInputElement) {
        enrollmentItem.courseEnrollmentGrade = null;
        enrollmentItem.courseEnrollmentGradeSemester = null;
        enrollmentItem.courseEnrollmentGradeYear = null;
        this.updateGrade(enrollmentItem, gradeInput);
    }

    gradeInputOnKeyDown($event, enrollmentItem: CourseEnrollmentItem) {
        if ($event.keyCode === 13) {
            this.parseGrade($event.currentTarget, enrollmentItem);
            this.updateGrade(enrollmentItem, $event.currentTarget);
        } else {
            return (
                $event.ctrlKey && (
                    $event.keyCode === 65 ||    // Control + A
                    $event.keyCode === 67 ||    // Control + C
                    $event.keyCode === 86 ||    // Control + V
                    $event.keyCode === 88       // Control + X
                ) ||
                $event.keyCode === 8  ||        // Backspace
                $event.keyCode === 9  ||        // Tab
                $event.keyCode === 13 ||        // Enter
                $event.keyCode === 35 ||        // End
                $event.keyCode === 36 ||        // Home
                $event.keyCode === 37 ||        // Left
                $event.keyCode === 39 ||        // Right
                $event.keyCode === 46 ||        // Delete
                RegExp(/[0-9.,]/g).test($event.key)
            );
        }
    }

    gradeInputOnKeyUp($event, enrollmentItem: CourseEnrollmentItem) {
        if ($event.key === ',') {
            const pos = $event.currentTarget.selectionStart;
            $event.currentTarget.value = $event.currentTarget.value.replace(/,/g, '.');
            $event.currentTarget.setSelectionRange(pos, pos);
        }
        this.parseGrade($event.currentTarget, enrollmentItem);
    }

    parseGrade(gradeInput: HTMLInputElement, enrollmentItem: CourseEnrollmentItem) {
        const grade = parseFloat('0' + gradeInput.value);
        enrollmentItem.courseEnrollmentGrade = grade >= 0 ? grade : -1;
        const selectionStart = gradeInput.selectionStart;
        const selectionEnd = gradeInput.selectionEnd;
        if (gradeInput.value[gradeInput.value.length - 1] !== '.') {
            gradeInput.value = '' + enrollmentItem.courseEnrollmentGrade;
        }
        gradeInput.setSelectionRange(selectionStart, selectionEnd);
    }
}
