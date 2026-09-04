import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AdmissionService } from '../admission.service';

@Component({
    selector: 'admissions-complete-general-registration',
    templateUrl: './complete-general-registration.component.html'
})
export class CompleteGeneralRegistrationComponent implements OnInit {
    @Input() application: any;
    applicationData: any;
    userId: number;
    applicationId = 24;

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
        public localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            if (!this.application) {
                this.admissionService.getUserApplicationData(this.userId, this.applicationId)
                    .then((appData: any) => {
                        this.applicationData = appData;
                    });
            } else {
                this.applicationData = this.application;
            }
        });
    }

    boolToString(value: any): string {
        if (value === null || value === undefined || value === '') {
            return '';
        }
        if (value === '1' || value === 1 || value === true) {
            return this.localization.s('yes');
        }
        if (value === '0' || value === 0 || value === false) {
            return this.localization.s('no');
        }
        return '';
    }

    needsCourseEnrollment(): boolean {
        if (!this.applicationData || !this.applicationData.application) {
            return false;
        }
        const app = this.applicationData.application;
        if (app.studyMode === 'greek') {
            if (app.greekTrack === 'online') {
                return true;
            }
            if (app.greekTrack === 'in-person' && (app.greekLoad === 'part-time' || app.greekLoad === 'auditor')) {
                return true;
            }
        }
        return false;
    }
}
