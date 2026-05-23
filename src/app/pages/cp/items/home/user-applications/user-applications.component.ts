import { Component, Input, OnInit } from '@angular/core';

import { LocalizationService } from '../../../../../localization/localization.service';
import { ModalService } from '../../../../../ui/modal/modal.service';
import { ApplicationService } from '../../application/application.service';

@Component({
    selector: 'user-applications',
    templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
    @Input() applications: any [];
    @Input() programs: any [];

    constructor(
        private modal: ModalService,
        private applicationService: ApplicationService,
        public localization: LocalizationService
    ) { }

    ngOnInit() {
        if (this.programs) {
            this.modal.show({
                type: 'ok',
                title: 'welcomeTitle',
                message: 'welcomeMessage'
            });
        }
    }

    get processedApplications(): any[] {
        if (!this.applications) {
            return [];
        }
        
        // Find if there are any Greek application forms (IDs 1 to 6)
        const greekForms = this.applications.filter(app => 
            [1, 2, 3, 4, 5, 6].indexOf(+app.applicationId) !== -1
        );

        if (greekForms.length === 0) {
            return this.applications;
        }

        // Filter out the individual Greek forms
        const nonGreekForms = this.applications.filter(app => 
            [1, 2, 3, 4, 5, 6].indexOf(+app.applicationId) === -1
        );

        // Determine the consolidated status of the General Application
        // Logic:
        // - If any form is pending ('0'), the overall status is pending ('0').
        // - Else if any form is rejected ('3'), the overall status is rejected ('3').
        // - Else if any form is under review ('2'), the overall status is under review ('2').
        // - Else if all forms are completed ('1'), the overall status is completed ('1').
        let consolidatedStatus = '1';
        if (greekForms.some(app => !app.applicationStatus || app.applicationStatus === '0')) {
            consolidatedStatus = '0';
        } else if (greekForms.some(app => app.applicationStatus === '3')) {
            consolidatedStatus = '3';
        } else if (greekForms.some(app => app.applicationStatus === '2')) {
            consolidatedStatus = '2';
        }

        // Create the consolidated General Application object
        const generalApp = {
            applicationId: '23',
            applicationStatus: consolidatedStatus,
            editPath: '/cp/application/general-application',
            viewPath: '/cp/application/general-application',
            icon: 'fa-file-alt',
            heading_gr: 'Γενική Αίτηση / General Application',
            heading_en: 'General Application'
        };

        return [generalApp, ...nonGreekForms];
    }

    startApplication(programId, asAuditor?) {
        this.applicationService.setProgramForApplicant(programId, asAuditor)
            .then((applications: any []) => {
                this.programs = [];
                this.applications = applications;
            });
    }

    getStatusText(value): string {
        if (typeof value === 'undefined' || value === '0') {
            return this.localization.s('pending');
        } else if (value === '1') {
            return this.localization.s('completed');
        } else if (value === '2') {
            return this.localization.s('underReview');
        } else { // (value === '3')
            return this.localization.s('rejected');
        }
    }

    getStatusColor(value): string {
        if (typeof value === 'undefined' || value === '0') {
            return 'blue';
        } else if (value === '1') {
            return 'green';
        } else if (value === '2') {
            return 'orange';
        } else { // (value === '3')
            return 'red';
        }
    }

    getStatusIconPath(value, editPath, viewPath, id) {
        if (value === '1') {
            if (id === '5' || id === '11' || id === '12') {
                return '';
            } else if (id === '23') {
                return viewPath;
            } else {
                return viewPath + '/0';
            }
        } else {
            return editPath;
        }
    }

    getStatusFooterLink(value, editPath, viewPath, id): Object[] {
        if (typeof value === 'undefined' || value === '0') {
            return [{
                text: this.localization.s('enterInfo'),
                path: editPath
            }];
        } else if (value === '1') {
            if (id === '5' || id === '11' || id === '12') {
                return [{
                    text: this.localization.s('noActionNeeded'),
                    path: ''
                }]
            } else if (id === '23') {
                return [{
                    text: this.localization.s('viewInformation'),
                    path: viewPath
                }];
            } else {
                return [{
                    text: this.localization.s('viewInformation'),
                    path: viewPath + '/0'
                }];
            }
        } else {
            return [{
                text: this.localization.s('editInfo'),
                path: editPath
            }];
        }
    }
}
