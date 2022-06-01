import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleService {

    constructor() { }

    getRelevantStartingDate(date?) { // Reset time to midnight
        if (!date) {
            date = new Date();
            date.setHours(0, 0, 0, 0);
        }
        if (date.getDay() === 0) {
            date.setDate(date.getDate() + 1);
        } else if (date.getDay() === 2) {
            date.setDate(date.getDate() - 1);
        } else if (date.getDay() === 3) {
            date.setDate(date.getDate() - 2);
        } else if (date.getDay() === 4) {
            date.setDate(date.getDate() - 3);
        } else if (date.getDay() === 5) {
            date.setDate(date.getDate() - 4);
        } else if (date.getDay() === 6) {
            date.setDate(date.getDate() - 5);
        } else if (date.getDay() === 7) {
            date.setDate(date.getDate() + 2);
        }
        return date;
    }

    isWeekday(completeScheduleDay) {
        return completeScheduleDay.dateObj.getDay() !== 0 && completeScheduleDay.dateObj.getDay() !== 6;
    }

    getRelationToToday(_date) {
        const date = new Date(_date.getTime());
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        if (today.getTime() < date.getTime()) {
            return 1;
        } else if (today.getTime() > date.getTime()) {
            return -1;
        } else {
            return 0;
        }
    }
}
