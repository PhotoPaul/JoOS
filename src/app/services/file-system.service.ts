import { Injectable } from '@angular/core';

import { ModalService } from '../ui/modal/modal.service';
import { AjaxResponse, AjaxService } from './ajax.service';

@Injectable()
export class FileSystemService {
    constructor(
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    getFileIcon(mime) {
        if (mime === 'image/jpeg' || mime === 'image/png') {
            return 'fa-file-image';
        } else if (mime === 'application/pdf') {
            return 'fa-file-pdf';
        }
    }

    getFileURI(filename) {
        return this.ajax.getURI('getFile', { filename: filename });
    }

    getImageURI(filename, width?, height?) {
        return this.ajax.getURI('getImage', { filename: filename, width: width, height: height });
    }

    getFile(filename) {
        this.ajax.get('getFile', { filename: filename }, true);
    }

    deleteFile(filename) {
        return new Promise((resolve) => {
            this.modalService.show({
                type: 'yesNo',
                message: 'deleteFileConfirmation',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('deleteFile', { filename: filename })
                        .then((response: AjaxResponse) => {
                            modalRef.hide();
                            resolve(response.data);
                        });
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                    resolve(false);
                }
            });
        });
    }

    getAllFiles() {
        return this.ajax.get('getAllFiles');
    }
}
