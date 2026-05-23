import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { FinancesService } from '../../../../finances/finances.service';

declare let $;

@Component({
    selector: 'app-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class PersonalInfoFormComponent {
    @Input() userId: any;
    @Input() documentsList: any[] = [];
    @Input() validate: boolean;
    @Input() formLoading: boolean;
    @Input() maxDate: Date;

    private _personalData: any;
    @Input()
    set personalData(val: any) {
        this._personalData = val;
        if (val && val.application) {
            this.updateUnderage(val.application.birthDate);
        }
    }
    get personalData() {
        return this._personalData;
    }

    @Output() save = new EventEmitter<{ current: string, next: string }>();
    @Output() dateChanged = new EventEmitter<void>();

    underage = false;

    constructor(private financesService: FinancesService) {}

    updateDateModel($event: Date | any) {
        if (this.personalData) {
            this.personalData.application.birthDate = this.financesService.getDateAsString($event);
            this.updateUnderage($event);
            this.dateChanged.emit();
        }
    }

    updateUnderage(birthDate) {
        if (!birthDate) return;
        this.underage = ~~((Date.now() - new Date(birthDate).getTime()) / (31557600000)) < 18;
        if (!this.underage && this.personalData) {
            this.personalData.application.guardianFirstName = null;
            this.personalData.application.guardianLastName = null;
            this.personalData.application.guardianOccupation = null;
            this.personalData.application.guardianEmail = null;
            this.personalData.application.guardianPhone = null;
            this.personalData.application.guardianAddressSame = null;
            this.personalData.application.guardianAddress = null;
            this.personalData.application.guardianCity = null;
            this.personalData.application.guardianCountry = null;
            this.personalData.application.guardianOpinion = null;
        }
    }

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }

    collapsePanel(currentPanel: string, nextPanel: string) {
        if (currentPanel) {
            $(`#${currentPanel}`).collapse('hide');
        }
        if (nextPanel) {
            $(`#${nextPanel}`).collapse('show');
        }
    }
}
