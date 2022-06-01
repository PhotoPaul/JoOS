import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'action-button',
    templateUrl: 'action-button.component.html'
})
export class ActionButtonComponent {
    @Output() specialClick = new EventEmitter();
    @Input() color: string;
    @Input() iconClass = 'fas';
    @Input() icon: string;
    @Input() caption = '';
    // tslint:disable-next-line:no-input-rename
    @Input('bTooltip') tooltip: string; // Input renamed to avoid conflict with App Wide ngx-bootstrap tooltip directive
    @Input() fromActionCollectionTooltip: string;
    @Input() hidden = false;
    @Input() disabled = false;
    @Input() data: any;
    @Input() ajax = { state: 'idle' };

    onClick($event) {
        if (this.ajax) {
            this.ajax.state = 'pending';
        }
        this.specialClick.emit({
            event: $event,
            actionButtonComponent: this
        });
    }
}
