import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Directive({
    selector: '[authIf]'
})
export class AuthIfDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthenticationService
    ) {}

    @Input() set authIf(roles: string | string[]){
        if (this.auth.hasAccess(roles)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
