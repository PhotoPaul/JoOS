import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[actionSelect]',
  templateUrl: './action-select.component.html'
})
export class ActionSelectComponent implements OnInit {
    @Input() defaultOptionText: string;
    @Input() options: any[];
    @Input() optionTextPropertyName: string;
    @Input() selectedOption: number;
    @Output() selectedOptionChange = new EventEmitter;
    @Output() changed = new EventEmitter();
    @Output() edit = new EventEmitter();
    editing = false;

    constructor() { }

    ngOnInit() { }

    enableEditing() {
        this.edit.emit();
        this.editing = true;
    }

    saveOption($event) {
        if (this.editing === true && ($event.type === 'change' || $event.type === 'blur')) {
            this.selectedOptionChange.emit(+$event.target.value);
            this.changed.emit(this.selectedOption);
            this.editing = false;
        }
    }

}
