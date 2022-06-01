import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../../services/ajax.service';

@Injectable()
export class ScheduleMakerService {
    model = new ScheduleMakerModel();

    constructor(private ajax: AjaxService) { }

    initScheduleMakerService() {
        this.ajax.get(['getSchedulePrograms', 'getScheduleCourses', 'getScheduleProfessors', 'getScheduleRules'])
        .then((response: AjaxResponse) => {
            response[0].data.forEach((program) => {
                program.id = +program.id;
            });
            response[1].data.forEach((course) => {
                course.id = +course.id;
                course.fullNameGr = course.codeGr + ': ' + course.nameGr;
                course.fullNameEn = course.codeEn + ': ' + course.nameEn;
            });
            response[2].data.forEach((professor) => {
                professor.id = +professor.id;
            });
            response[3].data.forEach((rule) => {
                rule.id = +rule.id;
                rule.programId = +rule.programId;
                rule.courseId = +rule.courseId;
                rule.professorId = +rule.professorId;
                rule.available = +rule.available;
                rule.startDateString = rule.startDate;
                rule.startDate = new Date(rule.startDateString);
                rule.endDateString = rule.endDate;
                rule.endDate = new Date(rule.endDateString);
            });
            this.model.programs = response[0].data;
            this.model.courses = response[1].data;
            this.model.professors = response[2].data;
            this.model.rules = response[3].data;
        });
    }
}

export class ScheduleProgram {
    id: number;
    nameGr: string;
    nameEn: string;
}

export class ScheduleCourse {
    id: number;
    codeGr: string;
    codeEn: string;
    nameGr: string;
    nameEn: string;
    fullCodeGr: string;
    fullNameEn: string;
}

export class ScheduleProfessor {
    id: number;
    fullName: string;
}

export class ScheduleRule {
    id: number;
    name: string;
    programId: number;
    programNameGr: string;
    programNameEn: string;
    courseId: number;
    courseCodeGr: string;
    courseCodeEn: string;
    courseNameGr: string;
    courseNameEn: string;
    professorId: number;
    fullName: string;
    available: boolean;
    startDateString: string;
    startDate: Date;
    endDateString: string;
    endDate: Date;
}

export class ScheduleMakerModel {
    programs: ScheduleProgram[];
    courses: ScheduleCourse[];
    professors: ScheduleProfessor[];
    rules: ScheduleRule[];

    constructor() {
        this.programs = [];
        this.courses = [];
        this.professors = [];
        this.rules = [];
    }
}
