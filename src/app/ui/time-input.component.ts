import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'time-input',
    templateUrl: './time-input.component.html'
})
export class TimeInputComponent implements OnInit {
    @Input() time: Date;
    @Output() onChange = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    timeChanged(isValid, timepicker) {
        if (isValid) {
            this.onChange.emit(this.time);
        }
    }
}
