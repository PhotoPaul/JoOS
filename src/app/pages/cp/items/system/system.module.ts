import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../../../../ui/ui.module';
import { DBManagerComponent } from './db-manager/db-manager.component';
import { ErrorsComponent } from './errors/errors.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LogsComponent } from './logs/logs.component';
import { NotificationTemplatesComponent } from './notification-templates/notification-templates.component';
import { OperationsManagerComponent } from './operations-manager/operations-manager.component';
import { SystemRoutingModule } from './system-routing.module';
import { UserFilesComponent } from './users/user-files.component';
import { UserFolderComponent } from './users/user-folder.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { VariablesComponent } from './variables/variables.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SystemRoutingModule,
        UIModule
    ],
    declarations: [
        UserListComponent,
        FileManagerComponent,
        UserFolderComponent,
        UserFilesComponent,
        UserProfileComponent,
        OperationsManagerComponent,
        LogsComponent,
        ErrorsComponent,
        NotificationTemplatesComponent,
        DBManagerComponent,
        VariablesComponent
    ]
})
export class SystemModule { }
