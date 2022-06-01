import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmissionsCandidateListComponent } from './admissions-candidate-list.component';
import { AdmissionsProgressComponent } from './admissions-progress.component';
import { ApplicationFolderComponent } from './application-folder/application-folder.component';
import { CompleteChristianLifeComponent } from './greek/christian-life/complete-christian-life.component';
import { CompleteEducationComponent } from './greek/education/complete-education.component';
import { CompleteFinancialComponent } from './greek/financial/complete-financial.component';
import { CompleteHealthComponent } from './greek/health/complete-health.component';
import { CompleteApplicationComponent } from './greek/personal/complete-personal.component';
import { CompleteReferencesComponent } from './greek/references/complete-references.component';
import {
    CompleteISPApplicantClassificationComponent,
} from './isp/applicant-classification/applicant-classification.component';
import { CompleteISPApplicationFeeComponent } from './isp/application-fee/complete-application-fee.component';
import { CompleteISPChristianLifeComponent } from './isp/christian-life/complete-christian-life.component';
import { CompleteISPEducationComponent } from './isp/education/complete-education.component';
import { CompleteISPFinancialComponent } from './isp/financial/complete-financial.component';
import { CompleteISPHealthComponent } from './isp/health/complete-health.component';
import { CompleteISPPersonalComponent } from './isp/personal/complete-personal.component';
import { CompleteISPReferencesComponent } from './isp/references/complete-references.component';
import { CompleteSupportingDocumentsComponent } from './supporting-documents/complete-supporting-documents.component';

// Greek Program Components
// ISP Components
const routes: Routes = [
    { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'applications' },

    { path: 'applications/:id/:programId', data: { faIcon: 'fa-edit', path_title_gr: 'Αιτήσεις', path_title_en: 'Applications', noNav: true, roles: ['admin', 'registrar', 'cashier', 'admissions'] }, component: AdmissionsCandidateListComponent },
    { path: 'applications/:id', data: { faIcon: 'fa-edit', path_title_gr: 'Αιτήσεις', path_title_en: 'Applications', noNav: true, roles: ['admin', 'registrar', 'cashier', 'admissions'] }, component: AdmissionsCandidateListComponent },
    { path: 'applications', data: { faIcon: 'fa-edit', path_title_gr: 'Αιτήσεις', path_title_en: 'Applications', roles: ['admin', 'registrar', 'cashier', 'admissions'] }, component: AdmissionsCandidateListComponent },
    { path: 'decide/:id', data: { faIcon: 'fa-level-up-alt', path_title_gr: 'Πρόοδος Αποδοχής', path_title_en: 'Admission Progress', noNav: true, roles: ['admin', 'registrar', 'admissions'] }, component: AdmissionsProgressComponent },
    { path: 'decide', data: { faIcon: 'fa-level-up-alt', path_title_gr: 'Πρόοδος Αποδοχής', path_title_en: 'Admission Progress', roles: ['admin', 'registrar', 'admissions'] }, component: AdmissionsProgressComponent },

    { path: 'admissions/:id', data: { faIcon: 'fa-level-up-alt', path_title_gr: 'Πρόοδος Αποδοχής', path_title_en: 'Admission Progress', noNav: true, roles: ['admin', 'registrar', 'admissions'] }, component: AdmissionsProgressComponent },
    { path: 'admissions', data: { faIcon: 'fa-level-up-alt', path_title_gr: 'Πρόοδος Αποδοχής', path_title_en: 'Admission Progress', roles: ['admin', 'registrar', 'admissions'] }, component: AdmissionsProgressComponent },
    // Greek Program
    { path: 'greek', data: { faIcon: 'fa-edit', path_title_gr: 'Ελληνικό Πρόγραμμα', path_title_en: 'Greek Program', roles: ['admin', 'registrar', 'admissions'] }, children: [
        { path: 'personal/:id', data: { faIcon: 'fa-edit', path_title_gr: 'Αίτηση Εγγραφής', path_title_en: 'Application Form', noNav: true }, component: CompleteApplicationComponent },
        { path: 'education/:id', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Σπουδές / Εκπαίδευση', path_title_en: 'Education / Training', noNav: true }, component: CompleteEducationComponent },
        { path: 'health/:id', data: { faIcon: 'fa-medkit', path_title_gr: 'Κατάσταση Υγείας', path_title_en: 'Health Status', noNav: true }, component: CompleteHealthComponent },
        { path: 'christian-life/:id', data: { faIcon: 'fa-heart', path_title_gr: 'Πνευματική Ζωή', path_title_en: 'Christian Life',  noNav: true }, component: CompleteChristianLifeComponent },
        { path: 'references/:id', data: { faIcon: 'fa-envelope', path_title_gr: 'Συστατικές Επιστολές', path_title_en: 'Recommendation Letters', noNav: true }, component: CompleteReferencesComponent },
        { path: 'financial/:id', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομική Ευθύνη', path_title_en: 'Financial Liability', noNav: true }, component: CompleteFinancialComponent }
    ]},
    // ISP Program
    { path: 'isp', data: { faIcon: 'fa-edit', path_title_gr: 'Διεθνές Πρόγραμμα', path_title_en: 'International Student Program', roles: ['admin', 'registrar', 'admissions'] }, children: [
        { path: 'personal/:id', data: { faIcon: 'fa-edit', path_title_gr: 'Αίτηση Εγγραφής', path_title_en: 'Personal Information', roles: ['admin', 'registrar', 'admissions'] }, component: CompleteISPPersonalComponent },
        { path: 'education/:id', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Σπουδές / Εκπαίδευση', path_title_en: 'Education / Training', noNav: true }, component: CompleteISPEducationComponent },
        { path: 'health/:id', data: { faIcon: 'fa-medkit', path_title_gr: 'Κατάσταση Υγείας', path_title_en: 'Health Status', noNav: true }, component: CompleteISPHealthComponent },
        { path: 'christian-life/:id', data: { faIcon: 'fa-heart', path_title_gr: 'Πνευματική Ζωή', path_title_en: 'Christian Life',  noNav: true }, component: CompleteISPChristianLifeComponent },
        { path: 'references/:id', data: { faIcon: 'fa-envelope', path_title_gr: 'Συστατικές Επιστολές', path_title_en: 'References', noNav: true }, component: CompleteISPReferencesComponent },
        { path: 'applicant-classification/:id', data: { faIcon: 'fa-folder-open', path_title_gr: 'Κατηγοριοποίηση Υποψηφίου', path_title_en: 'Applicant Classification', noNav: true }, component: CompleteISPApplicantClassificationComponent },
        { path: 'financial/:id', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομική Ευθύνη', path_title_en: 'Financial Liability', noNav: true }, component: CompleteISPFinancialComponent },
        { path: 'application-fee/:id', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Παράβολο Αίτησης', path_title_en: 'Application Fee', noNav: true }, component: CompleteISPApplicationFeeComponent }
    ]},
    { path: 'supporting-documents/:id', data: { faIcon: 'fa-file', path_title_gr: 'Δικαιολογητικά', path_title_en: 'Application Documents', noNav: true }, component: CompleteSupportingDocumentsComponent },
    { path: ':id', data: { faIcon: 'fa-edit', path_title_gr: 'Φάκελος Εγγραφής', path_title_en: 'Applications', noNav: true, roles: ['admin', 'registrar', 'cashier', 'admissions'] }, component: ApplicationFolderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
