import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { ModalService } from '../../../../ui/modal/modal.service';
import { RoleData, UserData } from './users';

@Injectable()
export class UserService {
    constructor(
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    getUsers() {
        return new Promise(resolve => {
            this.ajax.get('getUsersData')
                .then((response: AjaxResponse) => {
                    resolve(response.data as UserData[]);
                });
        });
    }

    getRoles() {
        return new Promise(resolve => {
            this.ajax.get('getRoles')
                .then((response: AjaxResponse) => {
                    resolve(response.data as RoleData[]);
                });
        });
    }

    addUser(userAddModel) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('addUser', userAddModel)).data);
        });
    }

    deleteUserPermanently(id) {
        return new Promise(resolve => {
            this.modalService.show({
                type: 'yesNo',
                message: 'deleteUserPermanentlyConfirmation',
                onYes: (event, actionButtonClicked, actionButtons, modalRef) => {
                    this.ajax.get('deleteUserPermanently', { id: id })
                        .then((response: AjaxResponse) => {
                            modalRef.hide();
                            resolve(response.data);
                        });
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                    resolve(false);
                }
            });
        });
    }

    getUserData(id) {
        return new Promise(resolve => {
            this.ajax.get('getUserData', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data as UserData);
                });
        });
    }

    updateProfilePicture(filename) {
        return new Promise(resolve => {
            this.ajax.get('updateProfilePicture', {filename: filename})
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    getAuthenticationToken(id) {
        return new Promise(resolve => {
            this.ajax.get('getAuthenticationToken', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data.authentication_token);
                });
        });
    }

    resetUserPasswordInit(id) {
        return this.ajax.get('resetUserPasswordInit', {id: id});
    }

    importUserDataFromApplication(id) {
        return new Promise(resolve => {
            this.ajax.get('importUserDataFromApplication', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data as UserData);
                });
        });
    }

    saveUserProfileData(userProfile: UserData) {
        return new Promise(resolve => {
            this.ajax.get('saveUserProfileData', userProfile)
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    getUserFolder(id) {
        return new Promise(resolve => {
            this.ajax.get('getUserData', {id: id})
                .then((response: AjaxResponse) => {
                    const userFolder = {
                        userData: response.data
                    };
                    resolve(userFolder);
                });
        });
    }
}
