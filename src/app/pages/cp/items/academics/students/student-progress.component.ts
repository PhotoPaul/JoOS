import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { ModalService } from '../../../../../ui/modal/modal.service';
import { StudentProgress } from './student-progress';
import { StudentsService } from './students.service';

@Component({
    templateUrl: 'student-progress.component.html',
    styles: [
        '.my-drop-zone { border: dotted 3px lightgray; position: relative; }',
        '.my-drop-zone-button { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; }',
        '.nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */'
    ]
})
export class StudentProgressComponent implements OnInit {
    student = { id: null, files: [] };
    studentProgress: StudentProgress;
    lastProgressItem;
    lastModalRef;
    lastPdfUrl;
    lastPdfSafeUrl;
    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    public hasAnotherDropZoneOver = false;

    constructor(
        private route: ActivatedRoute,
        private studentsService: StudentsService,
        private auth: AuthenticationService,
        private modal: ModalService,
        private ajax: AjaxService,
        public fs: FileSystemService,
        private changeDetector: ChangeDetectorRef,
        private ds: DomSanitizer
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(async params => {
            this.student.id = +params['id'];
            this.uploader = new FileUploader({
                url: this.ajax.apiURI,
                maxFileSize: 20971520,
                autoUpload: true,
                removeAfterUpload: true,
                additionalParameter: {
                    r: JSON.stringify({ q: 'handleFileUpload', p: { candidateId: this.student.id }, t: this.ajax.authenticationToken })
                }
            });
            const academicsStudentProgress = await this.studentsService.getStudentProgressData(this.student.id);
            this.studentProgress = academicsStudentProgress as StudentProgress;
        });

        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        };

        this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
        this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
    }

    getStatusClass(status) {
        if (status === '0') {
            return 'status-pending';
        } else if (status === '1') {
            return 'status-completed';
        } else {
            return 'status-missing';
        }
    }

    hasAccess(roles) {
        return roles === undefined || this.auth.hasAccess(roles.split(','));
    }

    async openFilePicker(actionButtonComponent: ActionButtonComponent, progressItem, template) {
        this.lastProgressItem = progressItem;
        const files: AjaxResponse = await this.ajax.get('getUserFiles', { id: this.student.id });
        this.student.files = files.data;
        this.lastModalRef = this.modal.show({
            type: 'ok',
            title: 'chooseFile',
            templateRef: template,
        });
        actionButtonComponent.ajax.state = 'idle';
    }

    async assignFile(filename) {
        const response = (await this.ajax.get('assignFileToProgressItem', {
            progressItemId: this.lastProgressItem.id,
            studentId: this.student.id,
            fieldName: this.lastProgressItem.field_name,
            filename: filename,
            pdfUrl: this.lastPdfUrl
        })).data;
        this.lastProgressItem.completed = null;
        this.lastProgressItem.id = response.lastInsertId;
        this.lastProgressItem.filename = response.filename;
        this.lastProgressItem.lastName = this.auth.user.lastName;
        this.lastProgressItem.firstName = this.auth.user.firstName;
        this.lastProgressItem.date_time = response.date_time;
        this.lastModalRef.hide();
    }

    openApplication(template, progressItem, pdfUrl) {
        this.lastProgressItem = progressItem;
        this.lastPdfUrl = pdfUrl;
        this.lastPdfSafeUrl = pdfUrl ? this.ds.bypassSecurityTrustResourceUrl(pdfUrl) as string : undefined;
        this.lastModalRef = this.modal.show({
            type: 'ok',
            title: 'examineApplication',
            templateRef: template,
        });
    }

    async unassignFile($buttonControl: ActionButtonComponent, progressItem) {
        this.modal.show({
            type: 'yesNo',
            message: 'unassignFileConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                const response = (await this.ajax.get('unassignFileFromProgressItem', { progressItemId: progressItem.id })).data;
                progressItem.filename = null;
                progressItem.completed = null;
                progressItem.lastName = this.auth.user.lastName;
                progressItem.firstName = this.auth.user.firstName;
                progressItem.date_time = response.date_time;
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            }
        });
    }

    async completeProgressItem($buttonControl: ActionButtonComponent, progressItem) {
        this.modal.show({
            type: 'yesNo',
            message: 'setAsCompleteConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                const response = (await this.ajax.get('completeProgressItem', {
                    progressItemId: progressItem.id,
                    studentId: this.student.id,
                    fieldName: progressItem.field_name
                })).data;
                progressItem.completed = '1';
                progressItem.id = response.lastInsertId;
                progressItem.lastName = this.auth.user.lastName;
                progressItem.firstName = this.auth.user.firstName;
                progressItem.date_time = response.date_time;
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
                $buttonControl.ajax.state = 'idle';
            }
        });
    }

    async incompleteProgressItem($buttonControl: ActionButtonComponent, progressItem) {
        const response = (await this.ajax.get('incompleteProgressItem', {
            progressItemId: progressItem.id,
        })).data;
        progressItem.completed = null;
        progressItem.lastName = this.auth.user.lastName;
        progressItem.firstName = this.auth.user.firstName;
        progressItem.date_time = response.date_time;
        $buttonControl.ajax.state = 'idle';
    }

    onCompleteItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
        try {
            const filename = JSON.parse(response).data;
            this.student.files.push({
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
}
