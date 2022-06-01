import { Component, Renderer, ViewChild } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { NavigationService } from '../../services/navigation.service';

declare let $;

@Component({
    selector: 'app-cp-topbar',
    templateUrl: 'topbar.component.html'
})
export class TopbarComponent {
    @ViewChild('notifications') notifications;

    constructor(
        public auth: AuthenticationService,
        private nav: NavigationService,
        private renderer: Renderer
    ) { }

    toggleSidebarVisible() {
        if (this.nav.sidebarCollapsed) {
            $('#page-wrapper').css('margin', '50px 0 0 225px');
        } else {
            $('#page-wrapper').css('margin', '50px 0 0 0');
        }
        this.nav.sidebarCollapsed = !this.nav.sidebarCollapsed;
    }
}
