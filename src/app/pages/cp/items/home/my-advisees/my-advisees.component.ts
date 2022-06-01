import { Component, OnInit } from '@angular/core';

import { AdviseesData } from '../../academics/academics';
import { AcademicsService } from '../../academics/academics.service';

@Component({
    selector: 'my-advisees',
    templateUrl: 'my-advisees.component.html'
})
export class MyAdviseesComponent implements OnInit {
    professorHomeData: any;
    myAdvisees: any;

    constructor(
        private academicsService: AcademicsService
    ) { }

    ngOnInit() {
        this.academicsService.getAdviseesData()
            .then((adviseesData: AdviseesData) => {
                this.myAdvisees = adviseesData.myAdvisees;
            });
    }
}
