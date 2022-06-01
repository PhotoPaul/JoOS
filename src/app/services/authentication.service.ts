import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { environment } from '../../environments/environment';
import { LoginDetails } from '../pages/auth/login.component';
import { RoleData } from '../pages/cp/items/system/users';
import { AjaxResponse, AjaxService } from './ajax.service';

@Injectable()
export class AuthenticationService {
    private version = environment.version;
    public authenticated = false;
    public user = { language: 'en'} as User;
    redirectUrl: {
        url?: string,
        queryParams?: Params | null
    };

    constructor(private ajax: AjaxService) { }

    async checkVersion(response) {
        if (response.success && response.data.version !== this.version) {
            const swRegistration = await navigator.serviceWorker.getRegistration();
            if (swRegistration) {
                await swRegistration.unregister();
                window.location.reload(true);
            } else {
                window.location.reload(true);
            }
        }
    }

    authenticateToken(authenticationToken: string) {
        return new Promise(resolve => {
            this.ajax.get(['getVersion', 'authenticateToken'], authenticationToken)
                .then((response: AjaxResponse[]) => {
                    this.checkVersion(response[0]);
                    if (response[1].success) {
                        this.ajax.authenticationToken = authenticationToken;
                        this.authenticated = true;
                        this.user = response[1].data as User;
                        localStorage.setItem('authenticationToken', this.ajax.authenticationToken);
                        localStorage.setItem('language', this.user.language);
                    }
                    resolve(this.authenticated);
                });
        });
    }

    authenticateLogin(loginDetails: LoginDetails) {
        return new Promise(resolve => {
            this.ajax.get(['getVersion', 'visitorLogin'], loginDetails)
                .then((response: AjaxResponse) => {
                    this.checkVersion(response[0]);
                    if (response[1].success) {
                        this.ajax.authenticationToken = response[1].data.authenticationToken;
                        this.authenticated = true;
                        this.user = response[1].data as User;
                        localStorage.setItem('authenticationToken', this.ajax.authenticationToken);
                        localStorage.setItem('language', this.user.language);
                    }
                    resolve(response[1]);
                });
        });
    }

    hasAccess(allowedRoles) {
        if (!Array.isArray(allowedRoles)) {
            allowedRoles = [allowedRoles];
        }
        for (let allowedRole of allowedRoles) {
            for (const userRole of this.user.roles) {
                if (!allowedRole['roleName']) {
                    allowedRole = { 'roleName': allowedRole };
                }
                if (
                    userRole.roleName === allowedRole.roleName &&
                    (userRole.forProgramId === allowedRole.forProgramId ||
                    allowedRole.forProgramId === undefined ||
                    userRole.forProgramId === undefined)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    getRoleRecordIfExists(roles, roleNeedle) {
        for (const roleHaystack of roles) {
            if (
                roleHaystack.roleId === roleNeedle.roleId &&
                (
                    (roleHaystack.forProgramId !== undefined &&
                    roleNeedle.forProgramId !== undefined) ?
                        roleHaystack.forProgramId === roleNeedle.forProgramId :
                        true
                )
            ) {
                return roleHaystack;
            }
        }
        return {};
    }

    logout() {
        document.cookie = 'PHPSESSID=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('authenticationToken');
        window.location.reload(true);
    }
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleData [];
    language: string;
    photoURI: string;
}
