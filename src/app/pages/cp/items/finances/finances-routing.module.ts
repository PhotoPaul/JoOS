import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRecordsListComponent } from './records/user-records-list.component';
import { UserRecordsComponent } from './records/user-records.component';
import { AccountTemplatesComponent } from './templates/account-templates.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', data: { noNav: true }, redirectTo: 'records' },
    { path: 'my-records', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμός', path_title_en: 'Records', roles: ['student'] }, component: UserRecordsComponent },
    { path: 'records', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμοί', path_title_en: 'Records', roles: ['admin', 'cashier', 'registrar'] }, component: UserRecordsListComponent },
    { path: 'records/user/:id', data: { faIcon: 'fa-euro-sign', path_title_gr: 'Λογαριασμός Φοιτητή', path_title_en: 'Student Records', noNav: true }, component: UserRecordsComponent },
    { path: 'templates', data: { faIcon: 'fa-tags', path_title_gr: 'Πρότυπα Λογαριασμών', path_title_en: 'Account Templates', roles: ['admin', 'cashier'] }, component: AccountTemplatesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FinancesRoutingModule { }
