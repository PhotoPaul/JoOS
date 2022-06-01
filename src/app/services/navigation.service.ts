import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { CPRoutes } from '../pages/cp/cp.routing';
import { RoleData } from '../pages/cp/items/system/users';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NavigationService {
    public sidebarCollapsed = false;
    public navItems: Routes;

    constructor(private auth: AuthenticationService) {
        this.navItems = CPRoutes[0].children;
        cleanseAndFilterByRole(this.navItems, auth.user.roles);

        function cleanseAndFilterByRole(array: Routes, roles: RoleData[]) {
            function hasAccess(allowedRoles: string[], currentRoles: RoleData[]) {
                const result = !currentRoles.every(role => {
                    return allowedRoles.indexOf(role.roleName) === -1 ? true : false;
                });

                return result;
            }

            for (let i = 0; i < array.length; i++) {
                if (array[i].children) {
                    cleanseAndFilterByRole(array[i].children, roles);
                }

                if (
                    array[i].path === '**' || (
                        array[i].hasOwnProperty('data') && (
                            array[i].data.hasOwnProperty('noNav') ||
                            !array[i].data.hasOwnProperty('roles') ||
                            !hasAccess(array[i].data.roles, roles)
                        )
                    )
                ) {
                    array.splice(+i, 1);
                    i--;
                }

            }
        }
    }
}
