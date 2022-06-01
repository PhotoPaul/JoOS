import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../../../../ui/modal/modal.service';
import { NotificationService, NotificationTemplate } from '../../../../../ui/notification.service';

@Component({
    templateUrl: './notification-templates.component.html'
})
export class NotificationTemplatesComponent implements OnInit {
    notificationTemplates = [];

    constructor(
        private notificationService: NotificationService,
        private modalService: ModalService,
    ) { }

    async ngOnInit() {
        this.notificationTemplates = await this.notificationService.getNotificationTemplates() as NotificationTemplate[];
    }

    viewTemplate(actionButton, name) {
        this.notificationService.getNotificationTemplate(name)
            .then((notificationTemplate: NotificationTemplate) => {
                actionButton.ajax.state = 'idle';
                this.modalService.show({
                    type: 'ok',
                    title: 'notificationTemplatePreviewTitle',
                    message: `
                        <div class="row text-center">
                            <div class="col-md-6">` + notificationTemplate.subject_en + `</div>
                            <div class="col-md-6">` + notificationTemplate.subject_gr + `</div>
                        </div><hr>
                        <div class="row">
                            <div class="col-md-6">` + notificationTemplate.body_en + `</div>
                            <div class="col-md-6">` + notificationTemplate.body_gr + `</div>
                        </div>
                    `
                });
            });
    }

}
