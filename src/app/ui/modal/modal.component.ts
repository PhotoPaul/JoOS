import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

import { CustomModalOptions } from './modal';

@Component({
    templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
    public options: CustomModalOptions;

    constructor(public modalRef: BsModalRef) { }

    ngOnInit() { }

    onX() {
        if (this.options.onClose) {
            this.options.onClose(null, null, null, this.modalRef);
        } else if (this.options.onOk) {
            this.options.onOk(this.modalRef);
        } else {
            this.modalRef.hide();
        }
    }
}
