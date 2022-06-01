import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../../../localization/localization.module';
import { UIModule } from '../../../../ui/ui.module';
import { AcademicsRoutingModule } from './academics-routing.module';
import { CourseAttendanceComponent } from './courses/course-attendance.component';
import { CourseInputComponent } from './courses/course-input.component';
import { CourseListComponent } from './courses/course-list.component';
import { CourseRegistryComponent } from './courses/course-registry.component';
import { EvaluationReportsComponent } from './evaluation-reports/evaluation-reports.component';
import { ProgramListComponent } from './programs/program-list.component';
import { ProgramRegistryComponent } from './programs/program-registry.component';
import { ChapelScheduleInputComponent } from './schedule/chapel-schedule-input.component';
import { ChapelScheduleComponent } from './schedule/chapel-schedule.component';
import { ScheduleDayComponent } from './schedule/schedule-day.component';
import { TeachingDayComponent } from './schedule/teaching-day.component';
import { TeachingScheduleInputComponent } from './schedule/teaching-schedule-input.component';
import { TeachingScheduleComponent } from './schedule/teaching-schedule.component';
import { StudentCoursesComponent } from './students/student-courses.component';
import { StudentListComponent } from './students/student-list.component';
import { StudentProgressComponent } from './students/student-progress.component';
import { AdvisorsComponent } from './advisors/advisors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        AcademicsRoutingModule
    ],
    declarations: [
        StudentListComponent,
        StudentProgressComponent,
        StudentCoursesComponent,
        ProgramListComponent,
        ProgramRegistryComponent,
        CourseListComponent,
        CourseInputComponent,
        CourseRegistryComponent,
        ChapelScheduleComponent,
        ChapelScheduleInputComponent,
        TeachingScheduleComponent,
        TeachingScheduleInputComponent,
        TeachingDayComponent,
        ScheduleDayComponent,
        CourseAttendanceComponent,
        EvaluationReportsComponent,
        AdvisorsComponent
    ]
})
export class AcademicsModule { }
