import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChristianLifeComponent } from './greek/christian-life/christian-life.component';
import { EducationComponent } from './greek/education/education.component';
import { FinancialComponent } from './greek/financial/financial.component';
import { HealthComponent } from './greek/health/health.component';
import { PersonalComponent } from './greek/personal/personal.component';
import { ReferencesComponent } from './greek/references/references.component';
import { ISPApplicantClassificationComponent } from './isp/applicant-classification/applicant-classification.component';
import { ISPApplicationFeeComponent } from './isp/application-fee/application-fee.component';
import { ISPChristianLifeComponent } from './isp/christian-life/christian-life.component';
import { ISPEducationComponent } from './isp/education/education.component';
import { ISPFinancialComponent } from './isp/financial/financial.component';
import { ISPHealthComponent } from './isp/health/health.component';
import { ISPPersonalComponent } from './isp/personal/personal.component';
import { ISPReferencesComponent } from './isp/references/references.component';
import { SupportingDocumentsComponent } from './supporting-documents/supporting-documents.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'personal' },
    // Greek Program Components
    { path: 'greek', data: { faIcon: 'fa-edit', path_title_gr: 'Ελληνικό Πρόγραμμα', path_title_en: 'Greek Program', roles: ['candidate'] }, children: [
        { path: 'personal', data: { faIcon: 'fa-edit ', path_title_gr: 'Αίτηση Εγγραφής', path_title_en: 'Application Form', roles: ['candidate'] }, component: PersonalComponent },
        { path: 'education', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Σπουδές / Εκπαίδευση', path_title_en: 'Education / Training', roles: ['candidate'] }, component: EducationComponent },
        { path: 'health', data: { faIcon: 'fa-medkit', path_title_gr: 'Κατάσταση Υγείας', path_title_en: 'Health Status', roles: ['candidate'] }, component: HealthComponent },
        { path: 'christian-life', data: { faIcon: 'fa-heart', path_title_gr: 'Πνευματική Ζωή', path_title_en: 'Christian Life', roles: ['candidate'] }, component: ChristianLifeComponent },
        { path: 'references', data: { faIcon: 'fa-envelope', path_title_gr: 'Συστατικές Επιστολές', path_title_en: 'Recommendation Letters', roles: ['candidate'] }, component: ReferencesComponent },
        { path: 'financial', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομική Ευθύνη', path_title_en: 'Financial Liability', roles: ['candidate'] }, component: FinancialComponent }
    ]},
    // ISP Components
    { path: 'isp', data: { faIcon: 'fa-edit', path_title_gr: 'Διεθνές Πρόγραμμα', path_title_en: 'International Student Program', roles: ['candidate'] }, children: [
        { path: 'personal', data: { faIcon: 'fa-edit ', path_title_gr: 'Αίτηση Εγγραφής', path_title_en: 'Personal Information', roles: ['candidate'] }, component: ISPPersonalComponent },
        { path: 'education', data: { faIcon: 'fa-graduation-cap', path_title_gr: 'Σπουδές / Εκπαίδευση', path_title_en: 'Education', roles: ['candidate'] }, component: ISPEducationComponent },
        { path: 'health', data: { faIcon: 'fa-medkit', path_title_gr: 'Κατάσταση Υγείας', path_title_en: 'Health Status', roles: ['candidate'] }, component: ISPHealthComponent },
        { path: 'christian-life', data: { faIcon: 'fa-heart', path_title_gr: 'Πνευματική Ζωή', path_title_en: 'Christian Life', roles: ['candidate'] }, component: ISPChristianLifeComponent },
        { path: 'references', data: { faIcon: 'fa-envelope', path_title_gr: 'Συστατικές Επιστολές', path_title_en: 'References', roles: ['candidate'] }, component: ISPReferencesComponent },
        { path: 'applicant-classification', data: { faIcon: 'fa-folder-open', path_title_gr: 'Κατηγοριοποίηση Υποψηφίου', path_title_en: 'Applicant Classification', roles: ['registrar'] }, component: ISPApplicantClassificationComponent },
        { path: 'financial', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Οικονομική Ευθύνη', path_title_en: 'Financial Liability', roles: ['candidate'] }, component: ISPFinancialComponent },
        { path: 'application-fee', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Παράβολο Αίτησης', path_title_en: 'Application Fee', roles: ['candidate'] }, component: ISPApplicationFeeComponent }
    ]},
    // Common Components
    { path: 'supporting-documents', data: { faIcon: 'fa-file', path_title_gr: 'Δικαιολογητικά', path_title_en: 'Application Documents', roles: ['candidate'] }, component: SupportingDocumentsComponent },
    { path: '', redirectTo: '/cp' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
