import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Program } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    selector: 'app-academics-program-list',
    templateUrl: 'program-list.component.html'
})
export class ProgramListComponent implements OnInit {
    programs: Program[] = [];

    constructor(private router: Router, private programsService: AcademicsService) { }

    ngOnInit() {
        this.programsService.getProgramsData()
            .then((programs: Program[]) => {
                this.programs = programs;
            });
    }

    enrollmentClicked(id) {
        this.router.navigate(['/cp/academics/programs/enrollment', id]);
    }

    coursesClicked(id) {
        this.router.navigate(['/cp/academics/programs/courses', id]);
    }
}
