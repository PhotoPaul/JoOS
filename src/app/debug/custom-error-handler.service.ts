import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../services/ajax.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error) {
        const ajax = this.injector.get(AjaxService);

        // Log error to Server
        ajax.get('logClientError', {
            message: error.stack,
            uri: window.location.toString()
        });

        const router = this.injector.get(Router);
        ajax.errorReason = '<b>JoOS Runtime Error:</b><br>' + error.stack;
        ajax.errorReason += '<br><b>Location:</b><br>' + window.location.toString();
        router.navigate(['/cp/error']);

        setTimeout(() => {
            throw error;
        }, 500);
    }
}
