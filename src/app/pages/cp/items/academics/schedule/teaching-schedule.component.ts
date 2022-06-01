import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../../../../services/authentication.service';
import { FinancesService } from '../../finances/finances.service';
import { Program, TeachingScheduleDay, TeachingScheduleItem } from '../academics';
import { AcademicsService } from '../academics.service';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'teaching-schedule',
    templateUrl: './teaching-schedule.component.html'
})
export class TeachingScheduleComponent implements OnInit {
    teachingScheduleFilter = {
        startOn: this.scheduleService.getRelevantStartingDate(),
        canCustomize: this.auth.hasAccess(['admin', 'registrar', 'cashier', 'professor']),
        myCoursesOnly: this.auth.hasAccess(['professor', 'student']),
        weekends: false,
        programId: 1,
        noWeeks: 2,
        years: []
    };
    completeTeachingSchedule: TeachingScheduleDay[];
    programs: Program[];
    scheduleItemInputModel: TeachingScheduleItem;

    constructor(
        public scheduleService: ScheduleService,
        private academicsService: AcademicsService,
        private financesService: FinancesService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.fetchTeachingSchedule()
            .then(() => {
                if (this.programs.length) {
                    for (let i = 0; i < this.programs[0].number_of_semesters; i += 2) {
                        this.teachingScheduleFilter.years.push(true);
                    }
                }
            });
    }

    fetchTeachingSchedule() {
        return new Promise((resolve) => {
            this.academicsService.getTeachingSchedule(this.teachingScheduleFilter)
                .then((response: {
                    programs: Program[],
                    scheduleItems: TeachingScheduleItem[]
                }) => {
                    this.programs = response.programs;
                    this.updateCompleteTeachingSchedule(response.scheduleItems);
                    resolve();
                });
        });
    }

    updateCompleteTeachingSchedule(teachingSchedule: TeachingScheduleItem[]) {
        this.completeTeachingSchedule = this.generateCompleteTeachingSchedule(
            this.teachingScheduleFilter.startOn,
            this.teachingScheduleFilter.noWeeks
        );
        this.completeTeachingSchedule.forEach((teachingScheduleDay) => {
            for (let i = 0; i < teachingSchedule.length; i++) {
                if (
                    this.financesService.getDateAsString(teachingScheduleDay.dateObj).substr(0, 10) ===
                    teachingSchedule[i].dateTime.substr(0, 10)
                ) {
                    teachingScheduleDay.items.push(teachingSchedule.splice(i, 1)[0]);
                    i--;
                }
            }
        });
    }

    fetchPreviousWeek() {
        this.teachingScheduleFilter.startOn.setDate(this.teachingScheduleFilter.startOn.getDate() - 7);
        this.fetchTeachingSchedule();
    }

    fetchCurrentWeek() {
        this.teachingScheduleFilter.startOn = this.scheduleService.getRelevantStartingDate();
        this.fetchTeachingSchedule();
    }

    fetchNextWeek() {
        this.teachingScheduleFilter.startOn.setDate(this.teachingScheduleFilter.startOn.getDate() + 7);
        this.fetchTeachingSchedule();
    }

    editItemClicked($event) {
        $event.dateTime = new Date($event.dateTime);
        this.scheduleItemInputModel = $event;
    }

    newScheduleItemClicked($event) {
        this.scheduleItemInputModel = $event;
    }

    deleteItemClicked($event) {
        this.academicsService.deleteTeachingScheduleItem($event.id, this.teachingScheduleFilter)
            .then((response: any) => {
                this.updateCompleteTeachingSchedule(response.scheduleItems);
            });
    }

    onScheduleItemInputSaved($event) {
        this.academicsService.saveTeachingScheduleItem($event, this.teachingScheduleFilter)
            .then((response: any) => {
                this.updateCompleteTeachingSchedule(response.scheduleItems);
            });
    }

    onScheduleItemInputSubmit(teachingScheduleItem: TeachingScheduleItem) {
        this.academicsService.saveTeachingScheduleItem(teachingScheduleItem, this.teachingScheduleFilter)
            .then((response: any) => {
                this.updateCompleteTeachingSchedule(response.scheduleItems);
            });
    }

    generateCompleteTeachingSchedule(_startingDate, noWeeks) {
        const startingDate = new Date(_startingDate.getTime());
        const completeTeachingSchedule = [];
        for (let i = 0; i < 7 * noWeeks; i++) {
            completeTeachingSchedule.push({
                dateObj: new Date(startingDate.getTime()),
                items: []
            });
            startingDate.setDate(startingDate.getDate() + 1);
        }
        return completeTeachingSchedule;
    }

    getProgramIndexByProgramId(id) {
        for (let i = 0; i < this.programs.length; i++) {
            if (+this.programs[i].id === +id) {
                return i;
            }
        }
    }
}
