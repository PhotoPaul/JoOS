import { Component, OnInit } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Component({
  templateUrl: './variables.component.html'
})
export class VariablesComponent implements OnInit {
    public variables: Variable[];

    constructor(private ajax: AjaxService) { }

    async ngOnInit() {
        this.variables = (await this.ajax.get('getVariablesData') as AjaxResponse).data;
    }

    async updateValue(variable: Variable, ngForm, $valueControl, $buttonControl) {
        $valueControl.disabled = true;
        variable.value = (await this.ajax.get('updateVariable', { name: variable.name, value: variable.value }) as AjaxResponse).data;
        $valueControl.disabled = false;
        $buttonControl.ajax.state = 'idle';
        ngForm.controls.variableInput.markAsPristine();
    }
}

interface Variable {
    name: string;
    type: string;
    value: string;
    dateTime: string;
}
