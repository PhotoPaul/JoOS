import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisorsComponent } from './advisors/advisors.component';
import { CourseAttendanceComponent } from './courses/course-attendance.component';
import { CourseListComponent } from './courses/course-list.component';
import { CourseRegistryComponent } from './courses/course-registry.component';
import { EvaluationReportsComponent } from './evaluation-reports/evaluation-reports.component';
import { ProgramListComponent } from './programs/program-list.component';
import { ProgramRegistryComponent } from './programs/program-registry.component';
import { ChapelScheduleComponent } from './schedule/chapel-schedule.component';
import { TeachingScheduleComponent } from './schedule/teaching-schedule.component';
import { StudentCoursesComponent } from './students/student-courses.component';
import { StudentListComponent } from './students/student-list.component';
import { StudentProgressComponent } from './students/student-progress.component';

const routes: Routes = [
    { path: 'programs', data: { faIcon: 'fa-certificate', path_title_gr: 'Προγράμματα', path_title_en: 'Programs', roles: ['admin', 'registrar', 'cashier'] }, component: ProgramListComponent },
    { path: 'programs/enrollment/:id', data: { faIcon: 'fa-users', path_title_gr: 'Μητρώο Προγράμματος', path_title_en: 'Program Enrollment', noNav: true }, component: ProgramRegistryComponent },
    { path: 'students', data: { faIcon: 'fa-users', path_title_gr: 'Φοιτητές', path_title_en: 'Students', roles: ['admin', 'registrar', 'cashier', 'professor'] }, component: StudentListComponent },
    { path: 'students/progress/:id', data: { faIcon: 'fa-users', path_title_gr: 'Πρόοδος Φοιτητή', path_title_en: 'Student Progress', noNav: true }, component: StudentProgressComponent },
    { path: 'students/courses/:id', data: { faIcon: 'fa-th-list', path_title_gr: 'Μαθήματα Φοιτητή', path_title_en: 'Student Courses', noNav: true }, component: StudentCoursesComponent },
    // { path: 'graduates', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Απόφοιτοι', path_title_en: 'Graduates', roles: ['admin', 'registrar'] }, redirectTo: 'students' },
    { path: 'programs/courses/:id', data: { faIcon: 'fa-th-list', path_title_gr: 'Μαθήματα', path_title_en: 'Courses', noNav: true }, component: CourseListComponent },
    { path: 'programs/course/:id', data: { faIcon: 'fa-users', path_title_gr: 'Μητρώο Μαθήματος', path_title_en: 'Course Registry', noNav: true }, component: CourseRegistryComponent },
    { path: 'teaching-schedule', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Πρόγραμμα Διδασκαλίας', path_title_en: 'Teaching Schedule', roles: ['admin', 'registrar', 'cashier', 'professor', 'student'] }, component: TeachingScheduleComponent },
    { path: 'chapel-schedule', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Πρόγραμμα Chapel', path_title_en: 'Chapel Schedule', roles: ['admin', 'chaplain', 'registrar', 'cashier', 'professor', 'student'] }, component: ChapelScheduleComponent },
    { path: 'advisors', data: { faIcon: 'fa-couch', path_title_gr: 'Ακαδημαϊκοί Σύμβουλοι', path_title_en: 'Academic Advisors', roles: ['admin', 'chaplain'] }, component: AdvisorsComponent },
    { path: 'evaluation-reports', data: { faIcon: 'fa-envelope-open-text', path_title_gr: 'Αξιολογήσεις', path_title_en: 'Evaluations', roles: ['admin', 'registrar', 'professor'] }, component: EvaluationReportsComponent },
    { path: 'advisors', data: { faIcon: 'fa-couch', path_title_gr: 'Ακαδημαϊκοί Σύμβουλοι', path_title_en: 'Academic Advisors', roles: ['admin', 'chaplain'] }, component: AdvisorsComponent },
    { path: 'schedule-maker', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Δημιουργία Προγράμματος Διδασκαλίας', path_title_en: 'Teaching Schedule Maker', roles: ['admin', 'registrar'] }, loadChildren: './schedule-maker/schedule-maker.module#ScheduleMakerModule' },
    { path: 'attendance/course/:id', data: { faIcon: 'fa-users', path_title_gr: 'Παρουσιολόγιο Μαθήματος', path_title_en: 'Course Attendance', noNav: true }, component: CourseAttendanceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AcademicsRoutingModule { }
