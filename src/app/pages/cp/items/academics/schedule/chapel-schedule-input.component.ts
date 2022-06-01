import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FinancesService } from '../../finances/finances.service';
import { ChapelScheduleItem } from '../academics';

@Component({
    selector: 'chapel-schedule-input',
    templateUrl: './chapel-schedule-input.component.html',
    styles: [
        '.center-table ::ng-deep table { margin-left: auto; margin-right: auto; }',
        '.center { text-align: center; }'
    ]
})
export class ChapelScheduleInputComponent implements OnInit {
    @Input() scheduleItemInputModel: ChapelScheduleItem | any;
    @Input() categories: any[];
    @Output() onScheduleItemInputSubmit = new EventEmitter();
    @Output() onCancelScheduleItemInput = new EventEmitter();

    constructor(private financesService: FinancesService) { }

    ngOnInit() {}

    scheduleItemInputSubmit($this, dataValue) {
        return new Promise(resolve => {
            const scheduleItem = $this.parent.scheduleItemInputModel;
            scheduleItem.status = dataValue;
            scheduleItem.dateTimeAsString = $this.parent.financesService.getDateAsString(scheduleItem.dateTime);
            $this.parent.onScheduleItemInputSubmit.emit(scheduleItem);
            resolve();
        });
    }

    cancelScheduleItemInput() {
        this.onCancelScheduleItemInput.emit();
    }

    scheduleItemUpdateDateModel($event) {
        const time = {
            hours: this.scheduleItemInputModel.dateTime.getHours(),
            minutes: this.scheduleItemInputModel.dateTime.getMinutes(),
            seconds: this.scheduleItemInputModel.dateTime.getSeconds()
        };
        this.scheduleItemInputModel.dateTime = $event;
        this.scheduleItemInputModel.dateTime.setHours(time.hours, time.minutes, time.seconds);
    }

    scheduleItemUpdateTimeModel($event) {
        this.scheduleItemInputModel.dateTime.setHours($event.getHours(), $event.getMinutes(), $event.getSeconds());
    }
}
