import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AjaxResponse, AjaxService } from '../../services/ajax.service';

@Component({
    templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    authenticationToken: string;
    authenticated: boolean;
    ajaxPending = false;
    submitted = false;
    emailNotFound = false;
    user: User;
    model = {
        email: '',
        newPassword: '',
        newPasswordConfirmation: ''
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ajax: AjaxService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route.queryParams.forEach(async (queryParams: Params) => {
            if (queryParams['token']) {
                localStorage.removeItem('authenticationToken');
                this.authenticationToken = queryParams['token'];
                const response = (await this.ajax.get('authenticateToken', this.authenticationToken)) as AjaxResponse;
                if (response.success) {
                    if (localStorage.getItem('language') !== response.data.language) {
                        localStorage.setItem('language', response.data.language);
                        this.ajax.authenticationToken = this.authenticationToken;
                        this.authenticated = true;
                        this.user = response.data as User;
                        localStorage.setItem('authenticationToken', this.ajax.authenticationToken);
                        this.router.navigate(['/refresh', this.router.url]);
                    } else {
                        this.ajax.authenticationToken = this.authenticationToken;
                        this.authenticated = true;
                        this.user = response.data as User;
                        localStorage.setItem('authenticationToken', this.ajax.authenticationToken);
                    }
                } else {
                    this.router.navigate(['/auth/login']);
                }
            } else {
                if (this.ajax.authenticationToken) {
                    this.authenticated = true;
                } else {
                    this.authenticated = false;
                }
            }
        });
    }

    validateForm() {
        if (this.model.newPassword !== '' && this.model.newPassword === this.model.newPasswordConfirmation) {
            return true;
        } else {
            return false;
        }
    }

    onStep1Submit() {
        this.ajaxPending = true;
        // This line is to prevent a change detection error when enter key is used to submit the form instead of mouse click
        this.changeDetectorRef.detectChanges();
        this.ajax.get('resetUserPasswordInit', { email: this.model.email })
            .then((response: any) => {
                if (response.data) {
                    this.submitted = true;
                } else {
                    this.ajaxPending = false;
                    this.emailNotFound = true;
                }
            });
    }

    onStep2Submit() {
        if (this.validateForm()) {
            this.ajaxPending = true;
        }
        this.ajax.get('resetUserPassword', { newPassword: this.model.newPassword, authenticationToken: this.authenticationToken })
            .then(() => {
                this.router.navigate(['/cp']);
            });
    }
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}
