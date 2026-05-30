import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileItem, FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LocalizationService } from '../../../../../localization/localization.service';
import { AjaxService } from '../../../../../services/ajax.service';
import { FileSystemService } from '../../../../../services/file-system.service';

@Component({
    selector: 'inline-uploader',
    templateUrl: 'inline-uploader.component.html',
    styles: [
        '.inline-uploader-wrapper { margin-top: 5px; margin-bottom: 12px; }',
        '.inline-drop-zone { border: 2px dashed #ccc; padding: 12px 15px; border-radius: 6px; text-align: center; background: #fafafa; position: relative; transition: border-color 0.2s, background-color 0.2s; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; }',
        '.inline-drop-zone:hover { border-color: #5cb85c; background: #fcfdfc; }',
        '.inline-drop-zone-button { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10; }',
        '.nv-file-over { border-color: #5cb85c; background: #eef7ee; }',
        '.uploaded-files-list { margin-bottom: 8px; }',
        '.uploaded-file-item { display: flex; align-items: center; justify-content: space-between; background: #f2f7f4; border: 1px solid #d2e8dd; padding: 8px 12px; border-radius: 6px; margin-top: 4px; transition: background-color 0.2s; }',
        '.uploaded-file-item:hover { background: #e9f2eb; }',
        '.uploaded-file-info { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #2e5a44; overflow: hidden; }',
        '.preview-card { border: 2px solid #5cb85c; border-radius: 6px; padding: 12px; background: #fbfdfb; margin-top: 5px; }',
        '.preview-img { max-width: 100%; max-height: 200px; border-radius: 4px; border: 1px solid #ddd; margin: 8px auto; display: block; object-fit: contain; }',
        '.progress-container { margin-top: 8px; }'
    ]
})
export class InlineUploaderComponent implements OnInit {
    @Input() userId: number;
    @Input() documentTypeId: number;
    @Input() files: any[] = [];
    @Input() label: string = '';
    
    @Output() filesChanged = new EventEmitter<any[]>();

    public uploader: FileUploader;
    public hasDropZoneOver = false;
    public uploadProgress = 0;
    public isUploading = false;
    public showUploadArea = false;

    // Preview state properties
    public hasPendingFile = false;
    public pendingFileItem: FileItem | null = null;
    public pendingPreviewUrl: SafeUrl | string | null = null;
    public pendingFileName = '';
    public pendingFileSize = '';
    public isPendingImage = false;

    private rawPreviewUrl: string | null = null;

    constructor(
        private localization: LocalizationService,
        private ajax: AjaxService,
        public fs: FileSystemService,
        private changeDetector: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.uploader = new FileUploader({
            url: this.ajax.apiURI,
            maxFileSize: 20971520, // 20 MB
            autoUpload: false, // Wait for user confirmation!
            removeAfterUpload: true,
            additionalParameter: {
                r: JSON.stringify({ q: 'handleFileUpload', p: { candidateId: this.userId }, t: this.ajax.authenticationToken })
            }
        });

        // Triggered when user selects a file or snaps a photo
        this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
            const rawFile = fileItem._file;
            this.pendingFileItem = fileItem;
            this.pendingFileName = rawFile.name;
            this.pendingFileSize = (rawFile.size / 1024 / 1024).toFixed(2) + ' MB';
            this.hasPendingFile = true;

            // Generate image preview if it's an image
            if (rawFile.type.startsWith('image/')) {
                this.isPendingImage = true;
                this.rawPreviewUrl = URL.createObjectURL(rawFile);
                this.pendingPreviewUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawPreviewUrl);
            } else {
                this.isPendingImage = false;
                this.pendingPreviewUrl = null;
            }
            this.changeDetector.detectChanges();
        };

        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
            this.isUploading = true;
            this.uploadProgress = 0;
            this.changeDetector.detectChanges();
        };

        this.uploader.onProgressItem = (progress: any) => {
            this.uploadProgress = progress;
            this.changeDetector.detectChanges();
        };

        this.uploader.onCompleteItem = (item, response, status, headers) => {
            this.isUploading = false;
            this.uploadProgress = 0;
            this.resetPendingFile();
            this.showUploadArea = false;
            
            try {
                const filename = JSON.parse(response).data;
                const newFile = {
                    filename: filename,
                    filesize: item.file.size,
                    original_mime_type: item.file.type,
                    original_filename: item.file.name,
                    documentTypeId: this.documentTypeId,
                    owner_id: this.userId
                };
                
                // Save document type via API
                this.ajax.get('setUserApplicationDocumentType', { 
                    userId: this.userId, 
                    documentId: filename, 
                    documentTypeId: this.documentTypeId 
                }).then(() => {
                    this.files.push(newFile);
                    this.filesChanged.emit(this.files);
                    this.changeDetector.detectChanges();
                });
            } catch (e) {
                console.error('Failed to process uploaded file:', e);
            }
        };
    }

    fileOver(e: any): void {
        this.hasDropZoneOver = e;
    }

    // Get all uploaded files of the specific document type
    get uploadedFiles() {
        if (!this.files) return [];
        return this.files.filter(f => +f.documentTypeId === +this.documentTypeId);
    }

    // Confirm and upload the pending file
    confirmUpload() {
        if (this.pendingFileItem) {
            this.pendingFileItem.upload();
        }
    }

    // Discard the pending preview file
    cancelUpload() {
        this.uploader.clearQueue();
        this.resetPendingFile();
    }

    private resetPendingFile() {
        if (this.rawPreviewUrl) {
            URL.revokeObjectURL(this.rawPreviewUrl);
            this.rawPreviewUrl = null;
        }
        this.hasPendingFile = false;
        this.pendingFileItem = null;
        this.pendingPreviewUrl = null;
        this.pendingFileName = '';
        this.pendingFileSize = '';
        this.isPendingImage = false;
        this.changeDetector.detectChanges();
    }

    getFile(filename: string) {
        this.fs.getFile(filename);
    }

    deleteFile(filename: string) {
        this.fs.deleteFile(filename).then((response) => {
            if (response) {
                const idx = this.files.findIndex(f => f.filename === filename);
                if (idx !== -1) {
                    this.files.splice(idx, 1);
                    this.filesChanged.emit(this.files);
                    this.changeDetector.detectChanges();
                }
            }
        });
    }
}
