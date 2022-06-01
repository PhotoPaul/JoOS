import { Component, Input, OnInit } from '@angular/core';

import { ActionButtonInputs } from './action-collection';

@Component({
    selector: 'action-collection',
    templateUrl: 'action-collection.component.html'
})
export class ActionCollectionComponent implements OnInit {
    @Input() actionButtons: ActionButtonInputs[];
    @Input() collectionData: any;
    @Input() collectionAjax = false;
    @Input() parentRef?;

    constructor() { }

    ngOnInit() { }

    specialClick($event, actionButtonClicked) {
        if (this.collectionAjax) {
            for (const actionButton of this.actionButtons){
                actionButton.ajax = { state: 'pending' };
            }
        }
        actionButtonClicked.onClick($event, actionButtonClicked, this.actionButtons, this.parentRef);
    }
}
