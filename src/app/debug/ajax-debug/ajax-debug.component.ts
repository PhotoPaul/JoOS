import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../../services/ajax.service';

@Component({
    selector: 'app-ajax-debug',
    templateUrl: 'ajax-debug.component.html'
})
export class AjaxDebugComponent {
    constructor(
        private router: Router,
        public ajax: AjaxService) {
    }

    getLatestRequest() {
        return this.ajax.latestRequestUrl;
    }

    open($event) {
        if ($event.ctrlKey) {
            window.open(this.ajax.latestRequestUrl);
        } else {
            this.router.navigate(['/cp/error']);
        }
    }
}
