import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CostCalculatorRoutingModule } from './cost-calculator-routing.module';
import { CostCalculatorComponent } from './cost-calculator.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CostCalculatorRoutingModule
    ],
    declarations: [
        CostCalculatorComponent
    ]
})
export class CostCalculatorModule { }
