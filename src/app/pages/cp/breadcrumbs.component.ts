import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { BreadcrumbService } from './breadcrumbs.service';

@Component({
    selector: 'app-cp-breadcrumbs',
    templateUrl: 'breadcrumbs.component.html',
    styles: [`
    ul.breadcrumb { padding: 10px 0; margin: 0; list-style: none; font-size: 16px;}
    ul.breadcrumb > li { display: inline-block; vertical-align: middle; }
    .breadcrumb > li + li:before { padding: 0 4px 0 8px; color: #ccc; content: "/"; }
    a:hover { cursor: pointer; }
    a.home { vertical-align: middle; display: inline-block; }
    a.home i { font-size: 18px; }
  `]
})
export class BreadcrumbsComponent {
    segments: ActivatedRoute[];

    constructor (
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breadcrumbLabels: BreadcrumbService,
        private titleService: Title
    ) {
        this.segments = new Array();
        this.router.events
            .subscribe(this.routeChanged.bind(this));
    }

    routeChanged(event: any) {
        if (event instanceof NavigationEnd) {
            this.segments.length = 0;
            this.generateBreadcrumbTrail(this.router.routerState.root.firstChild);
            if (this.segments.length) {
                this.titleService.setTitle('JoOS - ' + this.breadcrumbLabels.getLabel(this.segments[this.segments.length - 1].snapshot));
            }
        }
    }

    generateBreadcrumbTrail(route: ActivatedRoute): void {
        const childRoute = route;
        if (route.children.length) {
            this.segments.push(childRoute.firstChild);
            this.generateBreadcrumbTrail(childRoute.firstChild);
        }
    }

    navigateTo(route: ActivatedRoute): void {
        const routeHierarchy = route.pathFromRoot;
        let url = '';
        routeHierarchy.forEach((parentRoute: ActivatedRoute) => {
            if (parentRoute.snapshot.url.length > 0) {
                url += '/' + parentRoute.snapshot.url.map(segment => segment.path).join('/');
            }
        });
        this.router.navigateByUrl(url);
    }

    routeName(route: ActivatedRoute): string {
        return this.breadcrumbLabels.getLabel(route.snapshot);
    }
}
