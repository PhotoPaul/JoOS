import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-reg-study-mode',
    templateUrl: './reg-study-mode.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegStudyModeComponent {
    @Input() registrationData: any;
    @Input() validate: boolean;
    @Input() formLoading: boolean;

    @Output() save = new EventEmitter<{ current: string, next: string }>();

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }
}
