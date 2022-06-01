import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }

    async canActivate() {
        const authenticationToken = localStorage.getItem('authenticationToken');
        if (authenticationToken) {
            const response = await this.authenticationService.authenticateToken(authenticationToken);
            if (response) {
                if (this.authenticationService.redirectUrl) {
                    this.router.navigate([this.authenticationService.redirectUrl.url], { queryParams: this.authenticationService.redirectUrl.queryParams });
                } else {
                    this.router.navigate(['/cp']);
                }
            } else {
                localStorage.removeItem('authenticationToken');
                this.router.navigate(['/auth/login']);
            }
            return false;
        }
        return true;
    }
}
