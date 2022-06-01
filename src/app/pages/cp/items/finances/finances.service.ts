import { Injectable } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

import { LocalizationService } from '../../../../localization/localization.service';
import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { ModalService } from '../../../../ui/modal/modal.service';
import { AccountTemplatesData, Record, UserRecordsData } from './finances';

@Injectable()
export class FinancesService {
    public accountTemplatesData: AccountTemplatesData = {} as AccountTemplatesData;
    public userRecordsData: UserRecordsData = {} as UserRecordsData;
    public Math = window['Math']; // window.Math works too, but Window type does not include the Math object
    private lastRecordDate: string;

    constructor(private ajax: AjaxService, private localization: LocalizationService, private modalService: ModalService) { }

    getUsersFinancesData(filter?: { studentsOnly: boolean }) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('getUsersFinancesData', { filter: filter }) as AjaxResponse).data);
        });
    }

    getAccountTemplatesData() {
        this.accountTemplatesData = {} as AccountTemplatesData;
        this.ajax.get('getAccountTemplatesData')
            .then((response: AjaxResponse) => {
                this.accountTemplatesData = response.data as AccountTemplatesData;
            });
    }

    saveAccountTemplateItem(accountTemplateItem) {
        return new Promise((resolve) => {
            this.ajax.get('saveAccountTemplateItem', { accountTemplateItem: accountTemplateItem })
                .then((response: AjaxResponse) => {
                    if (response.data.statement === 'INSERT') {
                        let accountTemplateExists = false;
                        for (const accountTemplate of this.accountTemplatesData.accountTemplates){
                            if (accountTemplate.name === response.data.accountTemplateItem.name) {
                                accountTemplateExists = true;
                                accountTemplate.accountTemplateItems.unshift(response.data.accountTemplateItem);
                                break;
                            }
                        }
                        if (!accountTemplateExists) {
                            this.accountTemplatesData.accountTemplates.unshift({
                                name: response.data.accountTemplateItem.name,
                                accountTemplateItems: [response.data.accountTemplateItem]
                            });
                        }
                    } else if (response.data.statement === 'UPDATE') {
                        for (const i in this.accountTemplatesData.accountTemplates) {
                            if (this.accountTemplatesData.accountTemplates.hasOwnProperty(i)) {
                                for (const j in this.accountTemplatesData.accountTemplates[i].accountTemplateItems) {
                                    if (
                                        this.accountTemplatesData.accountTemplates[i].accountTemplateItems[j].id === accountTemplateItem.id
                                    ) {
                                        let accountTemplateExists = false;
                                        // If no accountTemplates left, then remove accountTemplate
                                        if (this.accountTemplatesData.accountTemplates[i].accountTemplateItems.length === 1) {
                                            this.accountTemplatesData.accountTemplates.splice(+i, 1);
                                        } else {
                                        // If there are accountTemplates left, then only remove accountTemplateItem
                                            this.accountTemplatesData.accountTemplates[i].accountTemplateItems.splice(+j, 1);
                                        }
                                        // Check if accountTemplate exists
                                        for (const accountTemplate of this.accountTemplatesData.accountTemplates){
                                            // If accountTemplate exists, insert accountTemplateItem in it
                                            if (accountTemplate.name === response.data.accountTemplateItem.name) {
                                                accountTemplateExists = true;
                                                accountTemplate.accountTemplateItems.unshift(response.data.accountTemplateItem);
                                                break;
                                            }
                                        }
                                        // If accountTemplate doesn't exist, insert accountTemplate
                                        if (!accountTemplateExists) {
                                            this.accountTemplatesData.accountTemplates.unshift({
                                                name: response.data.accountTemplateItem.name,
                                                accountTemplateItems: [response.data.accountTemplateItem]
                                            });
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    resolve();
                });
        });
    }

    deleteAccountTemplateItem(id) {
        return new Promise((resolve) => {
            this.ajax.get('deleteAccountTemplateItem', { id: id })
                .then((response: AjaxResponse) => {
                    for (let i = 0; i < this.accountTemplatesData.accountTemplates.length; i++) {
                        for (let j = 0; j < this.accountTemplatesData.accountTemplates[i].accountTemplateItems.length; j++) {
                            if (this.accountTemplatesData.accountTemplates[i].accountTemplateItems[j].id === response.data.id) {
                                if (this.accountTemplatesData.accountTemplates[i].accountTemplateItems.length === 1) {
                                    this.accountTemplatesData.accountTemplates.splice(+i, 1);
                                } else {
                                    this.accountTemplatesData.accountTemplates[i].accountTemplateItems.splice(+j, 1);
                                }
                                break;
                            }
                        }
                    }
                    resolve();
                });
        });
    }

    getTemplateByTemplateName(accountTemplateName) {
        for (const accountTemplate of this.accountTemplatesData.accountTemplates){
            if (accountTemplate.name === accountTemplateName) {
                return accountTemplate.accountTemplateItems;
            }
        }
    }

    saveRecordsByAccountTemplateName(userId, accountTemplateName, date) {
        this.lastRecordDate = date;
        return new Promise((resolve) => {
            this.ajax.get('saveRecordsByAccountTemplateName', {
                userId: userId,
                accountTemplateName: accountTemplateName,
                date: date
            })
                .then(() => {
                    resolve();
                    this.getUserRecordsData(userId);
                });
        });
    }

    async getUserRecordsData(id: number) {
        this.userRecordsData = {} as UserRecordsData;
        this.userRecordsData = (await this.ajax.get('getUserRecordsData', {id: id}) as AjaxResponse).data as UserRecordsData;
    }

    saveRecord(record) {
        this.lastRecordDate = record.date_time;
        return new Promise((resolve) => {
            this.ajax.get('saveRecord', { record: record })
                .then((response: AjaxResponse) => {
                    if (response.data.statement === 'INSERT') {
                        this.userRecordsData.records.unshift(response.data.record as Record);
                    }
                    resolve();
                });
        });
    }

    deleteRecord(id) {
        return new Promise((resolve) => {
            this.ajax.get('deleteRecord', { id: id })
                .then((response: AjaxResponse) => {
                    for (let i = 0; i < this.userRecordsData.records.length; i++) {
                        if (this.userRecordsData.records[i].id === response.data.id) {
                            this.userRecordsData.records.splice(+i, 1);
                            break;
                        }
                    }
                    resolve();
                });
        });
    }

    getCategoryNameById(id, categories) {
        for (const category of categories){
            if (category.id === id) {
                return category['name_' + this.localization.getActiveLanguage()];
            }
        }
    }

    async sendPaymentReminder($control, userId) {
        await this.ajax.get('sendPaymentReminder', { userId: userId });
        this.modalService.show({
            type: 'ok',
            title: 'messageSentTitle',
            message: 'paymentReminderSent',
            onOk: (modalRef: BsModalRef) => {
                $control.ajax.state = 'idle';
                modalRef.hide();
            }
        });
    }

    sumRecords() {
        let sum = 0;
        for (const record of this.userRecordsData.records){
            sum += +record.amount;
        }
        return sum;
    }

    getStatusClass(amount) {
        if (amount === null) {
            return 'status-pending';
        } else if (+amount <= 0) {
            return 'transaction-payment';
        } else if (+amount > 0) {
            return 'transaction-charge';
        }
    }

    getSignClass(amount) {
        if (+amount > 0) {
            return 'text-danger';
        } else if (+amount < 0) {
            return 'text-success';
        }
    }

    parseAmount(amount) {
        if (isNaN(amount) || amount === null) {
            return 0;
        }
        return amount;
    }

    getDateAsString(dateObj) {
        let today = dateObj;
        if (today === null) {
            today = new Date();
        }
        // year
        let todayAsString = (today.getFullYear()) + '/';
        // let todayAsString = (today.getFullYear()) + '-'; // '-' doesn't work with Safari, needs '/'
        // month
        let temp = today.getMonth() + 1;
        if (temp < 10) {
            todayAsString += '0';
        }
        todayAsString += temp + '/';
        // todayAsString += temp + '-'; // '-' doesn't work with Safari, needs '/'
        // day
        temp = today.getDate();
        if (temp < 10) {
            todayAsString += '0';
        }
        todayAsString += temp;
        return todayAsString + ' ' + (today.getHours() < 10 ? '0' : '') + today.getHours() + ':' + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + '00';
    }

    getMonthDueAsString() {
        const monthsStr = [
            this.localization.s('ofJanuary'), this.localization.s('ofFebruary'), this.localization.s('ofMarch'), this.localization.s('ofApril'), this.localization.s('ofMay'), this.localization.s('ofJune'),
            this.localization.s('ofJuly'), this.localization.s('ofAugust'), this.localization.s('ofSeptember'), this.localization.s('ofOctober'), this.localization.s('ofNovember'), this.localization.s('ofDecember')
        ];
        const today = new Date();
        if (today.getDate() < 18) {
            return this.localization.s('the20th') + monthsStr[today.getMonth()];
        } else if (today.getDate() === 18) {
            return this.localization.s('dayAfterTomorrow20th') + monthsStr[today.getMonth()] + ')';
        } else if (today.getDate() === 19) {
            return this.localization.s('tomorrow20th') + monthsStr[today.getMonth()] + ')';
        } else if (today.getDate() === 20) {
            return this.localization.s('today20th') + monthsStr[today.getMonth()] + ')';
        } else {
            return this.localization.s('the20th') + monthsStr[today.getMonth() + 1];
        }
    }
}
