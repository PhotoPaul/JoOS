import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxResponse } from '../../services/ajax.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    submitted = false;
    loginFailedWrongPassword = false;
    loginFailedWrongEmail = false;
    model: LoginDetails = new LoginDetails;

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    async onSubmit() {
        this.submitted = true;
        const response = (await this.authenticationService.authenticateLogin(this.model)) as AjaxResponse;
        if (response.success) {
            if (this.authenticationService.redirectUrl) {
                // This fires only if a user logs in right after logging out on a path
                this.router.navigate([this.authenticationService.redirectUrl.url], { queryParams: this.authenticationService.redirectUrl.queryParams });
            } else {
                this.router.navigate(['/cp']);
            }
        } else {
            this.loginFailedWrongPassword = false;
            this.loginFailedWrongEmail = false;
            this.submitted = false;
            if (response.data === -1) {
                this.loginFailedWrongPassword = true;
            } else if (response.data === 0) {
                this.loginFailedWrongEmail = true;
            }
        }
    }
}

export class LoginDetails {
    constructor(
        public email?: string,
        public password?: string,
        public authenticationToken?: string
    ) { }
}
