import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../../../localization/localization.module';
import { UIModule } from '../../../../ui/ui.module';
import { ApplicationRoutingModule } from './application-routing.module';
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
import { GeneralApplicationComponent } from './general-application/general-application.component';
import { InlineUploaderComponent } from './general-application/inline-uploader.component';
import { PersonalInfoFormComponent } from './general-application/components/personal-info-form/personal-info-form.component';
import { EducationFormComponent } from './general-application/components/education-form/education-form.component';
import { HealthFormComponent } from './general-application/components/health-form/health-form.component';
import { ChristianLifeFormComponent } from './general-application/components/christian-life-form/christian-life-form.component';
import { ReferencesFormComponent } from './general-application/components/references-form/references-form.component';
import { FinancialFormComponent } from './general-application/components/financial-form/financial-form.component';
import { GeneralReferencesComponent } from './general-references/general-references.component';
import { GeneralRegistrationComponent } from './general-registration/general-registration.component';
import { RegStudyModeComponent } from './general-registration/components/reg-study-mode/reg-study-mode.component';
import { RegCourseSelectionComponent } from './general-registration/components/reg-course-selection/reg-course-selection.component';
import { RegMedicalComponent } from './general-registration/components/reg-medical/reg-medical.component';
import { RegContractComponent } from './general-registration/components/reg-contract/reg-contract.component';
import { RegFinancialComponent } from './general-registration/components/reg-financial/reg-financial.component';
import { ThreeYearApplicationComponent } from './three-year-application/three-year-application.component';
import { ThreeYearIdentityComponent } from './three-year-application/components/three-year-identity/three-year-identity.component';
import { ThreeYearFinancialComponent } from './three-year-application/components/three-year-financial/three-year-financial.component';
import { ThreeYearCallingComponent } from './three-year-application/components/three-year-calling/three-year-calling.component';
import { ThreeYearSubmissionComponent } from './three-year-application/components/three-year-submission/three-year-submission.component';

// Greek Program Components
// ISP Components
// Common Components
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        ApplicationRoutingModule
    ],
    declarations: [
        // Greek Components
        PersonalComponent,
        EducationComponent,
        HealthComponent,
        ChristianLifeComponent,
        ReferencesComponent,
        FinancialComponent,
        // ISP Components
        ISPPersonalComponent,
        ISPEducationComponent,
        ISPHealthComponent,
        ISPChristianLifeComponent,
        ISPReferencesComponent,
        ISPFinancialComponent,
        // Common Components
        SupportingDocumentsComponent,
        ISPApplicationFeeComponent,
        ISPApplicantClassificationComponent,
        GeneralApplicationComponent,
        InlineUploaderComponent,
        PersonalInfoFormComponent,
        EducationFormComponent,
        HealthFormComponent,
        ChristianLifeFormComponent,
        ReferencesFormComponent,
        FinancialFormComponent,
        GeneralReferencesComponent,
        GeneralRegistrationComponent,
        RegStudyModeComponent,
        RegCourseSelectionComponent,
        RegMedicalComponent,
        RegContractComponent,
        RegFinancialComponent,
        ThreeYearApplicationComponent,
        ThreeYearIdentityComponent,
        ThreeYearFinancialComponent,
        ThreeYearCallingComponent,
        ThreeYearSubmissionComponent
    ]
})
export class ApplicationModule { }
