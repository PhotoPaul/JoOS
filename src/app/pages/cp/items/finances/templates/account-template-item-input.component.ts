import { Component } from '@angular/core';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AccountTemplateItemInputModel } from '../finances';
import { FinancesService } from '../finances.service';

@Component({
    selector: 'template-item-input',
    templateUrl: 'account-template-item-input.component.html'
})
export class AccountTemplateItemInputComponent {
    model: AccountTemplateItemInputModel = {
        visible: false
    } as AccountTemplateItemInputModel;
    public disabled = false;

    constructor(public financesService: FinancesService, private localization: LocalizationService) { }

    updateAccountTemplateItemInputModel(accountTemplateItemInputModel: AccountTemplateItemInputModel = {
        visible: true,
        title: this.localization.s('newTemplate'),
        accountTemplateItem: {
            name: ''
        }
    } as AccountTemplateItemInputModel) {
        this.model = accountTemplateItemInputModel;
    }

    onAmountChange($event) {
        this.model.accountTemplateItem.amount = $event.replace(/,/g, '.');
    }

    onSubmit() {
        this.disabled = true;
        this.financesService.saveAccountTemplateItem(this.model.accountTemplateItem)
            .then(() => {
                this.model.visible = false;
                this.disabled = false;
            });
    }

    accountTemplateItemDeleteClicked(id) {
        this.financesService.deleteAccountTemplateItem(id)
            .then(() => {
                this.model.visible = false;
            });
    }
}
