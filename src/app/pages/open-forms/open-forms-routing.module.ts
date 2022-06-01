import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LetterOfRecommendationComponent } from './letter-of-recommendation/letter-of-recommendation.component';

const routes: Routes = [
    {
        path: 'letter-of-recommendation', component: LetterOfRecommendationComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenFormsRoutingModule { }
