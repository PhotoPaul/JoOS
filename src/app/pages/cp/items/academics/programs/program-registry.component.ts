import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AjaxService } from '../../../../../services/ajax.service';
import { Program, ProgramEnrollmentItem } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: 'program-registry.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramRegistryComponent implements OnInit {
    programId: number;
    program: Program;
    professorInputVisible = false;
    professorModel: ProfessorModel;

    constructor(
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef,
        private academicsService: AcademicsService,
        private ajax: AjaxService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            this.programId = params['id'];
            this.program = await this.academicsService.getProgramEnrollmentData(this.programId) as Program;
            this.changeDetectorRef.detectChanges();
        });
    }

    isProfessor(programEnrollmentItem: ProgramEnrollmentItem) {
        return programEnrollmentItem.isProfessor;
    }

    isUserActive(programEnrollmentItem: ProgramEnrollmentItem) {
        if (+programEnrollmentItem.active) {
            return true;
        } else {
            return false;
        }
    }

    async enrollClicked(programEnrollmentItem: ProgramEnrollmentItem) {
        const response = await this.academicsService.enrollUserToProgram(this.program.id, programEnrollmentItem.userId, programEnrollmentItem.programEnrollmentId);
        for (const property in response as any) {
            if (response.hasOwnProperty(property)) {
                programEnrollmentItem[property] = response[property];
            }
        }
        this.changeDetectorRef.detectChanges();
    }

    async unenrollClicked(programEnrollmentItem: ProgramEnrollmentItem) {
        await this.academicsService.unenrollUserFromProgram(programEnrollmentItem.programEnrollmentId);
        programEnrollmentItem.active = null;
        this.changeDetectorRef.detectChanges();
    }

    async eraseClicked(programEnrollmentItem: ProgramEnrollmentItem) {
        await this.academicsService.eraseUserFromProgram(programEnrollmentItem.programEnrollmentId);
        programEnrollmentItem.programEnrollmentId = null;
        programEnrollmentItem.active = null;
        programEnrollmentItem.dateTime = null;
        this.changeDetectorRef.detectChanges();
    }

    professorInputShow() {
        this.professorModel = new ProfessorModel();
        this.professorInputVisible = true;
    }

    async professorInputOnSubmit() {
        const addUserResponse = await this.ajax.get('addUser', this.professorModel);
        if (addUserResponse.success) {
            addUserResponse.data.dateTime = addUserResponse.data.date_time;
            addUserResponse.data.isProfessor = true;
            this.program.programEnrollment.unshift(addUserResponse.data);
            this.professorInputVisible = false;
            this.changeDetectorRef.detectChanges();
        }
    }
}

class ProfessorModel {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    roleName: string;
    language: string;

    constructor() {
        this.roleId = 7;
        this.roleName = 'professor';
    }
}
