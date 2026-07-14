import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { CompleteApplication } from '../admission';
import { AdmissionService } from '../admission.service';

@Component({
    selector: 'admissions-complete-general',
    templateUrl: './complete-general-application.component.html'
})
export class CompleteGeneralApplicationComponent implements OnInit {
    @Input() application: CompleteApplication | any;
    applicationData: any;
    referencesData: any;
    documentsList: any[] = [];
    userId: number;
    applicationId = 23;
    underage = false;

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
        public localization: LocalizationService,
        public fs: FileSystemService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            
            Promise.all([
                this.admissionService.getUserApplicationData(this.userId, 23).catch(() => null), // General Application
                this.admissionService.getUserApplicationData(this.userId, 5).catch(() => null),  // References
                this.admissionService.getUserApplicationData(this.userId, 12).catch(() => null) // Supporting Documents
            ]).then(([general, references, documents]: any[]) => {
                this.applicationData = general;
                this.referencesData = references;
                if (documents && documents.application) {
                    this.documentsList = documents.application;
                }

                if (this.applicationData && this.applicationData.application) {
                    this.updateUnderage(this.applicationData.application.birthDate);
                }
            });
        });
    }

    updateUnderage(birthDate) {
        if (!birthDate) return;
        this.underage = ~~((Date.now() - new Date(birthDate).getTime()) / (31557600000)) < 18;
    }

    getLanguageLevelKey(value: string | number): string {
        const mapping = {
            '0': 'levelNone',
            '1': 'levelModerate',
            '2': 'levelGood',
            '3': 'levelVeryGood',
            '4': 'levelExcellent',
            '5': 'levelNativeSpeaker'
        };
        return mapping[String(value)] || '';
    }

    getDepositKey(value: string | number): string {
        const mapping = {
            '31': 'depositCard',
            '30': 'depositWire'
        };
        return mapping[String(value)] || '';
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

    getDecisionColor(referenceId) {
        if (typeof referenceId === 'undefined' || referenceId === null) {
            return 'blue';
        } else if (referenceId === '0') {
            return 'red';
        } else {
            return 'green';
        }
    }

    hasDocument(documentTypeId: number): boolean {
        return this.documentsList.some(doc => doc.documentTypeId == documentTypeId);
    }

    getDocumentName(documentTypeId: number): string {
        const doc = this.documentsList.find(doc => doc.documentTypeId == documentTypeId);
        return doc ? doc.filename : '';
    }

    getDocuments(documentTypeId: number): any[] {
        return this.documentsList.filter(doc => doc.documentTypeId == documentTypeId);
    }
}
