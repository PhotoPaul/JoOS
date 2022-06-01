import { Component, Input } from '@angular/core';

@Component({
    selector: 'loading',
    template: `
        <i class="fas fa-circle-notch fa-spin fa-fw {{ size }}"></i><br><ng-content></ng-content>
    `
})
export class LoadingComponent {
    @Input() size = 'fa-2x';

}
