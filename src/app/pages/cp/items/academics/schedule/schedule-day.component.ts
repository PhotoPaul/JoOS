import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ScheduleDay } from './schedule';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'schedule-day',
    templateUrl: './schedule-day.component.html',
    styles: [
        'table.padding-10 th, td { padding: 10px }',
        '.right { float: right; }',
        '.badge { white-space: normal; }'
    ]
})
export class ScheduleDayComponent implements OnInit {
    @Input() day: ScheduleDay | any;
    @Input() showMonth: boolean;
    @Input() defaultTimeHours = 9;
    @Output() onShowItemClicked = new EventEmitter();
    @Output() onEditItemClicked = new EventEmitter();
    @Output() onDeleteItemClicked = new EventEmitter();
    @Output() onNewScheduleItemClicked = new EventEmitter();
    relationToToday: number;

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit() {
        this.relationToToday = this.scheduleService.getRelationToToday(this.day.dateObj);
    }

    showItemClicked(item) {
        this.onShowItemClicked.emit(item);
    }

    editItemClicked(item) {
        this.onEditItemClicked.emit(item);
    }

    deleteItemClicked(item) {
        this.onDeleteItemClicked.emit(item);
    }

    newScheduleItemClicked(day) {
        day.dateObj.setHours(this.defaultTimeHours, 0, 0);
        this.onNewScheduleItemClicked.emit({
            dateTime: day.dateObj,
            categoryId: '1',
            description: ''
        });
    }

    getClass() {
        if (this.relationToToday === -1) {
            return 'dark-blue';
        } else if (this.relationToToday === 0) {
            return 'orange';
        }
        return 'dark-blue';
    }

    getItemColor(item) {
        if (item.hasOwnProperty('status')) {
            if (item.status === '0') {
                return 'orange';
            } else if (item.status === '1') {
                return 'green';
            }
        } else {
            return  'green';
        }
    }
}
