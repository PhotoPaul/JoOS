import { Component, OnInit } from '@angular/core';

import { LocalizationService } from '../../../../../localization/localization.service';
import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

interface DPOStudent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateTime: string;
    hasSigned: boolean;
    registrationStatus: string;
    roles: Array<{
        roleId: number;
        role_gr: string;
        role_en: string;
    }>;
    programs: Array<{
        programId: number;
        program_name_gr: string;
        program_name_en: string;
    }>;
}

interface DPOReportData {
    signed: DPOStudent[];
    notSigned: DPOStudent[];
    totalStudents: number;
    totalSigned: number;
    totalNotSigned: number;
}

@Component({
    templateUrl: 'dpo-report.component.html'
})
export class DPOReportComponent implements OnInit {
    reportData: DPOReportData = null;
    loading: boolean = true;

    constructor(
        private ajax: AjaxService,
        public localization: LocalizationService
    ) { }

    ngOnInit() {
        this.fetchReport();
    }

    fetchReport() {
        this.loading = true;
        this.ajax.get('getDPOReport')
            .then((response: AjaxResponse) => {
                this.reportData = response.data as DPOReportData;
                this.loading = false;
            })
            .catch(() => {
                this.loading = false;
            });
    }
}

