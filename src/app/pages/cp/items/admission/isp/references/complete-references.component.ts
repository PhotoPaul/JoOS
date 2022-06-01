import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../../../../environments/environment';
import { LocalizationService } from '../../../../../../localization/localization.service';
import { CompleteApplication } from '../../admission';
import { AdmissionService } from '../../admission.service';

@Component({
    templateUrl: './complete-references.component.html'
})
export class CompleteISPReferencesComponent implements OnInit {
    appURI = environment.appURI;
    @Input() application: CompleteApplication | any;
    applicationData: ApplicationData;
    userId: number;
    applicationId = 11;
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
        private ds: DomSanitizer,
        public admissionService: AdmissionService,
        private localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            if (!this.application) {
                this.admissionService.getUserApplicationData(this.userId, this.applicationId)
                    .then((applicationData: ApplicationData) => {
                    applicationData.application[0].documentUrl = applicationData.application[0].documentUrl ? this.ds.bypassSecurityTrustResourceUrl(applicationData.application[0].documentUrl) as string : undefined;
                    applicationData.application[1].documentUrl = applicationData.application[1].documentUrl ? this.ds.bypassSecurityTrustResourceUrl(applicationData.application[1].documentUrl) as string : undefined;
                    this.applicationData = applicationData;
                    });
                }
            });
    }

    decideForReference(priority, decision) {
        this.admissionService.decideForReference(this.userId, priority, decision)
            .then((response: any) => {
                if (response.referenceId) {
                    this.applicationData.application[priority].referenceId = response.referenceId;
                } else {
                    this.applicationData.application[priority] = { priority: priority };
                }
            });
    }

    deleteConfidentialLetterOfRecommendation(filename, priority) {
        this.admissionService.deleteDocument(filename)
            .then((response) => {
                if (response) {
                    delete this.applicationData.application[priority].documentUrl;
                }
            });
    }

    encodeURIComponent(text: string) {
        return encodeURIComponent(text);
    }

    getDecisionColor(referenceId) {
        if (typeof referenceId === 'undefined' || referenceId === null) {
            return 'blue';
        } else if (referenceId === '0') {
            return 'red';
        } else {
            return 'green';
        }
    }
}
