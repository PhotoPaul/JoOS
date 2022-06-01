import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../../localization/localization.service';
import { CompleteApplication } from '../../admission';
import { AdmissionService } from '../../admission.service';

@Component({
    selector: 'admissions-complete-education',
    templateUrl: './complete-education.component.html'
})
export class CompleteEducationComponent implements OnInit {
    @Input() application: CompleteApplication | any;
    applicationData: ApplicationData;
    userId: number;
    applicationId = 2;
    decisionButtons = [{
        color: 'btn-green',
        icon: 'fa-thumbs-up',
        caption: this.localization.s('accept'),
        tooltip: this.localization.s('acceptApplication'),
        hidden: false,
        ajax: { state: 'idle' },
        onClick: (event, actionButtonClicked, actionButtons) => {
            this.admissionService.decideForUserApplication(this.userId, this.applicationId, 1)
            .then(() => {
                this.router.navigate(['cp/admission/applications', this.userId]);
            });
        }
    }, {
        color: 'btn-red',
        icon: 'fa-thumbs-down',
        caption: this.localization.s('reject'),
        tooltip: this.localization.s('rejectApplication'),
        hidden: false,
        ajax: { state: 'idle' },
        onClick: (event, actionButtonClicked, actionButtons) => {
            this.admissionService.decideForUserApplication(this.userId, this.applicationId, 3)
            .then(() => {
                this.router.navigate(['cp/admission/applications', this.userId]);
            });
        }
    }];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public admissionService: AdmissionService,
        private localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            if (!this.application) {
                this.admissionService.getUserApplicationData(this.userId, this.applicationId)
                    .then((application: ApplicationData) => {
                        this.applicationData = application;
                    });
            }
        });
    }

    getLevel(level) {
        if (level === '1') {
            return this.localization.s('levelModerate') + ' (1/4)';
        } else if (level === '2') {
            return this.localization.s('levelGood') + ' (2/4)';
        } else if (level === '3') {
            return this.localization.s('levelVeryGood') + ' (3/4)';
        } else if (level === '4') {
            return this.localization.s('levelExcellent') + ' (4/4)';
        }
    }
}
