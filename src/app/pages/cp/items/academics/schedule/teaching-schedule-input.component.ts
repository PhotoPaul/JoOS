import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FinancesService } from '../../finances/finances.service';
import { Course, TeachingScheduleItem } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    selector: 'teaching-schedule-input',
    templateUrl: './teaching-schedule-input.component.html'
})
export class TeachingScheduleInputComponent implements OnInit {
    @Input() scheduleItemInputModel: TeachingScheduleItem | any;
    @Input() courses: Course[];
    @Output() onScheduleItemInputSubmit = new EventEmitter();
    @Output() onCancelScheduleItemInput = new EventEmitter();

    constructor(private academicsService: AcademicsService, private financesService: FinancesService) { }

    ngOnInit() {}

    scheduleItemUpdateDateModel($event) {
        const time = {
            hours: this.scheduleItemInputModel.dateTime.getHours(),
            minutes: this.scheduleItemInputModel.dateTime.getMinutes(),
            seconds: this.scheduleItemInputModel.dateTime.getSeconds()
        };
        this.scheduleItemInputModel.dateTime = $event;
        this.scheduleItemInputModel.dateTime.setHours(time.hours, time.minutes, time.seconds);
    }

    cancelScheduleItemInput() {
        this.onCancelScheduleItemInput.emit();
    }

    scheduleItemUpdateTimeModel($event) {
        this.scheduleItemInputModel.dateTime.setHours($event.getHours(), $event.getMinutes(), $event.getSeconds());
    }

    scheduleItemInputSubmit() {
        const scheduleItem = this.scheduleItemInputModel;
        this.scheduleItemInputModel.dateTimeAsString = this.financesService.getDateAsString(this.scheduleItemInputModel.dateTime);
        this.onScheduleItemInputSubmit.emit(this.scheduleItemInputModel);
    }
}
