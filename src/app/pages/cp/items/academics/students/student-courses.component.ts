import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { FinancesService } from '../../finances/finances.service';
import { Course } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: './student-courses.component.html'
})
export class StudentCoursesComponent implements OnInit {
    courses: Course[] = [];
    _gpa: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private academicsService: AcademicsService,
        private financesService: FinancesService,
        private localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.academicsService.getCoursesForStudent(id)
                .then((courses: Course[]) => {
                    this.courses = courses;
                });
        });
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
