import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { File } from '../../../../../services/files';
import { UserService } from '../user.service';

@Component({
    selector: 'user-files',
    templateUrl: './user-files.component.html',
    styles: [
        '.my-drop-zone { border: dotted 3px lightgray; position: relative; }',
        '.my-drop-zone-button { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; }',
        '.nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */'
    ]
})
export class UserFilesComponent implements OnInit {
    public userFiles: File[];
    public userId;
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private route: ActivatedRoute,
        private ajax: AjaxService,
        private fs: FileSystemService,
        private userService: UserService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
            this.ajax.get('getUserFiles', { id: this.userId })
                .then((files: AjaxResponse) => {
                    this.userFiles = files.data;
                });
            this.uploader = new FileUploader({
                url: this.ajax.apiURI,
                maxFileSize: 20971520,
                autoUpload: true,
                removeAfterUpload: true,
                additionalParameter: {
                    r: JSON.stringify({ q: 'handleFileUpload', p: { candidateId: this.userId }, t: this.ajax.authenticationToken })
                }
            });
        });

        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        }

        this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
        this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
    }

    onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
        try {
            const filename = JSON.parse(response).data;
            this.userFiles.push({
                filename: filename,
                filesize: item.file.size,
                original_filename: item.file.name,
                original_mime_type: item.file.type
            });
        } catch (e) {
            return false;
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    getFile(filename) {
        this.fs.getFile(filename);
    }

    updateProfilePicture(filename, $updateProfilePictureButton) {
        this.userService.updateProfilePicture(filename).then(() => {
            $updateProfilePictureButton.ajax.state = 'idle';
        })
    }

    deleteFile(filename) {
        this.fs.deleteFile(filename)
        .then((response) => {
            if(response) {
                for (const i in this.userFiles) {
                    if (this.userFiles[i].filename === filename) {
                        this.userFiles.splice(parseInt(i, 10), 1);
                        break;
                    }
                }
            }
        })
    }
}
