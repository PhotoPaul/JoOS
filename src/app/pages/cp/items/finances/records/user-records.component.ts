import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { RecordInputModel } from '../finances';
import { FinancesService } from '../finances.service';
import { RecordInputComponent } from './record-input.component';

@Component({
    templateUrl: 'user-records.component.html'
})
export class UserRecordsComponent implements OnInit {
    @ViewChild(RecordInputComponent)
    private recordInput: RecordInputComponent;
    public userId: number;
    public isStudent = this.authenticationService.user.roles.some(role => role.roleName === 'student');

    constructor(
        private route: ActivatedRoute,
        public financesService: FinancesService,
        private authenticationService: AuthenticationService,
        private localization: LocalizationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            this.financesService.getUserRecordsData(this.userId);
        });
    }

    editRecord(id) {
        for (const i in this.financesService.userRecordsData.records) {
            if (this.financesService.userRecordsData.records[i].id === id) {
                const recordInputModel: RecordInputModel = {
                    visible: true,
                    title: this.localization.s('editRecord'),
                    record: this.financesService.userRecordsData.records[i]
                };
                this.recordInput.recordInputUpdateModel(recordInputModel);
                break;
            }
        }
    }

    getStatusClass(amount) {
        if (+amount <= 0) {
            return 'status-completed';
        } else {
            return 'status-missing';
        }
    }

    getSignClass(amount) {
        if (+amount > 0) {
            return 'text-danger';
        } else if (+amount < 0) {
            return 'text-success';
        }
    }
}
