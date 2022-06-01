import { Component } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { FileSystemService } from '../../services/file-system.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-cp-sidebar',
    templateUrl: 'sidebar.component.html',
    styles: [`.img-circle {
                display: inline !important;
                margin-left: 0 !important;
                min-width: 100px;
                max-width: 150px;
                max-height: 200px;
            }`]
})
export class SidebarComponent {
    constructor(
        public auth: AuthenticationService,
        public fs: FileSystemService,
        public nav: NavigationService
    ) { }
}
