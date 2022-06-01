import { Component, OnInit } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Component({
    templateUrl: 'logs.component.html'
})
export class LogsComponent implements OnInit {
    logs;
    constructor(public ajax: AjaxService) { }

    ngOnInit() {
        this.ajax.get('getLogs')
            .then((response: AjaxResponse) => {
                const logs = [];
                for (let i = 0; i < response.data.length; i++) {
                    const userItemIndex = logs.findIndex(logItem => logItem.userId === response.data[i].user_id);
                    if (userItemIndex !== -1) {
                        logs[userItemIndex].logItems.push(response.data[i]);
                    } else {
                        logs.push({
                            userId: response.data[i].user_id,
                            logItems: [response.data[i]]
                        });
                    }
                }
                this.logs = logs;
            });
    }

    clearLogs($this) {
        this.ajax.get('clearLogs')
            .then((response: AjaxResponse) => {
                this.logs = response.data;
                $this.ajax.state = 'idle';
            });
    }

    getParams(logEntry) {
        const entry = JSON.parse(logEntry);
        return JSON.stringify(entry.p);
    }
}
