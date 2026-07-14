import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../../../../environments/environment';
import { LocalizationService } from '../../../../../../localization/localization.service';
import { AdmissionService } from '../../admission.service';

@Component({
    selector: 'admissions-complete-general-references',
    templateUrl: './complete-general-references.component.html'
})
export class CompleteGeneralReferencesComponent implements OnInit {
    appURI = environment.appURI;
    userId: number;
    applicationId = 5; // Default to 5, resolved dynamically below
    applicationData: any;
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
        public localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            
            // Resolve applicationId dynamically (either 5 or 11 depending on candidate's program)
            this.admissionService.getApplicantsData({ programId: '0' }, this.userId)
                .then((res: any) => {
                    const applicant = res && res.applicantsData && res.applicantsData[0];
                    if (applicant && applicant.applications) {
                        const app = applicant.applications.find(a => +a.applicationId === 5 || +a.applicationId === 11);
                        if (app) {
                            this.applicationId = +app.applicationId;
                        }
                    }
                    
                    // Fetch the references data using resolved applicationId
                    this.admissionService.getUserApplicationData(this.userId, this.applicationId)
                        .then((applicationData: any) => {
                            if (applicationData && applicationData.application) {
                                if (applicationData.application[0]) {
                                    applicationData.application[0].documentUrl = applicationData.application[0].documentUrl ? this.ds.bypassSecurityTrustResourceUrl(applicationData.application[0].documentUrl) as string : undefined;
                                }
                                if (applicationData.application[1]) {
                                    applicationData.application[1].documentUrl = applicationData.application[1].documentUrl ? this.ds.bypassSecurityTrustResourceUrl(applicationData.application[1].documentUrl) as string : undefined;
                                }
                            }
                            this.applicationData = applicationData;
                        });
                });
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
