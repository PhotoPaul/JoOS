import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DBManagerComponent } from './db-manager/db-manager.component';
import { ErrorsComponent } from './errors/errors.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LogsComponent } from './logs/logs.component';
import { NotificationTemplatesComponent } from './notification-templates/notification-templates.component';
import { OperationsManagerComponent } from './operations-manager/operations-manager.component';
import { UserFilesComponent } from './users/user-files.component';
import { UserFolderComponent } from './users/user-folder.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { VariablesComponent } from './variables/variables.component';

const routes: Routes = [
    { path: 'users', data: { faIcon: 'fa-users', path_title_gr: 'Χρήστες', path_title_en: 'Users', roles: ['admin'] }, component: UserListComponent },
    { path: 'operations', data: { faIcon: 'fa-bolt', path_title_gr: 'Λειτουργίες', path_title_en: 'Operations', roles: ['admin'] }, component: OperationsManagerComponent },
    { path: 'files', data: { faIcon: 'fa-file', path_title_gr: 'Διαχειριστής Αρχείων', path_title_en: 'File Manager', roles: ['admin'] }, component: FileManagerComponent },
    { path: 'db', data: { faIcon: 'fa-database', path_title_gr: 'Βάση Δεδομένων', path_title_en: 'Database Manager', roles: ['admin'] }, component: DBManagerComponent },
    { path: 'notification-templates', data: { faIcon: 'fa-tags', path_title_gr: 'Πρότυπα Ειδοποιήσεων', path_title_en: 'Notification Templates', roles: ['admin'] }, component: NotificationTemplatesComponent },
    { path: 'users/folder/:id', data: { faIcon: 'fa-folder-open', path_title_gr: 'Φάκελος Χρήστη', path_title_en: 'User Folder', noNav: true }, component: UserFolderComponent },
    { path: 'users/files/:id', data: { faIcon: 'fa-file', path_title_gr: 'Αρχεία Χρήστη', path_title_en: 'User Files', noNav: true }, component: UserFilesComponent },
    { path: 'users/profile/:id', data: { faIcon: 'fa-user', path_title_gr: 'Προφίλ Χρήστη', path_title_en: 'User Profile', noNav: true }, component: UserProfileComponent },
    { path: 'logs', data: { faIcon: 'fa-history', path_title_gr: 'Ιστορικό', path_title_en: 'Logs', roles: ['admin'] }, component: LogsComponent },
    { path: 'errors', data: { faIcon: 'fa-exclamation-triangle', path_title_gr: 'Σφάλματα', path_title_en: 'Errors', roles: ['admin'] }, component: ErrorsComponent },
    { path: 'variables', data: { faIcon: 'fa-cog', path_title_gr: 'Μεταβλητές Συστήματος', path_title_en: 'System Variables', roles: ['admin'] }, component: VariablesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule { }
