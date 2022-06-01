import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  template: ''
})
export class RefreshComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // Get url and queryParams from params
            const path = params['path'].split('?');
            const url = path[0];
            const queryParams = {};
            if (path.length > 1) {
                for (let param of path[1].split('&')) {
                    param = param.split('=');
                    if (param.length === 2) {
                        queryParams[param[0]] = param[1];
                    }
                }
            }

            // Navigate to url with queryParams
            this.router.navigate([url], { queryParams: queryParams });
        });
    }

}
