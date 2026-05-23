import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-financial-form',
    templateUrl: './financial-form.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FinancialFormComponent {
    @Input() financialData: any;
    @Input() userId: any;
    @Input() documentsList: any[] = [];
    @Input() validate: boolean;
    @Input() formLoading: boolean;
    @Input() orderUrl: string;

    @Output() save = new EventEmitter<{ current: string, next: string }>();
    @Output() createOrder = new EventEmitter<void>();
    @Output() openOrder = new EventEmitter<void>();

    onSave(current: string, next: string) {
        this.save.emit({ current, next });
    }

    onCreateOrder() {
        this.createOrder.emit();
    }

    onOpenOrder() {
        this.openOrder.emit();
    }
}
