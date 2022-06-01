import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleMakerComponent } from './schedule-maker.component';

const routes: Routes = [
    {
        path: '',
        data: {
            faIcon: 'fa-calendar-alt',
            path_title_gr: 'Δημιουργία Προγράμματος Διδασκαλίας',
            path_title_en: 'Teaching Schedule Maker'
        },
        component: ScheduleMakerComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleMakerRoutingModule { }
