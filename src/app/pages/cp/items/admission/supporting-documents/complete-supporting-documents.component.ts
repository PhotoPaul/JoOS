import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { File } from '../../../../../services/files';
import { UserService } from '../../system/user.service';
import { AdmissionService } from '../admission.service';

@Component({
    selector: 'admissions-complete-supporting-documents',
    templateUrl: './complete-supporting-documents.component.html'
})
export class CompleteSupportingDocumentsComponent implements OnInit {
    @Input() student: boolean;
    applicationData: ApplicationData;
    userId: number;
    applicationId = 12;
    public files: File[];
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
        private localization: LocalizationService,
        public fs: FileSystemService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            this.admissionService.getUserApplicationData(this.userId, this.applicationId)
                .then((applicationData: ApplicationData) => {
                    this.applicationData = applicationData;
                });
        });
    }

    getFile(filename) {
        this.fs.getFile(filename);
    }

    updateProfilePicture(filename, $updateProfilePictureButton) {
        this.userService.updateProfilePicture(filename).then(() => {
            $updateProfilePictureButton.ajax.state = 'idle';
        });
    }
}
