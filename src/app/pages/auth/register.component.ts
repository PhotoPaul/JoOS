import { Component } from '@angular/core';

import { CandidateRegistrationFormModel } from './registration';
import { RegistrationService } from './registration.service';

@Component({
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    model: CandidateRegistrationFormModel = {} as CandidateRegistrationFormModel;
    ajaxPending = false;
    submitted = -1;

    constructor(private registrationService: RegistrationService) { }

    onSubmit() {
        this.ajaxPending = true;
        if (this.model.recaptchaToken) {
            this.model.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'gr';
            this.registrationService.registerCandidate(this.model)
                .then((data) => {
                    // Registration Failed due to:
                    if (data === null) {
                        // Failed: Douplicate Account
                        this.submitted = 0;
                    } else if (data === -1) {
                        // Failed: reCAPTCHA Token is not valid
                        this.submitted = -1;
                    } else {
                        // Success: User created
                        this.submitted = 1;
                    }
                });
        }
    }

    handleCorrectCaptcha(token) {
        this.model.recaptchaToken = token;
    }

    recaptchaTokenExpired() {
        this.model.recaptchaToken = null;
    }
}
