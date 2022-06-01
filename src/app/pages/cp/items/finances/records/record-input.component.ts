import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AccountTemplateInputModel, RecordInputModel } from '../finances';
import { FinancesService } from '../finances.service';

@Component({
    selector: 'record-input',
    templateUrl: 'record-input.component.html'
})
export class RecordInputComponent {
    @Input() userId: number;
    public minDate: Date = new Date(new Date().getFullYear() - 1, 0, 1);
    public maxDate: Date = new Date(new Date().getFullYear(), 11, 31);

    accountTemplateInputModel: AccountTemplateInputModel = {
        visible: false,
        previewVisible: false
    } as AccountTemplateInputModel;
    recordInputModel: RecordInputModel = {
        visible: false
    } as RecordInputModel;
    public disabled = false;
    private lastRecordDate: string = this.financesService.getDateAsString(null);

    constructor(public router: Router, public financesService: FinancesService, private localization: LocalizationService) { }

    accountTemplateInputUpdateModel(accountTemplateInputModel: AccountTemplateInputModel = {
        visible: true,
        date: this.lastRecordDate,
        title: this.localization.s('importTemplate'),
    } as AccountTemplateInputModel) {
        if (this.recordInputModel.record && this.recordInputModel.record.id) {
            delete this.recordInputModel.record.id;
        }
        this.accountTemplateInputOnInit();
        this.accountTemplateInputModel = accountTemplateInputModel;
    }

    accountTemplateUpdateDateModel($event) {
        this.accountTemplateInputModel.date = this.financesService.getDateAsString($event);
    }

    recordInputUpdateModel(recordInputModel: RecordInputModel = {
        visible: true,
        title: this.localization.s('newRecord'),
        record: {
            userId: this.userId,
            date_time: this.lastRecordDate
        }
    } as RecordInputModel) {
        this.accountTemplateInputModel.visible = false;
        this.recordInputModel = recordInputModel;
    }

    recordInputUpdateDateModel($event) {
        this.recordInputModel.record.date_time = this.financesService.getDateAsString($event);
    }

    recordInputOnSubmit() {
        this.disabled = true;
        this.lastRecordDate = this.recordInputModel.record.date_time;
        this.financesService.saveRecord(this.recordInputModel.record)
            .then(() => {
                this.recordInputModel.visible = false;
                this.disabled = false;
            });
    }

    recordInputDeleteClicked(id) {
        this.financesService.deleteRecord(id)
            .then(() => {
                this.recordInputModel.visible = false;
            });
    }

    onAmountChange($event) { // TODO: Strip all non-numeric characters
        this.recordInputModel.record.amount = $event.replace(/,/g, '.');
    }

    accountTemplateInputOnInit() {
        this.financesService.getAccountTemplatesData();
    }

    accountTemplateInputOnSubmit() {
        this.lastRecordDate = this.accountTemplateInputModel.date;
        this.financesService.saveRecordsByAccountTemplateName(
            this.financesService.userRecordsData.userData.id,
            this.accountTemplateInputModel.accountTemplateName,
            this.accountTemplateInputModel.date
        )
            .then(() => {
                this.accountTemplateInputModel.visible = false;
            });
    }

    accountTemplateTogglePreview() {
        this.accountTemplateInputModel.previewVisible = !this.accountTemplateInputModel.previewVisible;
    }
}
