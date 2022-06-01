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
