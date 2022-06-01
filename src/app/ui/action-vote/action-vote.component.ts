import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { LocalizationService } from '../../localization/localization.service';
import { AdmissionService } from '../../pages/cp/items/admission/admission.service';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
    selector: 'action-vote',
    templateUrl: './action-vote.component.html'
})
export class ActionVoteComponent implements OnInit {
    @Input() data;
    @Input() handler;
    @Input() yesCaption = this.localization.s('yes');
    @Input() yesTooltip;
    @Input() yesColor = 'btn-green';
    @Input() blankCaption = this.localization.s('blank');
    @Input() blankTooltip;
    @Input() blankColor = 'btn-white';
    @Input() noCaption = this.localization.s('no');
    @Input() noTooltip;
    @Input() noColor = 'btn-red';
    @Input() blankVote = false;
    @ViewChild('yesButton') yesButton;
    @ViewChild('blankButton') blankButton;
    @ViewChild('noButton') noButton;

    // Cannot remove injection of AdmissionService because the handler fails to call it's methods if it's not injected
    constructor(private localization: LocalizationService, private admissionService: AdmissionService) { }

    ngOnInit() { }

    vote($event, buttonClicked: ActionButtonComponent) {
        this.handler(this.data, buttonClicked.data)
        .then(() => {
            buttonClicked.ajax = {state: 'idle'};
            this.activateButton(buttonClicked.data);
        });

    }

    activateButton(dataValue) {
        if (this.blankVote) {
            if (this.blankButton.data === dataValue) {
                this.blankButton.color = 'btn-orange';
                this.blankButton.icon = 'fa-check-square';
            } else {
                this.blankButton.color = 'btn-white';
                this.blankButton.icon = 'fa-square';
            }
        }
        if (this.yesButton.data === dataValue) {
            this.yesButton.color = 'btn-green';
            this.yesButton.icon = 'fa-check-square';
        } else {
            this.yesButton.color = 'btn-white';
            this.yesButton.icon = 'fa-square';
        }
        if (this.noButton.data === dataValue) {
            this.noButton.color = 'btn-red';
            this.noButton.icon = 'fa-check-square';
        } else {
            this.noButton.color = 'btn-white';
            this.noButton.icon = 'fa-square';
        }
    }
}
