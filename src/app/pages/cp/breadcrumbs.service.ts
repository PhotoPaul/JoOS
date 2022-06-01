import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BreadcrumbService {
    private labels: Map<string, string>;

    constructor() {
        this.labels = new Map<string, string>();
    }

    getLabel(route: ActivatedRouteSnapshot): string {
        let label = this.labels.get(route.toString());
        if (!label) {
            label = route.data['path_title_' + localStorage.getItem('language')];
        }
        if (!label) {
            label = 'unknown';
        }
        return label;
    }
}
