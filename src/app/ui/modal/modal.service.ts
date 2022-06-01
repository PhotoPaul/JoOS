import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { isArray } from 'util';

import { LocalizationService } from '../../localization/localization.service';
import { CustomModalOptions } from './modal';
import { ModalComponent } from './modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private modalService: BsModalService,
        private localization: LocalizationService
    ) { }

    show(customModalOptions: CustomModalOptions, modalOptions?: ModalOptions) {
        if (customModalOptions.type === 'yesNo') {
            return this.modalService.show(ModalComponent, {
                ignoreBackdropClick: true,
                initialState: {
                    options: {
                        type: customModalOptions.type,
                        title: customModalOptions.title || 'confirmationRequired',
                        message: this.parseMessage(customModalOptions.message),
                        bodyClass: 'alert alert-danger',
                        confirmationButtons: [{
                            color: 'btn-red',
                            icon: 'fa-thumbs-up',
                            caption: this.localization.s('yes'),
                            tooltip: this.localization.s('yes'),
                            ajax: { state: 'idle' },
                            onClick: customModalOptions.onYes
                        }, {
                            color: 'btn-blue',
                            icon: 'fa-thumbs-down',
                            caption: this.localization.s('no'),
                            tooltip: this.localization.s('cancel'),
                            ajax: { state: 'idle' },
                            onClick: customModalOptions.onNo
                        }],
                        onClose: customModalOptions.onNo
                    }
                }
            });
        } else if (customModalOptions.type === 'ok') {
            return this.modalService.show(ModalComponent, {
                ignoreBackdropClick: customModalOptions.onOk ? true : false,
                initialState: {
                    options: {
                        type: customModalOptions.type,
                        title: customModalOptions.title || 'information',
                        templateRef: customModalOptions.templateRef,
                        message: this.parseMessage(customModalOptions.message),
                        onOk: customModalOptions.onOk ? customModalOptions.onOk : (modalRef: BsModalRef) => {
                            modalRef.hide();
                        }
                    }
                }
            });
        }
    }

    parseMessage(message) {
        if (isArray(message) && message.length) {
            message[0] = this.localization.s(message[0]);
            for (let i = 1; i < message.length; i++) {
                message[0] = message[0].replace(/\$\$/, message[i]);
            }
            return message[0];
        }
        return this.localization.s(message);
    }
}
