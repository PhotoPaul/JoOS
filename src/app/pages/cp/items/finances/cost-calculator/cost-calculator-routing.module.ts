import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CostCalculatorComponent } from './cost-calculator.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', data: { faIcon: 'fa-calculator', path_title_gr: 'Υπολογιστής Κόστους', path_title_en: 'Fee Calculator' }, component: CostCalculatorComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CostCalculatorRoutingModule { }
