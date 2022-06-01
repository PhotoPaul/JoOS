import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentFolderData } from '../../system/users';
import { CompleteApplication } from '../admission';
import { AdmissionService } from '../admission.service';

@Component({
    selector: 'application-folder',
    templateUrl: './application-folder.component.html'
})
export class ApplicationFolderComponent implements OnInit {
    @Input() studentFolder: StudentFolderData | any;

    constructor(private route: ActivatedRoute, private admissionService: AdmissionService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (!this.studentFolder) {
                this.admissionService.getAdmissionsCompleteApplication(id)
                    .then((studentFolder: CompleteApplication | any) => {
                        this.studentFolder = studentFolder.hasOwnProperty('applicationFormModel') ? studentFolder : 'noApplication';
                    });
            }
        });
    }
}
