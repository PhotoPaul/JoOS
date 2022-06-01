import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../../../localization/localization.module';
import { UIModule } from '../../../../ui/ui.module';
import { AdmissionRoutingModule } from './admission-routing.module';
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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        AdmissionRoutingModule
    ],
    declarations: [
        AdmissionsCandidateListComponent,
        AdmissionsProgressComponent,
        ApplicationFolderComponent,
        // Greek Components
        CompleteApplicationComponent,
        CompleteEducationComponent,
        CompleteHealthComponent,
        CompleteChristianLifeComponent,
        CompleteReferencesComponent,
        CompleteFinancialComponent,
        // ISP Components
        CompleteISPPersonalComponent,
        CompleteISPEducationComponent,
        CompleteISPHealthComponent,
        CompleteISPChristianLifeComponent,
        CompleteISPReferencesComponent,
        CompleteISPFinancialComponent,
        CompleteISPApplicantClassificationComponent,
        // Common Components
        CompleteSupportingDocumentsComponent,
        CompleteISPApplicationFeeComponent
    ]
})
export class AdmissionModule { }
