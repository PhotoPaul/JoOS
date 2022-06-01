import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'date-input',
    templateUrl: 'date-input.component.html'
})
export class DateInputComponent {
    @Input() date;
    @Input() minDate;
    @Input() maxDate;
    @Input() placeholder = 'yyyy-mm-dd';
    @Input() disabled = false;
    @Input() required = true;
    @Output() onChange = new EventEmitter();
    visible = false;

    constructor() { }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    toggle() {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    selectionDone($event) {
        this.hide();
        this.onChange.emit($event);
    }

    test($event) {
        if (
            'relatedTarget' in $event &&
            $event.relatedTarget !== null &&
            (
                $event.relatedTarget.id.substr(0, 10) === 'datepicker' ||
                $event.relatedTarget.innerText === '‹' ||
                $event.relatedTarget.innerText === '›' ||
                $event.relatedTarget.nodeName === 'DAYPICKER' ||
                (
                    'parentElement' in $event.relatedTarget &&
                    $event.relatedTarget.parentElement.id.substr(0, 10) === 'datepicker'
                )
            )
        ) {
            return;
        }
        this.hide();
    }
}
