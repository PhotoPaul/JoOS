import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'date-input',
    templateUrl: 'date-input.component.html'
})
export class DateInputComponent {
    @Input() date;
    @Input() minDate;
    @Input() maxDate;
    @Input() placeholder = 'dd-mm-yyyy';
    @Input() disabled = false;
    @Input() required = true;
    @Output() onChange = new EventEmitter();
    visible = false;

    constructor() { }

    get formattedDate(): string {
        if (!this.date) {
            return '';
        }
        let dateObj: Date;
        if (this.date instanceof Date) {
            dateObj = this.date;
        } else if (typeof this.date === 'string') {
            // Replace '-' with '/' to make it cross-browser compatible
            const normalizedDateStr = this.date.split('-').join('/');
            dateObj = new Date(normalizedDateStr);
        } else {
            dateObj = new Date(this.date);
        }

        // Check if dateObj is a valid date
        if (isNaN(dateObj.getTime())) {
            return '';
        }

        // Format as dd-mm-yyyy
        const day = ('0' + dateObj.getDate()).slice(-2);
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    }

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
