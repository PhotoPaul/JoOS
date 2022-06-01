export class Program {
    id: number;
    program_name_gr: string;
    program_name_en: string;
    number_of_semesters: number;
    no_enrolled_students: number;
    graduated_students: number;
    active_students: number;
    courses?: Course[];
    programEnrollment: ProgramEnrollmentItem[];
}

export interface Course {
    id: number;
    course_id: number;
    program_id?: number;
    category_id?: number;
    code?: string;
    code_gr: string;
    code_en: string;
    name?: string;
    name_gr: string;
    name_en: string;
    credits: number;
    ects_credits: string;
    year: number;
    semester: number;
    offered_gr: string;
    offered_en: string;
    no_enrolled_students: number;
    active: boolean;
    prerequisiteCourseId: number;
    prerequisiteCourseCodeGr: string;
    prerequisiteCourseCodeEn: string;
    prerequisiteCourseCode: string;
    prerequisiteCourseNameGr: string;
    prerequisiteCourseNameEn: string;
    prerequisiteCourseActive: string;
    prerequisite_courses: Object[];
    requirement_id: number;
    fractionId?: string;    // Used by course-list and should be removed
    fractionLabel?: string; // Used by course-list and should be removed
    fractions?: CourseFraction[];
    preriquisites?: CoursePrerequisite[];
    enrollmentData?: CourseEnrollmentItem[];
}

export interface CourseFraction {
    fractionCourseId?: number;
    fractionId?: number;
    fractionLabel?: string;
    // Wrongly used properties that should be removed
    id?: string;
    label?: string;
    courseId?: number;
    courseEnrollmentFractionId?: string;
    courseEnrollmentFractionLabel?: string;
}

export interface CoursePrerequisite {
    prerequisiteCourseId: string;
    prerequisiteCourseCode_gr: string;
    prerequisiteCourseCode_en: string;
    prerequisiteCourseCode: string;
    prerequisiteCourseName_en: string;
    prerequisiteCourseName_gr: string;
    prerequisiteCourseActive: string;
}

export class ProgramEnrollmentItem {
    programEnrollmentId: number;
    userId: number;
    firstName: string;
    lastName: string;
    roles: string[];
    dateTime: string;
    active: boolean;
    isProfessor: boolean;
}

export class CourseEnrollmentItem {
    courseEnrollmentId: number;
    courseEnrollmentCourseId: number;
    courseEnrollmentFractionId: number;
    fractions?: CourseFraction[];
    userId: number;
    roles: string[];
    firstName: string;
    lastName: string;
    courseEnrollmentDateTime: string;
    courseEnrollmentActive: boolean;
    courseEnrollmentGrade: number;
    courseEnrollmentGradeSemester: number | string;
    courseEnrollmentGradeYear: number;
    gradeInputEnabled?: boolean;
    actionButtons?: any;
    isProfessor?: boolean;
    isEnrolled?: boolean;
    isEnrollmentActive?: boolean;
}

export interface CourseFraction {
    fractionEnrollmentId?: number;
    fractionId?: number;
    fractionLabel?: string;
    fractionActive?: boolean;
    fractionDateTime?: string;
}

export interface AdviseesData {
    myAdvisees: Advisee[];
}

export interface Advisee {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    photoURI: string;
}

export class MyCoursesData {
    course_id: number;
    code_gr: string;
    code_en: string;
    code: string;
    name_gr: string;
    name_en: string;
    no_enrolled_students: number;
    moodle_id: string;
    moodle_category_id: string;
    active: number;
    grade: number;
}

export class TeachingScheduleDay {
    dateObj: Date;
    items: TeachingScheduleItem[]
}

export class TeachingScheduleFilter {
    startOn?: Date;
    startOnAsString?: string;
    myCoursesOnly?: boolean;
    userId?: number;
    programId?: number;
    noWeeks?: number;
    year?: number;
}

export class TeachingScheduleItem {
    id: number;
    dateTime: string;
    courseId: number;
    fractionId: number;
    course: string;
    code_gr: string;
    code_en: string;
    name_gr: string;
    name_en: string;
}

export class ChapelScheduleFilter {
    startOn?: Date;
    startOnAsString?: string;
    myCoursesOnly?: boolean;
    userId?: number;
    programId?: number;
    noWeeks?: number;
    year?: number;
}

export class ChapelScheduleItem {
    id: number;
    dateTime: string;
    type: number;
    description: string;
}

export class AttendanceByCourseIdData {
    id: number;
    code_gr: string;
    name_gr: string;
    code_en: string;
    name_en: string;
    attendances: AttendanceItem[][];
}

export class AttendanceItem {
    id: number;
    student_id: number;
    course_id: number;
    attendance_first: number;
    attendance_second: number;
    attendance_third: number;
    attendance_fourth: number;
    date_time: string;
    actionButtons?: any;
}