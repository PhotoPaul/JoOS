import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Course, CourseFraction } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    selector: 'course-input',
    templateUrl: 'course-input.component.html'
})
export class CourseInputComponent implements OnInit, OnChanges {
    @Input() programId: number;
    @Input() courses: Course[];
    @Input() courseCategories;
    @Input() courseModel: Course | any;
    @Output() courseNewClicked = new EventEmitter();
    @Output() courseModelChange = new EventEmitter();
    moodleCourseCategoriesData;
    titleMoodleVisible = false;
    formSubmitted = false;

    constructor(private academicsService: AcademicsService) { }

    async ngOnInit() {
        this.moodleCourseCategoriesData = await this.academicsService.moodleGetCourseCategories();
    }

    ngOnChanges() {
        this.titleMoodleVisible = false;
    }

    addFraction() {
        this.courseModel.fractions.push({
            courseId: this.courseModel.id,
            edit: true
        });
    }

    async saveFraction($event: KeyboardEvent, fraction, courseCategory) {
        if ($event.type === 'keypress' && $event.keyCode !== 13) {
            return;
        }
        if (($event.type === 'change' || $event.type === 'blur' || $event.keyCode === 13) && fraction.fractionLabel) {
            if (fraction.edit) {
                delete fraction.edit;
                const serverFraction: CourseFraction = await this.academicsService.saveCourseFraction(fraction);
                if (serverFraction) {
                    fraction.fractionId = serverFraction.fractionId;
                } else {
                    fraction.edit = true;
                }
                this.courseModelChange.emit({ updatedCourse: this.courseModel });
            }
        } else {
            this.courseModel.fractions.pop();
        }
    }

    async deleteFraction(fractions: CourseFraction[], fractionId) {
        await this.academicsService.deleteCourseFraction(fractionId);
        for (const i in fractions) {
            if (fractions[i].fractionId === fractionId) {
                fractions.splice(+i, 1);
                break;
            }
        }
        this.courseModelChange.emit({ updatedCourse: this.courseModel });
    }

    addPrerequisite(courseId) {
        this.courses.some((course) => {
            if (course.id === courseId) {
                this.courseModel.prerequisites.push({
                    prerequisiteCourseId: course.id,
                    prerequisiteCourseCode_gr: course.code_gr,
                    prerequisiteCourseCode_en: course.code_en,
                    prerequisiteCourseCode: course.code,
                    prerequisiteCourseName_gr: course.name_gr,
                    prerequisiteCourseName_en: course.name_en,
                    prerequisiteCourseActive: course.active
                });
                return true;
            }
            return false;
        });
        this.courseModel.newPrerequisite = undefined;
    }

    editPrerequisite(courseId, prerequisite) {
        this.courses.some((course) => {
            if (course.id === courseId) {
                prerequisite.prerequisiteCourseId = course.id;
                prerequisite.prerequisiteCourseCode_gr = course.code_gr;
                prerequisite.prerequisiteCourseCode_en = course.code_en;
                prerequisite.prerequisiteCourseCode = course.code;
                prerequisite.prerequisiteCourseName_gr = course.name_gr;
                prerequisite.prerequisiteCourseName_en = course.name_en;
                prerequisite.prerequisiteCourseActive = course.active;
                return true;
            }
            return false;
        });
        prerequisite.edit = undefined;
    }

    deletePrerequisite(courseId) {
        this.courseModel.prerequisites.some((course, i) => {
            if (course.prerequisiteCourseId === courseId) {
                this.courseModel.prerequisites.splice(i, 1);
            }
        });
    }

    createOpenCourseInput() {
        this.formSubmitted = false;
        this.courseNewClicked.emit();
    }

    moodleCategoryOnSelect(selectedValue) {
        if (selectedValue) {
            this.titleMoodleVisible = true;
        } else {
            this.courseModel.addToMoodle = false;
            this.courseModel.moodle_category_id = null;
            this.titleMoodleVisible = false;
        }
    }

    async courseInputSubmit() {
        this.formSubmitted = true;
        this.courseModelChange.emit({ updatedCourse: await this.academicsService.saveCourse(this.courseModel), resetCourseModel: true });
        this.formSubmitted = false;
    }
}
