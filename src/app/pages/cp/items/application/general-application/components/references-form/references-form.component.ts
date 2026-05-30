import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { LocalizationService } from '../../../../../../../localization/localization.service';
import { CITIZENSHIP_COUNTRIES } from '../personal-info-form/countries';

@Component({
    selector: 'app-references-form',
    templateUrl: './references-form.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ReferencesFormComponent {
    @Input() referencesData: any;
    @Input() userId: any;
    @Input() documentsList: any[] = [];
    @Input() validate: boolean;
    @Input() formLoading: boolean;

    @Output() save = new EventEmitter<{ current: string, next: string }>();

    countries = CITIZENSHIP_COUNTRIES;

    constructor(
        private localizationService: LocalizationService
    ) {}

    get isEnglish(): boolean {
        return this.localizationService.getActiveLanguage() === 'en';
    }

    get sortedCountries() {
        const isEng = this.isEnglish;
        return [...this.countries].sort((a, b) => {
            const nameA = isEng ? a.en : a.gr;
            const nameB = isEng ? b.en : b.gr;
            return nameA.localeCompare(nameB, isEng ? 'en' : 'el');
        });
    }

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }

    getDecisionColor(referenceId) {
        if (typeof referenceId === 'undefined' || referenceId === null) {
            return 'blue';
        } else if (referenceId === '0') {
            return 'red';
        } else {
            return 'green';
        }
    }
}
