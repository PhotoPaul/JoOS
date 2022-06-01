import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UIModule } from '../../../../../ui/ui.module';
import { RuleManagerComponent } from './rule-manager/rule-manager.component';
import { ScheduleMakerRoutingModule } from './schedule-maker-routing.module';
import { ScheduleMakerComponent } from './schedule-maker.component';
import { ScheduleMakerService } from './schedule-maker.service';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        ScheduleMakerRoutingModule
    ],
    declarations: [
      ScheduleMakerComponent,
      RuleManagerComponent
    ],
    providers: [
        ScheduleMakerService
    ]
})
export class ScheduleMakerModule { }
