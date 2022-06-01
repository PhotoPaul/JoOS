import { Component, ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { NotificationService } from '../notification.service';

@Component({
    selector: '[notifications]',
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit, OnDestroy {
    unreadNotificationsLength: number;
    notificationsLoading = false;
    notifications: Notification[];
    timerId: number;

    constructor(
        private notificationService: NotificationService,
        private renderer: Renderer,
        private elementRef: ElementRef,
        private modalService: ModalService
    ) { }

    async ngOnInit() {
        const getNotificationsLength = async () => {
            this.unreadNotificationsLength = await this.notificationService.getNotificationsLength() as number;
            if (+this.unreadNotificationsLength > 0) {
                this.toggleNotifications();
                this.renderer.setElementClass(this.elementRef.nativeElement, 'open', true);
            }
        };
        await getNotificationsLength();
        this.timerId = window.setInterval(getNotificationsLength, 150000);
    }

    async toggleNotifications() {
        this.notificationsLoading = true;
        this.notifications = await this.notificationService.getNotifications() as Notification[];

        this.unreadNotificationsLength = 0;
        for (const notification of this.notifications) {
            if (notification.read === '0') {
                this.unreadNotificationsLength++;
            }
        }

        this.notificationsLoading = false;
    }

    async notificationClicked(id) {
        await this.notificationService.markNotificationAsRead(id);
        this.notifications.some((notification, i) => {
            if (notification.id === id) {
                if (notification.read === '0') {
                    notification.read = '1';
                    this.unreadNotificationsLength--;
                }
                return true;
            }
        });
    }

    async clearNotification(id, $event) {
        $event.stopPropagation();
        await this.notificationService.clearNotification(id);
        this.notifications.some((notification, i) => {
            if (notification.id === id) {
                if (notification.read === '0') {
                    this.unreadNotificationsLength--;
                }
                this.notifications.splice(i, 1);
                return true;
            }
        });
    }

    async clearAllNotifications() {
        this.modalService.show({
            type: 'yesNo',
            message: 'clearAllNotificationsConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                this.notificationsLoading = true;
                await this.notificationService.clearAllNotifications();
                this.notifications = [];
                this.unreadNotificationsLength = 0;
                this.notificationsLoading = false;
                modalRef.hide();
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.timerId);
    }

}

interface Notification {
    id: number;
    fromUserId: number;
    firstName: string;
    lastName: string;
    photoURI: string;
    forUserId: number;
    title: string;
    body: string;
    path: string;
    read: string;
    hidden: string;
    dateTime: string;
}
