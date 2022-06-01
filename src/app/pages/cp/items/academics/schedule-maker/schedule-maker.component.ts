import { Component, OnInit } from '@angular/core';

import { ScheduleMakerService } from './schedule-maker.service';

@Component({
  selector: 'app-schedule-maker',
  templateUrl: './schedule-maker.component.html'
})
export class ScheduleMakerComponent implements OnInit {
    constructor(public smService: ScheduleMakerService) { }

    ngOnInit() {
        this.smService.initScheduleMakerService();
    }

}
