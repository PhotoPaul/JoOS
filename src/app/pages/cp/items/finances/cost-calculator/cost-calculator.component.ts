import { Component, OnInit } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Component({
    selector: 'cost-calculator',
    templateUrl: './cost-calculator.component.html'
})
export class CostCalculatorComponent implements OnInit {
    public calculatorModel: CalculatorModel;

    constructor(private ajax: AjaxService) { }

    async ngOnInit() {
        this.calculatorModel = (await this.ajax.get('getPriceCalculatorData') as AjaxResponse).data;
    }

    noPersonsSet() {
        delete this.calculatorModel.resident;
        delete this.calculatorModel.noResidents;
        delete this.calculatorModel.noFullTimeStudents;
    }

    residentSet(resident) {
        if (resident === '1') {
            if (this.isSingle()) {
                this.calculatorModel.noResidents = '1';
                this.calculatorModel.noFullTimeStudents = '1';
            } else if (this.isCouple) {
                this.calculatorModel.noResidents = '2';
                delete this.calculatorModel.noFullTimeStudents;
            }
        } else {
            delete this.calculatorModel.noResidents;
            delete this.calculatorModel.noFullTimeStudents;
        }
    }

    noFullTimeStudentsSet() {
        this.calculatorModel.noCredits = 0;
        this.calculatorModel.noMeals = '0';
    }

    isSingle() {
        return this.calculatorModel.noPersons === '1';
    }

    isCouple() {
        return this.calculatorModel.noPersons === '2';
    }

    isResident() {
        return this.calculatorModel.noResidents === '1' || this.calculatorModel.noResidents === '2';
    }

    isNonResident() {
        return this.calculatorModel.resident === '0';
    }

    isFullTime() {
        return this.isResident() || this.calculatorModel.noFullTimeStudents === '1' || this.calculatorModel.noFullTimeStudents === '2';
    }

    isCoupleFullTime() {
        return this.calculatorModel.noFullTimeStudents === '2';
    }

    isCoupleNotFullTime() {
        return this.isCouple() && this.calculatorModel.noFullTimeStudents === '1';
    }

    isPartTime() {
        return this.calculatorModel.noFullTimeStudents === '0';
    }
}

interface CalculatorModel {
    feeRegistration: number;
    feeStudentCredit: number;
    feeAuditorCredit: number;
    priceSingleResident: number;
    priceSingleNonResidentFullTime: number;
    priceCoupleResidentFullTime: number;
    priceCoupleResidentCoupleNotFullTimeTwoMeals: number;
    priceCoupleResidentCoupleNotFullTimeOneMeal: number;
    priceCoupleNonResidentCoupleFullTime: number;
    priceCoupleNonResidentCoupleNotFullTime: number;
    noCredits: number;
    noPersons: string;
    resident: string;
    noResidents: string;
    noFullTimeStudents: string;
    noMeals: string;
}
