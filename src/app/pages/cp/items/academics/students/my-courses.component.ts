import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { LocalizationService } from '../../../../../localization/localization.service';
import { FGradePipe } from '../../../../../pipes/fGrade.pipe';
import { MyCoursesData } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    selector: 'my-courses',
    templateUrl: 'my-courses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCoursesComponent implements OnInit {
    myCoursesData: MyCoursesData;

    constructor(
        private academicsService: AcademicsService,
        private changeDetectorRef: ChangeDetectorRef,
        private fGrade: FGradePipe,
        private localization: LocalizationService
    ) { }

    ngOnInit() {
        this.academicsService.getMyCoursesData()
            .then((myCoursesData: MyCoursesData) => {
                this.myCoursesData = this.circleTileFormatMyCoursesData(myCoursesData);
                this.changeDetectorRef.detectChanges();
            });
    }

    circleTileFormatMyCoursesData(myCoursesData: MyCoursesData) {
        for (const i in myCoursesData) {
            if (myCoursesData.hasOwnProperty(i)) {
                myCoursesData[i] = new CircleTileFormattedCourse(myCoursesData[i], this.fGrade, this.localization);
            }
        }
        return myCoursesData;
    }
}

class CircleTileFormattedCourse {
    color: string;
    iconData: {
        fa?: string;
        picture?: string;
        path?: string;
        url?: string;
        modal?: any;
    };
    heading: string;
    value: string | number;
    footer: string;
    footerLinks: {
        text: string;
        path: string;
    }[];

    constructor(myCoursesDataItem: MyCoursesData, private fGrade: FGradePipe, private localization: LocalizationService) {
        if (+myCoursesDataItem.active === 0) {
            this.color = 'dark-blue';
        } else if (+myCoursesDataItem.active === 1) {
            this.color = 'green';
        } else {
            this.color = 'purple';
        }
        if (myCoursesDataItem.grade === -1) {
            this.color = 'red';
        }
        this.iconData = {
            fa: 'fa-university',
            url: 'https://www.grbc.gr/moodle/course/view.php?id=' + myCoursesDataItem.moodle_id
        };
        this.heading = myCoursesDataItem.code_gr + ' ' + myCoursesDataItem.code;
        this.value = myCoursesDataItem.no_enrolled_students !== undefined ?
            myCoursesDataItem.no_enrolled_students :
            this.fGrade.transform(myCoursesDataItem.grade, 'both');
        this.footer = myCoursesDataItem.name_gr;
        this.footerLinks = [];
        if (myCoursesDataItem.no_enrolled_students !== undefined) {
            this.footerLinks.push({
                text: localization.s('courseRegistry'),
                path: '/cp/academics/programs/course/' + myCoursesDataItem.course_id
            });
        }
        this.footerLinks.push({
            text: 'Moodle',
            path: 'https://www.grbc.gr/moodle/course/view.php?id=' + myCoursesDataItem.moodle_id
        });
    }
}
