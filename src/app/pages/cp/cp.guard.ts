import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class CPGuard implements CanActivate {

    constructor(private auth: AuthenticationService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.authenticated) {
            return true;
        }

        // Save current url and queryParams to be able to navigate there after Activation
        this.auth.redirectUrl = {
            url: state.url.split('?')[0],
            queryParams: state.root.queryParams
        };

        this.router.navigate(['/auth/login']);
        return false;
    }
}
