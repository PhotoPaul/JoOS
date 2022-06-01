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
        ISPApplicantClassificationComponent
    ]
})
export class ApplicationModule { }
