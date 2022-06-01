import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: 'course-list.component.html'
})
export class CourseListComponent implements OnInit {
    courses: Course[];
    filter = {
        programId: null,
        active: '1'
    };
    courseCategories: any;
    courseModel;

    constructor(private router: Router, private route: ActivatedRoute, private programsService: AcademicsService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.filter.programId = +params['id'];
            this.fetchCoursesData();
        });
    }

    async fetchCoursesData() {
        const coursesData = await this.programsService.getCoursesData(this.filter) as any;
        this.courseCategories = coursesData.courseCategories;
        this.courses = coursesData.courses;
    }

    courseEditClicked(course) {
        this.courseModel = {
            id: course.id,
            program_id: course.program_id,
            category_id: course.category_id,
            code: course.code,
            code_gr: course.code_gr,
            code_en: course.code_en,
            name_en: course.name_en,
            name_gr: course.name_gr,
            credits: course.credits,
            ects_credits: course.ects_credits,
            year: course.year,
            semester: course.semester,
            required: course.required === '1' ? true : false,
            moodle_id: course.moodle_id,
            moodle_category_id: course.moodle_category_id,
            active: course.active,
            no_enrolled_students: course.no_enrolled_students,
            fractions: course.fractions ? [...course.fractions] : undefined,
            prerequisites: course.prerequisites ? [...course.prerequisites] : undefined
        };
    }

    courseNewClicked() {
        this.courseModel = {
            id: null,
            program_id: this.filter.programId,
            year: '0',
            semester: '0',
            credits: '0',
            ects_credits: '0',
            fractions: [],
            prerequisites: []
        };
    }

    updateCourse($event) {
        if (!this.courses.some((course, i, courses) => {
            if (course.id === $event.updatedCourse.id) {
                courses[i] = $event.updatedCourse;
                return true;
            }
            return false;
        })) {
            this.courses.unshift($event.updatedCourse);
        }
        if ($event.resetCourseModel) {
            this.courseModel = undefined;
        }
    }

    courseRegistryClicked(id) {
        this.router.navigate(['/cp/academics/programs/course', id]);
    }

    courseMoodleClicked(moodleId) {
        window.open('https://www.grbc.gr/moodle/course/view.php?id=' + moodleId);
    }
}
