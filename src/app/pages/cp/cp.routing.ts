import { RouterModule, Routes } from '@angular/router';

import { CPComponent } from './cp.component';
import { CPGuard } from './cp.guard';
import { ErrorComponent as ErrorComponent } from './items/error/error.component';
import { HomeComponent } from './items/home/home.component';

export const CPRoutes: Routes = [
    { path: '', data: { noNav: true }, component: CPComponent, children: [
        { path: '', data: { faIcon: 'fa-home', path_title_gr: 'Αρχική', path_title_en: 'Home', roles: ['admin', 'registrar', 'cashier', 'librarian', 'chaplain', 'student', 'professor', 'candidate'] }, component: HomeComponent },
        { path: 'error', data: { faIcon: 'fa-ban', path_title_gr: 'Error', path_title_en: 'Error', noNav: true }, component: ErrorComponent },
        { path: 'system', data: { faIcon: 'fa-cogs', path_title_gr: 'Σύστημα', path_title_en: 'System', noNav: true }, loadChildren: './items/system/system.module#SystemModule' },
        { path: 'system', data: { faIcon: 'fa-cogs', path_title_gr: 'Σύστημα', path_title_en: 'System', roles: ['admin'] }, children: [
            { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'users' },
            { path: 'users', data: { faIcon: 'fa-users', path_title_gr: 'Χρήστες', path_title_en: 'Users', roles: ['admin'] } },
            { path: 'operations', data: { faIcon: 'fa-bolt', path_title_gr: 'Λειτουργίες', path_title_en: 'Operations', roles: ['admin'] } },
            { path: 'files', data: { faIcon: 'fa-file', path_title_gr: 'Διαχειριστής Αρχείων', path_title_en: 'File Manager', roles: ['admin'] } },
            { path: 'db', data: { faIcon: 'fa-database', path_title_gr: 'Βάση Δεδομένων', path_title_en: 'Database Manager', roles: ['admin'] } },
            { path: 'notification-templates', data: { faIcon: 'fa-tags', path_title_gr: 'Πρότυπα Ειδοποιήσεων', path_title_en: 'Notification Templates', roles: ['admin'] } },
            { path: 'users/folder/:id', data: { faIcon: 'fa-folder-open', path_title_gr: 'Φάκελος Χρήστη', path_title_en: 'User Folder', noNav: true } },
            { path: 'users/profile/:id', data: { faIcon: 'fa-user', path_title_gr: 'Προφίλ Χρήστη', path_title_en: 'User Profile', noNav: true } },
            { path: 'logs', data: { faIcon: 'fa-history', path_title_gr: 'Ιστορικό', path_title_en: 'Logs', roles: ['admin'] } },
            { path: 'errors', data: { faIcon: 'fa-exclamation-triangle', path_title_gr: 'Σφάλματα', path_title_en: 'Errors', roles: ['admin'] } },
            { path: 'variables', data: { faIcon: 'fa-cog', path_title_gr: 'Μεταβλητές Συστήματος', path_title_en: 'System Variables', roles: ['admin'] } }
        ]},
        { path: 'academics', data: { faIcon: 'fa-building', path_title_gr: 'Ακαδημαϊκά', path_title_en: 'Academics', noNav: true }, canActivate: [CPGuard], loadChildren: './items/academics/academics.module#AcademicsModule' },
        { path: 'academics', data: { faIcon: 'fa-building', path_title_gr: 'Ακαδημαϊκά', path_title_en: 'Academics', roles: ['admin', 'registrar', 'cashier', 'professor', 'student', 'chaplain'] }, children: [
            { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'students' },
            { path: 'programs', data: { faIcon: 'fa-certificate', path_title_gr: 'Προγράμματα', path_title_en: 'Programs', roles: ['admin', 'registrar', 'cashier', 'professor'] } },
            { path: 'programs/enrollment/:id', data: { faIcon: 'fa-users', path_title_gr: 'Μητρώο Προγράμματος', path_title_en: 'Program Enrollment', noNav: true } },
            { path: 'students', data: { faIcon: 'fa-users', path_title_gr: 'Φοιτητές', path_title_en: 'Students', roles: ['admin', 'registrar', 'cashier', 'professor'] } },
            { path: 'students/progress/:id', data: { faIcon: 'fa-users', path_title_gr: 'Πρόοδος Φοιτητή', path_title_en: 'Student Progress', noNav: true } },
            { path: 'students/courses/:id', data: { faIcon: 'fa-th-list', path_title_gr: 'Μαθήματα Φοιτητή', path_title_en: 'Student Courses', noNav: true } },
            // { path: 'graduates', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Απόφοιτοι', path_title_en: 'Graduates', roles: ['admin', 'registrar', 'cashier', 'professor'] } },
            { path: 'programs/courses/:id', data: { faIcon: 'fa-th-list', path_title_gr: 'Μαθήματα', path_title_en: 'Courses', noNav: true } },
            { path: 'programs/course/:id', data: { faIcon: 'fa-users', path_title_gr: 'Μητρώο Μαθήματος', path_title_en: 'Course Registry', noNav: true } },
            { path: 'teaching-schedule', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Πρόγραμμα Διδασκαλίας', path_title_en: 'Teaching Schedule', roles: ['admin', 'registrar', 'cashier', 'chaplain', 'professor', 'student'] } },
            { path: 'chapel-schedule', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Πρόγραμμα Chapel', path_title_en: 'Chapel Schedule', roles: ['admin', 'registrar', 'cashier', 'chaplain', 'professor', 'student'] } },
            { path: 'evaluation-reports', data: { faIcon: 'fa-envelope-open-text', path_title_gr: 'Αξιολογήσεις', path_title_en: 'Evaluations', roles: ['admin', 'registrar', 'professor'] } },
            { path: 'advisors', data: { faIcon: 'fa-couch', path_title_gr: 'Ακαδημαϊκοί Σύμβουλοι', path_title_en: 'Academic Advisors', roles: ['admin', 'chaplain'] } },
            { path: 'schedule-maker', data: { faIcon: 'fa-calendar-alt', path_title_gr: 'Δημιουργία Προγράμματος Διδασκαλίας', path_title_en: 'Teaching Schedule Maker', roles: ['admin', 'registrar'] } },
            { path: 'attendance/course/:id', data: { faIcon: 'fa-users', path_title_gr: 'Παρουσιολόγιο Μαθήματος', path_title_en: 'Course Attendance', noNav: true } }
        ]},
        { path: 'application', data: { faIcon: 'fa-edit', path_title_gr: 'Εγγραφή', path_title_en: 'Application', noNav: true }, canActivate: [CPGuard], loadChildren: './items/application/application.module#ApplicationModule' },
        { path: 'application', data: { faIcon: 'fa-edit', path_title_gr: 'Εγγραφή', path_title_en: 'Application', noNav: true, roles: ['candidate'] }, canActivate: [CPGuard], children: [
            { path: 'personal', data: { faIcon: 'fa-edit ', path_title_gr: 'Αίτηση Εγγραφής', path_title_en: 'Application Form', roles: ['candidate'] } },
            { path: 'education', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Σπουδές / Εκπαίδευση', path_title_en: 'Education / Training', roles: ['candidate'] } },
            { path: 'health', data: { faIcon: 'fa-medkit', path_title_gr: 'Κατάσταση Υγείας', path_title_en: 'Health Status', roles: ['candidate'] } },
            { path: 'christian-life', data: { faIcon: 'fa-heart', path_title_gr: 'Πνευματική Ζωή', path_title_en: 'Christian Life', roles: ['candidate'] } },
            { path: 'references', data: { faIcon: 'fa-envelope', path_title_gr: 'Συστατικές Επιστολές', path_title_en: 'Recommendation Letters', roles: ['candidate'] } },
            { path: 'financial', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομική Ευθύνη', path_title_en: 'Financial Liability', roles: ['candidate'] } },
            { path: 'supporting-documents', data: { faIcon: 'fa-file', path_title_gr: 'Δικαιολογητικά', path_title_en: 'Application Documents', roles: ['candidate'] } }
        ]},
        { path: 'admission', data: { faIcon: 'fa-edit', path_title_gr: 'Εγγραφή', path_title_en: 'Application', noNav: true }, canActivate: [CPGuard], loadChildren: './items/admission/admission.module#AdmissionModule' },
        { path: 'admission', data: { faIcon: 'fa-edit', path_title_gr: 'Εγγραφή', path_title_en: 'Application', roles: ['admin', 'registrar', 'cashier', 'admissions'] }, children: [
            { path: 'applications', data: { faIcon: 'fa-edit ', path_title_gr: 'Αιτήσεις', path_title_en: 'Applications', roles: ['admin', 'registrar', 'cashier', 'admissions'] } },
            { path: 'decide', data: { faIcon: 'fa-level-up-alt', path_title_gr: 'Πρόοδος Αποδοχής', path_title_en: 'Admission Progress', roles: ['admin', 'registrar', 'admissions'] } },
        ]},
        { path: 'finances', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομικά', path_title_en: 'Finances', noNav: true }, loadChildren: './items/finances/finances.module#FinancesModule' },
        { path: 'finances', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομικά', path_title_en: 'Finances', roles: ['admin', 'cashier', 'registrar', 'student'] }, children: [
            { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'records' },
            { path: 'my-records', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμός', path_title_en: 'Records', roles: ['student'] } },
            { path: 'records', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμοί', path_title_en: 'Records', roles: ['admin', 'cashier', 'registrar'] } },
            { path: 'records/user/:id', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμός Φοιτητή', path_title_en: 'Student Records', noNav: true } },
            { path: 'templates', data: { faIcon: 'fa-tags', path_title_gr: 'Πρότυπα Λογαριασμών', path_title_en: 'Account Templates', roles: ['admin', 'cashier'] } }
        ]},
        { path: 'finances/cost-calculator', data: { faIcon: 'fa-calculator', path_title_gr: 'Υπολογιστής Κόστους', path_title_en: 'Fee Calculator' }, loadChildren: './items/finances/cost-calculator/cost-calculator.module#CostCalculatorModule' },
        { path: 'library', data: { faIcon: 'fa-book', path_title_gr: 'Βιβλιοθήκη', path_title_en: 'Library', noNav: true }, loadChildren: './items/library/library.module#LibraryModule' },
        { path: 'library', data: { faIcon: 'fa-book', path_title_gr: 'Βιβλιοθήκη', path_title_en: 'Library', roles: ['admin', 'librarian', 'professor', 'student'] }, children: [
            { path: 'books', data: { faIcon: 'fa-book', path_title_gr: 'Βιβλία', path_title_en: 'Books', roles: ['admin', 'librarian'] } },
            { path: 'my-card', data: { faIcon: 'fa-address-card', path_title_gr: 'Η Κάρτα Μου', path_title_en: 'My Library Card', roles: ['admin', 'librarian', 'professor', 'student'] } },
            { path: 'cards', data: { faIcon: 'fa-address-card', path_title_gr: 'Κάρτες Βιβλιοθήκης', path_title_en: 'Library Cards', roles: ['admin', 'librarian'] } },
            { path: 'card/:barcode', data: { faIcon: 'fa-address-card', path_title_gr: 'Κάρτα Βιβλιοθήκης', path_title_en: 'Library Card', roles: ['admin', 'librarian'], noNav: true } },
            { path: 'resource-mate', data: { faIcon: 'fa-database', path_title_gr: 'ResourceMate', path_title_en: 'ResourceMate', roles: ['admin', 'librarian'] } }
        ]},
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]},
];

export const CPRouting = RouterModule.forChild(CPRoutes);
