import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TeachingScheduleDay } from '../academics';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'teaching-day',
    templateUrl: 'teaching-day.component.html',
    styles: [
        'table.padding-10 th, td { padding: 10px }'
    ]
})
export class TeachingDayComponent implements OnInit {
    @Input() day: TeachingScheduleDay | any;
    @Input() showMonth: boolean;
    @Output() onEditItemClicked = new EventEmitter();
    @Output() onDeleteItemClicked = new EventEmitter();
    @Output() onNewScheduleItemClicked = new EventEmitter();
    relationToToday: number;

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit() {
        if (this.day.dateObj.getDate() === 1) {
            this.showMonth = true;
        }
        this.relationToToday = this.scheduleService.getRelationToToday(this.day.dateObj);
    }

    editItemClicked(item) {
        this.onEditItemClicked.emit(item);
    }

    showCourse(item) {
        window.open('https://www.grbc.gr/moodle/course/view.php?id=' + item.moodle_id);
    }

    deleteItemClicked(item) {
        this.onDeleteItemClicked.emit(item);
    }

    newScheduleItemClicked(day: TeachingScheduleDay) {
        day.dateObj.setHours(9, 0, 0);
        this.onNewScheduleItemClicked.emit({
            dateTime: day.dateObj
        });
    }

    getClass() {
        if (this.relationToToday === -1) {
            return 'dark-blue';
        } else if (this.relationToToday === 0) {
            return 'orange';
        }
        // return 'blue';
        return 'dark-blue';
    }
}
