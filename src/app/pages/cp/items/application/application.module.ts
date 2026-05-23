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
        FinancialFormComponent
    ]
})
export class ApplicationModule { }
