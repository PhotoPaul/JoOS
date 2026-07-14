import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../application.service';

@Component({
    templateUrl: './general-references.component.html'
})
export class GeneralReferencesComponent implements OnInit {
    userId: number;
    applicationId = 5;
    referencesData: any;
    formLoading = true;
    validate = false;

    constructor(
        private route: ActivatedRoute,
        public applicationService: ApplicationService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            
            this.applicationService.getUserApplicationData(this.userId, this.applicationId)
                .then((referencesData: any) => {
                    this.referencesData = referencesData;
                    this.formLoading = false;
                });
        });
    }

    onSave() {
        this.formLoading = true;
        this.applicationService.saveUserApplicationData(this.userId, this.applicationId, this.referencesData)
            .then(() => {
                this.formLoading = false;
                this.applicationService.returnToList(this.userId);
            });
    }
}
