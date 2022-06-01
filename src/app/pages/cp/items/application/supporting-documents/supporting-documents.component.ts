import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AjaxService } from '../../../../../services/ajax.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { ApplicationService } from '../application.service';

@Component({
    templateUrl: 'supporting-documents.component.html',
    styles: [
        '.my-drop-zone { border: dotted 3px lightgray; position: relative; }',
        '.my-drop-zone-button { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; }',
        '.nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */'
    ]
})
export class SupportingDocumentsComponent implements OnInit {
    public userId;
    public applicationId = 12;
    public applicationData: ApplicationData;
    public formLoading = true;
    public requirementsFulfilled = false;
    public requirementsNotFulfilled = [];
    public requirementsArray = [
        [1, 2, 3],  // National Id, Passport, Residence Permit
        [4, 7, 8],  // Official High School Transcript, ACT Scores, SAT Scores
        [5]         // Passport size Photo
    ];
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private localization: LocalizationService,
        private route: ActivatedRoute,
        private router: Router,
        private ajax: AjaxService,
        public fs: FileSystemService,
        public applicationService: ApplicationService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.userId = +params['userId'] || null;
            this.uploader = new FileUploader({
                url: this.ajax.apiURI,
                maxFileSize: 20971520,
                autoUpload: true,
                removeAfterUpload: true,
                additionalParameter: {
                    r: JSON.stringify({ q: 'handleFileUpload', p: { candidateId: this.userId }, t: this.ajax.authenticationToken })
                }
            });
            this.applicationService.getUserApplicationData(this.userId, this.applicationId)
            .then((applicationData: ApplicationData) => {
                if (applicationData) {
                    this.applicationData = applicationData;
                    this.checkRequirements();
                }
                this.formLoading = false;
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
            this.applicationData.application.push({
                filename: filename,
                filesize: item.file.size,
                original_mime_type: item.file.type,
                original_filename: item.file.name,
                documentTypeId: null
            });
        } catch (e) {
            return false;
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    setUserApplicationDocumentType(file, documentTypeId) {
        this.ajax.get('setUserApplicationDocumentType', { userId: file.owner_id, documentId: file.filename, documentTypeId: documentTypeId })
            .then(() => {
                this.checkRequirements();
            });
    }

    getDocumentTitle(documentTypeIds: number[]) {
        const documentTypeTitles = documentTypeIds.map((documentTypeId) => {
            return this.applicationData.collections[this.applicationData.collections.findIndex(documentType => {
                return +documentType.documentTypeId === documentTypeId;
            })]['title_' + this.localization.getActiveLanguage()];
        });
        return documentTypeTitles.join(this.localization.s('or'));
    }

    checkRequirements() {
        this.requirementsNotFulfilled = this.requirementsArray.filter(req => {
            const a = this.applicationData.application.some(file => {
                const b = req.some(r => {
                    return +file.documentTypeId === r;
                });
                return b;
            });
            return !a;
        });
    }

    getFile(filename) {
        this.fs.getFile(filename);
    }

    deleteFile(filename) {
        this.fs.deleteFile(filename)
        .then((response) => {
            if(response) {
                for (const i in this.applicationData.application) {
                    if (this.applicationData.application[i].filename === filename) {
                        this.applicationData.application.splice(parseInt(i, 10), 1);
                        break;
                    }
                }
            }
        })
    }

    submitForm() {
        this.formLoading = true;
        this.applicationService.submitUserApplication(this.userId, this.applicationId)
        .then(() => {
            this.router.navigate(['/cp']);
        });
    }
}
