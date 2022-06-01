import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FinancesService } from '../../../finances/finances.service';
import { ApplicationService } from '../../application.service';

declare let $;

@Component({
    templateUrl: './personal.component.html'
})
export class PersonalComponent implements OnInit {
    userId;
    applicationId = 1;
    applicationData: ApplicationData;
    formLoading = true;
    validate = false;
    maxDate: Date = new Date(new Date().getFullYear() - 16, 11, 31);
    underage = false;
    modelChanged = false;

    constructor(private route: ActivatedRoute, public applicationService: ApplicationService, private financesService: FinancesService, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            this.applicationService.getUserApplicationData(this.userId, this.applicationId)
            .then((applicationData: ApplicationData) => {
                if (applicationData) {
                    this.applicationData = applicationData;
                }
                this.updateUnderage(this.applicationData.application.birthDate);
                this.formLoading = false;
            });
        });
    }

    updateDateModel($event: Date | any) {
        this.applicationData.application.birthDate = this.financesService.getDateAsString($event);
        this.modelChanged = true;
        this.updateUnderage($event);
    }

    updateUnderage(birthDate) {
        this.underage = ~~((Date.now() - new Date(birthDate).getTime()) / (31557600000)) < 18;
        if (!this.underage) {
            this.applicationData.application.guardianFirstName = null;
            this.applicationData.application.guardianLastName = null;
            this.applicationData.application.guardianOccupation = null;
            this.applicationData.application.guardianEmail = null;
            this.applicationData.application.guardianPhone = null;
            this.applicationData.application.guardianAddressSame = null;
            this.applicationData.application.guardianAddress = null;
            this.applicationData.application.guardianCity = null;
            this.applicationData.application.guardianCountry = null;
            this.applicationData.application.guardianOpinion = null;
        }
    }

    idInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.greekCitizen === '1') {
            this.applicationData.application.citizenship = null;
            this.applicationData.application.euCitizen = null;
            this.applicationData.application.passportNumber = null;
            this.applicationData.application.residencePermit = null;
        } else {
            this.applicationData.application.greekIdNumber = null;
            if (this.applicationData.application.euCitizen === '1') {
                this.applicationData.application.residencePermit = null;
            }
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#idInfo').collapse('hide');
                $('#familyInfo').collapse('show');
                this.formLoading = false;
            });
    }

    familyInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.familyStatus !== 'familyMarried') {
            this.applicationData.application.familySpouseFirstName = null;
            this.applicationData.application.familySpouseLastName = null;
        }
        if (this.applicationData.application.familyKids === '0') {
            this.applicationData.application.familyKidsNamesAges = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#familyInfo').collapse('hide');
                $('#addressInfo').collapse('show');
                this.formLoading = false;
            });
    }

    addressInfoOnSubmit() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#addressInfo').collapse('hide');
                $('#guardianInfo').collapse('show');
                this.formLoading = false;
            });
    }

    guardianInfoOnSubmit() {
        this.formLoading = true;
        if (this.applicationData.application.guardianAddressSame) {
            this.applicationData.application.guardianAddress = null;
            this.applicationData.application.guardianCity = null;
            this.applicationData.application.guardianZipCode = null;
            this.applicationData.application.guardianCountry = null;
        }

        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.applicationData)
            .then(() => {
                this.modelChanged = false;
                $('#guardianInfo').collapse('hide');
                this.formLoading = false;
            });
    }

    checkForm() {
        this.validate = true;
        $('#idInfo').collapse('show');
        $('#familyInfo').collapse('show');
        $('#addressInfo').collapse('show');
        $('#guardianInfo').collapse('show');
    }

    unsavedChanges() {
        return this.modelChanged;
    }

    submitForm() {
        this.formLoading = true;
        this.applicationService.submitUserApplication(this.userId, this.applicationId)
        .then(() => {
            this.router.navigate(['/cp']);
        });
    }
}
