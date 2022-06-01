import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FileSystemService } from '../../../../../services/file-system.service';
import { FinancesService } from '../../finances/finances.service';
import { UserService } from '../user.service';
import { UserData } from '../users';

@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.component.html',
    styles: [
        '.form-control-icon { padding-top: 12px }',
        '.form-control-label { padding-top: 8px }',
        '.img-circle { max-width: 75% }'
    ]
})
export class UserProfileComponent implements OnInit {
    @Input() userProfile: UserData | any;
    maxDate = new Date(new Date().getFullYear() - 16, 11, 31);

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private financesService: FinancesService,
        public fs: FileSystemService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (!this.userProfile) {
                this.userService.getUserData(id)
                    .then((userProfile: UserData) => {
                        this.userProfile = userProfile;
                    });
            }
        });
    }

    importUserDataFromApplication(id, $importButton) {
        this.userService.importUserDataFromApplication(id)
            .then((userProfile: UserData) => {
                this.userProfile = userProfile;
                $importButton.ajax.state = 'idle';
            });
    }

    updateDateModel($event: Date | any, form) {
        form.controls.address.markAsDirty();
        this.userProfile.birthDate = this.financesService.getDateAsString($event);
    }

    saveProfileChanges($saveButton, form) {
        this.userService.saveUserProfileData(this.userProfile)
            .then((userProfile: UserData) => {
                this.userProfile = userProfile;
                $saveButton.ajax.state = 'idle';
                form.reset(this.userProfile);
            });
    }
}
