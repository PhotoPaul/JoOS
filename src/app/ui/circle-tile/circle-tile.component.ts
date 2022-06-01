import { Component, Input } from '@angular/core';

import { FileSystemService } from '../../services/file-system.service';
import { ModalService } from '../modal/modal.service';

@Component({
    selector: 'circle-tile',
    templateUrl: 'circle-tile.component.html',
})
export class CircleTileComponent {
    @Input() widthClass = 'col-lg-3';
    @Input() color: string;
    @Input() icon: string;
    @Input() iconData: CircleTileIconModel;

    @Input() heading: string;
    @Input() headingPath: string;

    @Input() footer: string;
    @Input() footerPath: string = null;

    @Input() footerLinks: {
        text: string;
        path: string;
    } [] = [];

    constructor(public fs: FileSystemService, private modal: ModalService) { }

    showModal() {
        this.modal.show({
            type: 'ok',
            title: this.iconData.modal.title,
            templateRef: this.iconData.modal.templateRef,
        });
    }
}

export interface CircleTileIconModel {
    fa: string;
    picture: string;
    path: string;
    url: string;
    modal: {
        title: string;
        templateRef: any;
    };
}
