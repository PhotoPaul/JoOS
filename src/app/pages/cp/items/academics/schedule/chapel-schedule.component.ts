import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../../services/authentication.service';
import { FinancesService } from '../../finances/finances.service';
import { ChapelScheduleItem } from '../academics';
import { AcademicsService } from '../academics.service';
import { ScheduleDay } from './schedule';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-chapel-schedule',
  templateUrl: './chapel-schedule.component.html'
})
export class ChapelScheduleComponent implements OnInit {
    chapelCategories;
    chapelScheduleFilter = {
        startOn: this.scheduleService.getRelevantStartingDate(),
        weekends: false,
        noWeeks: 2,
        years: []
    };
    completeChapelSchedule: ScheduleDay[];
    scheduleItemInputModel: ChapelScheduleItem;

    constructor(
        public scheduleService: ScheduleService,
        private academicsService: AcademicsService,
        private financesService: FinancesService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.fetchChapelSchedule()
            .then(() => {
            });
    }

    fetchChapelSchedule() {
        return new Promise((resolve) => {
            this.academicsService.getChapelSchedule(this.chapelScheduleFilter)
            .then((response: any) => {
                this.chapelCategories = response.categories;
                this.updateCompleteChapelSchedule(response.schedule);
                resolve();
            });
        });
    }

    updateCompleteChapelSchedule(chapelSchedule) {
        this.completeChapelSchedule = this.academicsService.generateEmptySchedule(
            this.chapelScheduleFilter.startOn,
            this.chapelScheduleFilter.noWeeks
        );
        this.completeChapelSchedule.forEach((chapelScheduleDay) => {
            for (let i = 0; i < chapelSchedule.length; i++) {
                chapelSchedule[i].tooltip = chapelSchedule[i].categoryDescription;
                chapelSchedule[i].label =
                    chapelSchedule[i].description ?
                    chapelSchedule[i].description :
                    chapelSchedule[i].categoryDescription;
                if (
                    this.financesService.getDateAsString(chapelScheduleDay.dateObj).substr(0, 10) ===
                    chapelSchedule[i].dateTime.substr(0, 10)
                ) {
                    chapelScheduleDay.items.push(chapelSchedule.splice(i, 1)[0]);
                    i--;
                }
            }
        });
    }

    editItemClicked($event) {
        $event.dateTime = new Date($event.dateTime);
        this.scheduleItemInputModel = $event;
    }

    deleteItemClicked($event) {
        this.academicsService.deleteChapelScheduleItem($event.id, this.chapelScheduleFilter)
        .then((response: any) => {
            this.updateCompleteChapelSchedule(response.schedule);
        });
    }

    newScheduleItemClicked($event) {
        this.scheduleItemInputModel = $event;
    }

    onScheduleItemInputSubmit(chapelScheduleItem: ChapelScheduleItem) {
        return new Promise((resolve) => {
            this.academicsService.saveChapelScheduleItem(chapelScheduleItem, this.chapelScheduleFilter)
                .then((response: any) => {
                    this.scheduleItemInputModel = undefined;
                    this.updateCompleteChapelSchedule(response.schedule);
                });
        });
    }

    fetchPreviousWeek() {
        this.chapelScheduleFilter.startOn.setDate(this.chapelScheduleFilter.startOn.getDate() - 7);
        this.fetchChapelSchedule();
    }

    fetchCurrentWeek() {
        this.chapelScheduleFilter.startOn = this.scheduleService.getRelevantStartingDate();
        this.fetchChapelSchedule();
    }

    fetchNextWeek() {
        this.chapelScheduleFilter.startOn.setDate(this.chapelScheduleFilter.startOn.getDate() + 7);
        this.fetchChapelSchedule();
    }
}
