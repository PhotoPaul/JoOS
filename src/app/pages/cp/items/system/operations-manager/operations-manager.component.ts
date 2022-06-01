import { Component, OnInit } from '@angular/core';

import { AjaxService } from '../../../../../services/ajax.service';
import { ModalService } from '../../../../../ui/modal/modal.service';

@Component({
    templateUrl: 'operations-manager.component.html'
})
export class OperationsManagerComponent implements OnInit {
    public operationInputVisible: boolean;
    public operationName: string;
    public operations;
    public roles;

    constructor(private ajax: AjaxService, private modalService: ModalService) { }

    async ngOnInit() {
        const operationsRoles = await this.ajax.get(['getOperations', 'getRoles']);
        this.operations = operationsRoles[0].data;
        this.roles = operationsRoles[1].data;
    }

    async onOperationInputSubmit() {
        const addOperationResult = (await this.ajax.get('addOperation', { operationName: this.operationName })).data;
        if (addOperationResult) {
            this.operations.unshift({operation: this.operationName, roles: ['none']});
            this.operationInputVisible = false;
        }
    }

    addOperationClicked() {
        this.operationName = '';
        this.operationInputVisible = true;
    }

    filterCurrent(currentRoles) {
        return this.roles.filter(i => {
            return currentRoles.indexOf(i.name) < 0;
        });
    }

    getRoleColor(role) {
        if (role === 'admin') {
            return 'dark-blue';
        } else if (role === 'any') {
            return 'green';
        } else if (role === 'none') {
            return 'red';
        } else {
            return 'blue';
        }
    }

    async addRole($control, operation) {
        operation.addRoleVisible = false;
        await this.ajax.get('addRole', { operation: operation.operation, role: $control.value });
        if ($control.value === 'any' || (operation.roles.length && operation.roles[0] === 'none')) {
            operation.roles = [];
        }
        operation.roles.push($control.value);
    }

    async removeRole(operation, role) {
        this.modalService.show({
                type: 'yesNo',
                message: 'removeRoleConfirmation',
                onYes: async (event, actionButtonClicked, actionButtons, modalRef) => {
                    await this.ajax.get('removeRole', { operation: operation.operation, role: role });
                    operation.roles.some((currentRole, i) => {
                        if (currentRole === role) {
                            operation.roles.splice(i, 1);
                            return true;
                        }
                    });
                    if (!operation.roles.length) {
                        operation.roles.push('none');
                    }
                    modalRef.hide();
                },
                onNo: (event, actionButtonClicked, actionButtons, modalRef) => {
                    modalRef.hide();
                }
        });
    }
}
