import { Component, OnInit } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Component({
    selector: 'app-db-manager',
    templateUrl: './db-manager.component.html'
})
export class DBManagerComponent implements OnInit {
    public db: DBMeta;

    constructor(private ajax: AjaxService) { }

    async ngOnInit() {
        this.db = (await this.ajax.get('getDBMeta') as AjaxResponse).data;
    }

    async downloadTable(tableName) {
        await this.ajax.get('downloadDBTables', { tableNames: [tableName] }, true);
    }

    async downloadDB() {
        await this.ajax.get('downloadDBTables', null, true);
    }
}
export interface DBMeta {
    dbSettings: {
        username: string;
        password: string;
        host: string;
        db: string;
        tablePrefix: string;
        timezone: string;
    };
    tables: {
        name: string;
        dateTime: string;
        size: string;
        noRows: number;
    }[];
}
