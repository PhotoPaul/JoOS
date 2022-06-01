import { Component, OnInit } from '@angular/core';

import { FileSystemService } from '../../../../../services/file-system.service';

@Component({
    selector: 'app-file-manager',
    templateUrl: 'file-manager.component.html'
})
export class FileManagerComponent implements OnInit {
    public files;
    private _totalSize;
    public get totalSize() {
        if (!this._totalSize) {
            this._totalSize = this.files.dbFiles.map((file) => { return parseInt(file.filesize); }).reduce((totalSize, filesize) => { return totalSize + filesize; });
        }
        return this._totalSize;
    }

    constructor(public fs: FileSystemService) { }

    ngOnInit() {
        this.fs.getAllFiles()
            .then((response: any) => {
                this.files = response.data;
            });
    }

    getTotalSize(dbFiles: any[]) {
        return dbFiles.map((file) => { return parseInt(file.filesize); }).reduce((totalSize, filesize) => {
            return totalSize + filesize;
        });
    }

    deleteFile(filename) {
        this.fs.deleteFile(filename)
            .then((response) => {
                if (response) {
                    this.files.fsOnlyFiles.splice(this.files.fsOnlyFiles.indexOf(filename), 1);
                    for (let i = 0; i < this.files.dbOnlyFiles.length; i++) {
                        if (this.files.dbOnlyFiles[i].filename === filename) {
                            this.files.dbOnlyFiles.splice(i, 1);
                            break;
                        }
                    }
                    for (let i = 0; i < this.files.dbFiles.length; i++) {
                        if (this.files.dbFiles[i].filename === filename) {
                            this.files.dbFiles.splice(i, 1);
                            break;
                        }
                    }
                }
            });
    }

}
