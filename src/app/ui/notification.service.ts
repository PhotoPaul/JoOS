import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../services/ajax.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private ajax: AjaxService) { }

    getNotificationsLength() {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('getNotificationsLength')).data.notificationsLength);
        });
    }

    getNotifications() {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('getNotifications')).data);
        });
    }

    markNotificationAsRead(id) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('markNotificationAsRead', { id: id })).data);
        });
    }

    clearNotification(id) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('clearNotification', { id: id })).data);
        });
    }

    clearAllNotifications() {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('clearAllNotifications')).data);
        });
    }

    getNotificationTemplates() {
        return new Promise(resolve => {
            this.ajax.get('getNotificationTemplates')
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    getNotificationTemplate(name) {
        return new Promise(resolve => {
            this.ajax.get('getNotificationTemplate', { name: name })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }
}

export interface Notification {
    id: number;
}
export interface NotificationTemplate {
    name: string;
    subject_en: string;
    subject_gr: string;
    body_en: string;
    body_gr: string;
}
