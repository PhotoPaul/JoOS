import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../../localization/localization.service';
import { CompleteApplication } from '../../admission';
import { AdmissionService } from '../../admission.service';

@Component({
    selector: 'admissions-complete-financial',
    templateUrl: './complete-financial.component.html'
})
export class CompleteFinancialComponent implements OnInit {
    @Input() application: CompleteApplication | any;
    applicationData: ApplicationData;
    userId: number;
    applicationId = 6;
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

    getPackage(pachage) {
        if (pachage === '1') {
            return 'Τακτικός, Οικότροφος';
        } else if (pachage === '2') {
            return 'Τακτικός, μη-Οικότροφος';
        } else if (pachage === '3') {
            return 'μη-Τακτικός';
        }
    }
}
