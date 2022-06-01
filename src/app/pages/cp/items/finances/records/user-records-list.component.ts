import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileSystemService } from '../../../../../services/file-system.service';
import { UserRecords } from '../finances';
import { FinancesService } from '../finances.service';

@Component({
    selector: 'app-finances',
    templateUrl: 'user-records-list.component.html'
})
export class UserRecordsListComponent implements OnInit {
    studentsFinances: UserRecords[];
    filter = { studentsOnly: true }

    constructor(private router: Router, public financesService: FinancesService, public fs: FileSystemService) { }

    async ngOnInit() {
        this.studentsFinances = await this.financesService.getUsersFinancesData(this.filter) as UserRecords[];
    }

    viewUserFolderClicked(id) {
        this.router.navigate(['/cp/system/users/folder', id]);
    }

    showRecordsClicked(id) {
        this.router.navigate(['/cp/finances/records/user', id]);
    }
}
