import { Component, OnInit } from '@angular/core';

import { ScheduleMakerService, ScheduleRule } from '../schedule-maker.service';

@Component({
  selector: 'rule-manager',
  templateUrl: './rule-manager.component.html'
})
export class RuleManagerComponent implements OnInit {

    constructor(public smService: ScheduleMakerService) { }

    ngOnInit() { }

    saveRuleName(text) {
        alert(text);
    }

    saveProgram($event, rule) {
        this.smService.model.programs.some(program => {
            if (program.id === rule.programId) {
                rule.programNameGr = program.nameGr;
                rule.programNameEn = program.nameEn;
                return true;
            }
        });
    }

    saveCourse($event, rule) {
        this.smService.model.courses.some(course => {
            if (course.id === rule.courseId) {
                rule.courseId = course.id;
                rule.courseCodeGr = course.codeGr;
                rule.courseCodeEn = course.codeEn;
                rule.courseNameGr = course.nameGr;
                rule.courseNameEn = course.nameEn;
                return true;
            }
        });
    }

    saveProfessor($event, rule) {
        this.smService.model.professors.some(professor => {
            if (professor.id === rule.professorId) {
                rule.professorId = professor.id;
                rule.fullName = professor.fullName;
                return true;
            }
        });
    }

    saveAvailability($event, rule: ScheduleRule) {
        rule.available = !!$event;
    }
}
