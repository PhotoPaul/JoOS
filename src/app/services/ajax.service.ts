import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable()
export class AjaxService {
    authenticationToken: string;
    errorReason = '';
    latestRequest = '';
    latestRequestUrl = '';
    apiURI = environment.apiURI;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private router: Router
    ) { }

    getURI(query: string, params?: Object) {
        const ajaxQuery: AjaxRequest = new AjaxRequest(query, params);
        ajaxQuery.t = this.authenticationToken;
        const postData = 'r=' + encodeURIComponent(JSON.stringify(ajaxQuery));
        return this.apiURI + '?' + postData;
    }

    get(query: string | string[], params?: Object, download?: boolean): AjaxResponse | any {
        const ajaxQuery: AjaxRequest = new AjaxRequest(query, params);
        ajaxQuery.t = this.authenticationToken;
        const postData = 'r=' + encodeURIComponent(JSON.stringify(ajaxQuery));

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/X-www-form-urlencoded',
                // 'Authorization': // Cannot simply use this.authenticationToken cause Authorization has a different documentation
            })
        };

        if (download) {
            window.open(this.apiURI + '?' + postData);
        } else {
            return new Promise(resolve => {
                // Exclude logClientError to avoid overwriting useful debug information
                if (ajaxQuery.q !== 'logClientError') {
                    this.latestRequest = ajaxQuery.q + ': ' + JSON.stringify(ajaxQuery.p);
                    this.latestRequestUrl = this.apiURI + '?' + postData;
                }

                this.http.post(this.apiURI, postData, httpOptions).subscribe((response: any) => {
                    if (Array.isArray(response)) {
                        response.some(item => {
                            if (item && item.errorReason) {
                                // this.errorReason = item.errorReason;
                                // this.router.navigate(['/cp/error']);
                                return true;
                            }
                        });
                        resolve(response);
                    } else {
                        if (response && response.errorReason) {
                            this.errorReason = response.errorReason;
                            this.router.navigate(['/cp/error']);
                        } else {
                            resolve(response);
                        }
                    }
                }, error => {
                    this.errorReason = 'Unexpected API Response';
                    if (error.error) {
                        this.errorReason += '<br>' + error.error.errorReason;
                        this.latestRequest += '<br>' + error.error.text;
                        this.router.navigate(['/cp/error']);
                    }
                });
            });
        }
    }
}

export class AjaxRequest {
    q: string | string[];
    p: Object;
    t: string;

    constructor(q, p = {}) {
        this.q = q;
        this.p = p;
    }
}

export class AjaxResponse {
    public success: boolean;
    public data: any;
    public reason: string;
}
