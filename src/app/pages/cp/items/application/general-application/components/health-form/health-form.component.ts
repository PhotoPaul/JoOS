import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-health-form',
    templateUrl: './health-form.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class HealthFormComponent {
    @Input() healthData: any;
    @Input() userId: any;
    @Input() documentsList: any[] = [];
    @Input() validate: boolean;
    @Input() formLoading: boolean;

    @Output() save = new EventEmitter<{ current: string, next: string }>();

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }
}
