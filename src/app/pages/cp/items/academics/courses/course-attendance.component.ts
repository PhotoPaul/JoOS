import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionButtonComponent } from '../../../../../ui/action-button/action-button.component';
import { AttendanceByCourseIdData, AttendanceItem } from '../academics';
import { AcademicsService } from '../academics.service';

@Component({
    templateUrl: 'course-attendance.component.html'
})
export class CourseAttendanceComponent implements OnInit {
    courseAttendance: AttendanceByCourseIdData = {attendances: []} as AttendanceByCourseIdData;
    constructor(private route: ActivatedRoute, private academicsService: AcademicsService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.academicsService.getAttendanceByCourseIdData(id)
                .then((attendance: AttendanceByCourseIdData) => {
                    this.courseAttendance = attendance;
                });
        });
    }

    getAttendanceStatusColor(attendance) {
        if (attendance === null || attendance === 0) {
            return 'red';
        } else if (attendance === 1) {
            return 'green';
        } else {
            return 'orange';
        }
    }

    getAttendanceStatusTooltip(attendance) {
        if (attendance === null) {
            return 'Απουσία (μη-Βεβαιωμένη)';
        } else if (attendance === 0) {
            return 'Απουσία';
        } else if (attendance === 1) {
            return 'Παρουσία';
        } else {
            return 'Καθυστέρηση';
        }
    }

    attendanceStatusClicked(actionButtonComponent: ActionButtonComponent, attendanceItem: AttendanceItem, period: number) {
        let periodStr;
        period === 1 ?
            periodStr = 'attendance_first' :
            period === 2 ?
                periodStr = 'attendance_second' :
                period === 3 ?
                    periodStr = 'attendance_third' :
                    period === 4 ?
                        periodStr = 'attendance_fourth' :
                        periodStr = '';
        let attendance = attendanceItem[periodStr];
        if (attendanceItem[periodStr] >= 1) {
            attendance = -1;
        } else {
            attendance++;
        }

        this.academicsService.updateAttendance(
            attendanceItem.id,
            attendanceItem.student_id,
            this.courseAttendance.id,
            period,
            attendance,
            attendanceItem.date_time
        ).then((response: any) => {
            if (response.statement === 'INSERT') {
                attendanceItem.id = response.attendanceItem.id;
            }
            attendanceItem[periodStr] = response.attendanceItem[periodStr];
            actionButtonComponent.ajax.state = 'idle';
        });
    }
}
