import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../../../../../services/ajax.service';
import { Program } from '../academics';
import { StudentProgress } from './student-progress';
import { StudentsService } from './students.service';

@Component({
    selector: 'app-academics-graduate-list',
    templateUrl: 'graduate-list.component.html'
})
export class GraduateListComponent implements OnInit {
    graduates: StudentProgress[];
    programs: Program[];
    filter = {} as {
        programId: string;
    };

    constructor(
        private router: Router,
        private studentsService: StudentsService,
        private ajax: AjaxService
    ) { }

    ngOnInit() {
        this.fetchGraduateProgramData();
    }

    async fetchGraduateProgramData() {
        const db: any = await this.ajax.get(['getGraduatesData', 'getProgramsData'], this.filter);
        this.graduates = db[0].data;
        this.programs = db[1].data;
    }

    onActiveProgramChange(programId) {
        this.filter.programId = programId;
        this.fetchGraduateProgramData();
    }

    studentCoursesClicked(id) {
        this.router.navigate(['/cp/academics/students/courses', id]);
    }

    viewUserFolderClicked(id) {
        this.router.navigate(['/cp/system/users/folder', id]);
    }

    profileClicked(id) {
        this.router.navigate(['/cp/system/users/profile', id]);
    }

    progressClicked(id) {
        this.router.navigate(['/cp/academics/students/progress', id]);
    }

    viewTranscriptClicked(pdfUrl, $viewTranscriptButton) {
        window.open(pdfUrl);
        $viewTranscriptButton.ajax.state = 'idle';
    }

    demoteGraduate(studentId) {
        this.studentsService.demoteGraduate(studentId)
        .then(response => {
            if (response) {
                this.graduates = this.graduates.filter(student => {
                    return student.id !== studentId;
                });
            }
        });
    }
}

