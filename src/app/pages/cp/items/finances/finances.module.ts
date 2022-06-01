import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../../../localization/localization.module';
import { UIModule } from '../../../../ui/ui.module';
import { FinancesRoutingModule } from './finances-routing.module';
import { RecordInputComponent } from './records/record-input.component';
import { UserRecordsListComponent } from './records/user-records-list.component';
import { UserRecordsComponent } from './records/user-records.component';
import { AccountTemplateItemInputComponent } from './templates/account-template-item-input.component';
import { AccountTemplatesComponent } from './templates/account-templates.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        FinancesRoutingModule
    ],
    declarations: [
        UserRecordsComponent,
        UserRecordsListComponent,
        AccountTemplatesComponent,
        RecordInputComponent,
        AccountTemplateItemInputComponent
    ]
})
export class FinancesModule { }
