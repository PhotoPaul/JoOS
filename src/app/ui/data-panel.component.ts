import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'data-panel',
    templateUrl: 'data-panel.component.html'
})
export class DataPanelComponent implements OnInit {
    @Input() ngId: string;
    @Input() heading: string;
    @Input() color  = 'portlet-dark-blue';
    @Input() table: TableMetaData = null;
    @Input() collapsed: boolean;

    ngOnInit() {}
}

class TableMetaData {
    filter: string = null;
    loading: string = null;
    th: string[];
}
