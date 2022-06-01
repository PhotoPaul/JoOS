import { Component, Input, OnInit } from '@angular/core';

import { LocalizationService } from '../../localization/localization.service';

@Component({
    selector: 'required-field-warning',
    templateUrl: './required-field-warning.component.html'
})
export class RequiredFieldWarningComponent implements OnInit {
    @Input() warningText = this.localization.s('requiredField');
    @Input() noLink: boolean;

    constructor(public localization: LocalizationService) { }

    ngOnInit() { }
}
