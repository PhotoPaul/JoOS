import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../../../services/ajax.service';
import { FinancesService } from '../finances/finances.service';
import {
    AdviseesData,
    AttendanceByCourseIdData,
    ChapelScheduleFilter,
    ChapelScheduleItem,
    Course,
    CourseEnrollmentItem,
    CourseFraction,
    Program,
    TeachingScheduleFilter,
    TeachingScheduleItem,
} from './academics';

@Injectable()
export class AcademicsService {
    private _programs: Program[] | boolean;

    constructor(
        private ajax: AjaxService,
        private financesService: FinancesService
    ) { }

    get programs() {
        if (!this._programs) {
            this.ajax.get('getProgramsData')
            .then((response: AjaxResponse) => {
                this._programs = response.data;
                return this._programs;
            });
            this._programs = true;
        } else if (Array.isArray(this._programs)) {
            return this._programs;
        }
        return [];
    }

    getProgramsData() {
        return new Promise((resolve) => {
            this.ajax.get('getProgramsData')
                .then((response: AjaxResponse) => {
                    resolve(response.data as Program[]);
                });
        });
    }

    getProgramEnrollmentData(id) {
        return new Promise((resolve) => {
            this.ajax.get('getProgramEnrollmentData', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(response.data as Program);
                });
        });
    }

    enrollUserToProgram(programId, studentId, programEnrollmentId) {
        return new Promise((resolve) => {
            this.ajax.get('enrollUserToProgram', {programId: programId, studentId: studentId, programEnrollmentId: programEnrollmentId})
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    unenrollUserFromProgram(programEnrollmentId) {
        return new Promise((resolve) => {
            this.ajax.get('unenrollUserFromProgram', {programEnrollmentId: programEnrollmentId})
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    eraseUserFromProgram(programEnrollmentId) {
        return new Promise((resolve) => {
            this.ajax.get('eraseUserFromProgram', {programEnrollmentId: programEnrollmentId})
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    getCoursesData(filter: any) {
        return new Promise(async (resolve) => {
            const response: AjaxResponse = await this.ajax.get('getCoursesData', { filter: filter });
            resolve(response.data);
        });
    }

    moodleGetCourseCategories() {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('moodleGetCourseCategories') as AjaxResponse).data);
        });
    }

    processEnrollmentData(course: Course) {
        let courseFractionsIndex: number;
        for (let i = 0; i < course.enrollmentData.length; i++) {
            if (course.enrollmentData[i].isProfessor) {
                const fractions = [];
                courseFractionsIndex = 0;
                while (courseFractionsIndex < course.fractions.length) {
                    let existingFraction: CourseFraction | boolean = false;
                    for (const fraction of course.enrollmentData[i].fractions) {
                        if (fraction.fractionId === course.fractions[courseFractionsIndex].fractionId) {
                            existingFraction = fraction;
                            break;
                        }
                    }
                    fractions.push(existingFraction ? existingFraction :
                        {
                            fractionEnrollmentId: course.fractions[courseFractionsIndex].fractionEnrollmentId,
                            fractionId: course.fractions[courseFractionsIndex].fractionId,
                            fractionLabel: course.fractions[courseFractionsIndex].fractionLabel,
                            fractionActive: course.fractions[courseFractionsIndex].fractionActive,
                            fractionDateTime: course.fractions[courseFractionsIndex].fractionDateTime
                        }
                    );
                    courseFractionsIndex++;
                }
                course.enrollmentData[i].fractions = fractions;
            }
        }
        return course;
    }


    getCourseEnrollmentData(id) {
        return new Promise((resolve) => {
            this.ajax.get('getCourseEnrollmentData', {id: id})
                .then((response: AjaxResponse) => {
                    resolve(this.processEnrollmentData(response.data));
                });
        });
    }

    enrollUserToCourse(courseId: number, userId: number, fractionEnrollmentId?: number, fractionId?: number) {
        return new Promise((resolve) => {
            this.ajax.get('enrollUserToCourse', {
                courseId: courseId,
                studentId: userId,
                fractionEnrollmentId: fractionEnrollmentId,
                fractionId: fractionId
            })
                .then((response: AjaxResponse) => {
                    resolve(response.data as CourseEnrollmentItem);
                });
        });
    }

    unenrollUserFromCourse(fractionEnrollmentId) {
        return new Promise((resolve) => {
            this.ajax.get('unenrollUserFromCourse', { fractionEnrollmentId: fractionEnrollmentId })
                .then((response: AjaxResponse) => {
                    resolve(response.data as Course);
                });
        });
    }

    updateStudentGradeForCourse(courseEnrollmentId: number, grade: number, gradeSemester: string | number, gradeYear: number) {
        return new Promise((resolve) => {
            this.ajax.get('updateStudentGradeForCourse', {
                courseEnrollmentId: courseEnrollmentId,
                grade: grade,
                gradeSemester: gradeSemester,
                gradeYear: gradeYear
            })
                .then((response: AjaxResponse) => {
                    resolve(response.data as Course);
                });
        });
    }

    getAttendanceByCourseIdData(courseId) {
        return new Promise((resolve) => {
            this.ajax.get('getAttendanceByCourseIdData', {courseId: courseId})
                .then((response: AjaxResponse) => {
                    resolve(response.data as AttendanceByCourseIdData);
                });
        });
    }

    updateAttendance(attendanceItemId, studentId, courseId, period, attendance, dateTime) {
        return new Promise((resolve) => {
            this.ajax.get('updateAttendance', {
                attendanceItemId: attendanceItemId,
                studentId: studentId,
                courseId: courseId,
                period: period,
                attendance: attendance,
                dateTime: dateTime
            })
                .then((response: AjaxResponse) => {
                    resolve(response.data as AttendanceByCourseIdData);
                });
        });
    }

    getAdviseesData() {
        return new Promise((resolve) => {
            this.ajax.get('getAdviseesData')
                .then((response: AjaxResponse) => {
                    resolve(response.data as AdviseesData);
                });
        });
    }

    getMyCoursesData() {
        return new Promise((resolve) => {
            this.ajax.get('getMyCoursesData')
                .then((response: AjaxResponse) => {
                    resolve(response.data as Course);
                });
        });
    }

    getCoursesForStudent(id) {
        return new Promise((resolve) => {
            this.ajax.get('getCoursesForStudent', { id: id })
                .then((response: AjaxResponse) => {
                    resolve(response.data as Course[]);
                });
        });
    }

    getChapelSchedule(filter?: ChapelScheduleFilter) {
        filter.startOnAsString = this.financesService.getDateAsString(filter.startOn);
        return new Promise((resolve) => {
            this.ajax.get('getChapelSchedule', { filter: filter })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    deleteChapelScheduleItem(id, filter: ChapelScheduleFilter) {
        return new Promise((resolve) => {
            this.ajax.get('deleteChapelScheduleItem', { id: id, filter: filter })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    saveChapelScheduleItem(scheduleItemInputModel: ChapelScheduleItem, chapelScheduleFilter: ChapelScheduleFilter) {
        return new Promise((resolve) => {
            this.ajax.get('saveChapelScheduleItem', { scheduleItemInputModel: scheduleItemInputModel, filter: chapelScheduleFilter })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    processTeachingSchedule(data) {
        data.programs.forEach(program => {
            data.courses.forEach(course => {
                if (program.id === course.program_id) {
                    if (!Array.isArray(program.courses)) {
                        program.courses = [];
                    }
                    program.courses.push(course);
                }
            });
        });
        delete data.courses;
        data.scheduleItems.forEach((item: TeachingScheduleItem) => {
            item.course = item.courseId + (item.fractionId ? '|' + item.fractionId : '');
        });
        return data;
    }

    getTeachingSchedule(filter?: TeachingScheduleFilter) {
        filter.startOnAsString = this.financesService.getDateAsString(filter.startOn);
        return new Promise((resolve) => {
            this.ajax.get('getTeachingSchedule', { filter: filter })
                .then((response: AjaxResponse) => {
                    resolve(this.processTeachingSchedule(response.data));
                });
        });
    }

    deleteTeachingScheduleItem(id, teachingScheduleFilter: TeachingScheduleFilter) {
        return new Promise((resolve) => {
            this.ajax.get('deleteTeachingScheduleItem', { id: id, filter: teachingScheduleFilter })
                .then((response: AjaxResponse) => {
                    resolve(this.processTeachingSchedule(response.data));
                });
        });
    }

    saveTeachingScheduleItem(scheduleItemInputModel: TeachingScheduleItem, teachingScheduleFilter: TeachingScheduleFilter) {
        return new Promise((resolve) => {
            this.ajax.get('saveTeachingScheduleItem', { scheduleItemInputModel: scheduleItemInputModel, filter: teachingScheduleFilter })
                .then((response: AjaxResponse) => {
                    resolve(this.processTeachingSchedule(response.data));
                });
        });
    }

    saveCourse(course) {
        return new Promise((resolve) => {
            this.ajax.get('saveCourse', { course: course })
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }

    saveCourseFraction(fractionModel: CourseFraction) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('saveCourseFraction', { fractionModel: fractionModel }) as AjaxResponse).data);
        });
    }

    deleteCourseFraction(id: number) {
        return new Promise(async resolve => {
            resolve((await this.ajax.get('deleteCourseFraction', { id: id }) as AjaxResponse).data);
        });
    }

    generateEmptySchedule(_startingDate, noWeeks) {
        const startingDate = new Date(_startingDate.getTime());
        const emptySchedule = [];
        for (let i = 0; i < 7 * noWeeks; i++) {
            emptySchedule.push({
                dateObj: new Date(startingDate.getTime()),
                items: []
            });
            startingDate.setDate(startingDate.getDate() + 1);
        }
        return emptySchedule;
    }

    async sendEvaluationForms(courseId: number, userId: number) {
        await this.ajax.get('sendEvaluationForms', {
            courseId: courseId,
            userId: userId
        });
    }
}
