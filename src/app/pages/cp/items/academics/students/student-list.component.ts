import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AjaxService } from '../../../../../services/ajax.service';
import { Program } from '../academics';
import { StudentProgress } from './student-progress';
import { StudentsService } from './students.service';

@Component({
    selector: 'app-academics-student-list',
    templateUrl: 'student-list.component.html'
})
export class StudentListComponent implements OnInit {
    students: StudentProgress[];
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
        this.fetchStudentProgramData();
    }

    async fetchStudentProgramData() {
        const db: any = await this.ajax.get(['getStudentsData', 'getProgramsData'], this.filter);
        this.students = db[0].data;
        this.programs = db[1].data;
    }

    onActiveProgramChange(programId) {
        this.filter.programId = programId;
        this.fetchStudentProgramData();
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

    deleteStudent(studentId) {
        this.studentsService.deleteStudent(studentId)
        .then(response => {
            if (response) {
                this.students = this.students.filter(student => {
                    return student.id !== studentId;
                });
            }
        });
    }
}
