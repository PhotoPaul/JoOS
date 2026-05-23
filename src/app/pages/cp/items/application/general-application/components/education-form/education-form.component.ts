import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-education-form',
    templateUrl: './education-form.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class EducationFormComponent {
    @Input() educationData: any;
    @Input() userId: any;
    @Input() documentsList: any[] = [];
    @Input() validate: boolean;
    @Input() formLoading: boolean;

    @Output() save = new EventEmitter<{ current: string, next: string }>();

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }
}
