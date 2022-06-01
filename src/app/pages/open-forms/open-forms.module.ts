import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../localization/localization.module';
import { UIModule } from '../../ui/ui.module';
import { LetterOfRecommendationComponent } from './letter-of-recommendation/letter-of-recommendation.component';
import { OpenFormsRoutingModule } from './open-forms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OpenFormsRoutingModule,
    FormsModule,
    UIModule,
    LocalizationModule
  ],
  declarations: [LetterOfRecommendationComponent]
})
export class OpenFormsModule { }
