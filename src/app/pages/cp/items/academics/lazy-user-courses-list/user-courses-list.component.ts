import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: './user-courses-list.component.html'
})
export class UserCoursesListComponent implements OnInit {
    courses: Course[] = [];
    _gpa: string;

    constructor(
        private router: Router,
        private academicsService: AcademicsService
    ) { }

    async ngOnInit() {
        this.courses = await this.academicsService.getCoursesForStudent(null) as Course[];
    }

    courseRegistryClicked(id) {
        this.router.navigate(['/cp/academics/programs/course', id]);
    }

    courseMoodleClicked(moodleId) {
        window.open('https://www.grbc.gr/moodle/course/view.php?id=' + moodleId);
    }

    get gpa() {
        if (this._gpa === undefined) {
            let sumGrades = 0;
            let noGrades = 0;

            this.courses.forEach((course: any) => {
                if (
                    course.grade &&
                    course.grade !== '-1.0' &&
                    course.grade !== '-2.0' &&
                    course.grade !== '-3.0'
                ) {
                    sumGrades += +course.grade;
                    noGrades++;
                }
            });
            this._gpa = (sumGrades / noGrades).toFixed(2);
        }
        return this._gpa;
    }
}
