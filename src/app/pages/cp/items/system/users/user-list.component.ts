import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../../../../../services/ajax.service';
import { FileSystemService } from '../../../../../services/file-system.service';
import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { ModalService } from '../../../../../ui/modal/modal.service';
import { UserService } from '../user.service';
import { ProgramData, RoleData, UserData } from '../users';

@Component({
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
    userAddVisible = false;
    userAddModel;
    users: UserData[] = [];
    roles: RoleData[] = [];
    programs: ProgramData[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        public fs: FileSystemService,
        private ajax: AjaxService,
        private modalService: ModalService
    ) { }

    resetUserAddModel() {
        this.userAddModel = { roleName: 'candidate' };
    }

    ngOnInit() {
        this.resetUserAddModel();
        this.userService.getUsers()
            .then((users: UserData[]) => {
                this.users = users;
            });
    }

    async userAddShow() {
        this.roles = await this.userService.getRoles() as RoleData[];
        this.userAddVisible = true;
    }

    onSubmit() {
        this.userAddVisible = false;
        this.userService.addUser(this.userAddModel)
            .then((user: UserData) => {
                this.resetUserAddModel();
                this.users.unshift(user);
            });
    }

    deleteUserPermanently(id) {
        this.userService.deleteUserPermanently(id)
        .then((response) => {
            if (response) {
                this.users = this.users.filter(user => {
                    return user.userId !== id;
                });
            }
        });
}

    viewUserFolderClicked(id) {
        this.router.navigate(['/cp/system/users/folder', id]);
    }

    async switchToUser(id) {
        const authToken = await this.userService.getAuthenticationToken(id);
        if (authToken) {
            document.cookie = 'PHPSESSID=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            localStorage.setItem('authenticationToken', authToken as string);
            window.location.href = location.href + '/../../home/?switchToUser=' + (new Date()).getTime();
        }
    }

    resetUserPasswordClick(id: number, $resetUserPasswordButton: ActionButtonComponent) {
        this.userService.resetUserPasswordInit(id)
            .then(() => {
                $resetUserPasswordButton.ajax.state = 'idle';
            });
    }

    async roleAddShow(user) {
        this.roles = await this.userService.getRoles() as RoleData[];
        user.roleAddVisible = true;
    }

    async addRoleToUser($control, user) {
        user.roleAddVisible = false;
        await this.ajax.get('addRoleToUser', { userId: user.userId, roleId: $control.value });
        this.roles.some((currentRole, i) => {
            if (currentRole.roleId === $control.value) {
                user.roles.push({
                    roleId: $control.value,
                    roleName: currentRole.roleName
                });
                return true;
            }
        });
    }

    async addProgramShow(role) {
        this.programs = (await this.ajax.get('getProgramsData')).data;
        role.addProgramVisible = true;
    }

    async addProgramForRole($control, user, role) {
        role.addProgramVisible = false;
        await this.ajax.get('addProgramForRole', { userId: user.userId, roleId: role.roleId, forProgramId: $control.value });
        this.programs.some((currentProgram, i) => {
            if (currentProgram.id === $control.value) {
                role.forProgramId = $control.value;
                role.program_name_gr = currentProgram.program_name_gr;
                role.program_name_en = currentProgram.program_name_en;
                return true;
            }
        });
    }

    async removeRoleFromUser(user, role) {
        this.modalService.show({
            type: 'yesNo',
            message: 'removeRoleFromUserConfirmation',
            onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                await this.ajax.get('removeRoleFromUser', { userId: user.userId, roleId: role.roleId, forProgramId: role.forProgramId });
                user.roles.some((currentRole, i) => {
                    if (currentRole === role) {
                        user.roles.splice(i, 1);
                        return true;
                    }
                });
                modalRef.hide();
            },
            onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                modalRef.hide();
            }
    });
}
}
