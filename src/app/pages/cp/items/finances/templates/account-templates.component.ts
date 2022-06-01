import { Component, OnInit, ViewChild } from '@angular/core';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AccountTemplateItemInputModel } from '../finances';
import { FinancesService } from '../finances.service';
import { AccountTemplateItemInputComponent } from './account-template-item-input.component';

@Component({
    templateUrl: 'account-templates.component.html'
})
export class AccountTemplatesComponent implements OnInit {
    @ViewChild(AccountTemplateItemInputComponent)
    private accountTemplateItemInput: AccountTemplateItemInputComponent;

    constructor(public financesService: FinancesService, private localization: LocalizationService) { }

    ngOnInit() {
        this.financesService.getAccountTemplatesData();
    }

    editAccountTemplateItem(id) {
        for (const i in this.financesService.accountTemplatesData.accountTemplates) {
            if (this.financesService.accountTemplatesData.accountTemplates.hasOwnProperty(i)) {
                for (const j in this.financesService.accountTemplatesData.accountTemplates[i].accountTemplateItems) {
                    if (this.financesService.accountTemplatesData.accountTemplates[i].accountTemplateItems[j].id === id) {
                        const accountTemplateItemInputModel: AccountTemplateItemInputModel = {
                            visible: true,
                            title: this.localization.s('editRecord'),
                            accountTemplateItem: this.financesService.accountTemplatesData.accountTemplates[i].accountTemplateItems[j]
                        };
                        accountTemplateItemInputModel.accountTemplateItem.name = this.financesService.accountTemplatesData.accountTemplates[i].name;
                        this.accountTemplateItemInput.updateAccountTemplateItemInputModel(accountTemplateItemInputModel);
                        break;
                    }
                }
            }
        }
    }
}
