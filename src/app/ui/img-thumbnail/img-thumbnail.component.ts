import { Component, Input, OnInit } from '@angular/core';

import { FileSystemService } from '../../services/file-system.service';

@Component({
    selector: 'img-thumbnail',
    templateUrl: './img-thumbnail.component.html'
})
export class ImgThumbnailComponent implements OnInit {
    @Input() userId: number;
    @Input() src: string;
    @Input() noSrcIcon = 'fa-portrait';
    @Input() circle = true;
    @Input() maxWidth: number;
    @Input() maxHeight = 34;
    @Input() noTooltip = false;
    tooltipHtml: string;

    constructor(public fs: FileSystemService) { }

    ngOnInit() {
        this.tooltipHtml = '<img src="' + this.fs.getImageURI(this.src, 200) + '">';
    }
}
