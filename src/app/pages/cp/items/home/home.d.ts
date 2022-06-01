export interface HomeData {
    myEvaluations?: any[];
    applications?: any[];
    programs?: any[];

    system?: boolean;
    systemOpenErrorsLength?: number;
    systemUsersLength?: number;
    systemOperationsLength?: number;
    systemFilesTotalSize?: number;
    systemTablesTotalSize?: number;
    systemTemplatesLength?: number;
    systemLogEntriesLength?: number;

    academics?: boolean;
    academicsTeachingScheduleDaysLeft: number;
    academicsChapelSchedule: string;
    academicsMyCoursesLength: number;
    academicsAdvisorsLength: number;
    academicsAdvisorId: number;
    academicsAdvisorLastName: string;
    academicsAdvisorFirstName: string;
    academicsAdvisorEmail: string;
    academicsAdvisorPhotoURI: string;
    academicsProgramsLength: number;
    academicsStudentsLength: number;
    academicsGraduatesLength: number;

    admissions?: boolean;
    admissionsApplicantsLength: number;
    admissionsApplicantsProcessedLength: number;

    finances?: boolean;
    financesMyDebt?: number;
    financesTotalAmount?: number;
    financesTemplatesLength?: number;

    evaluations?: boolean;
    evaluationsMyEvaluations?: number;
    evaluationsAllEvaluations?: number;

    library?: boolean;
    libraryMyCheckedOutBooks?: number;
    libraryMyCheckedOutBooksStatus?: number;
    libraryAllCheckedOutBooks?: number;
    libraryLibraryCards?: number;

    variables?: boolean;
    variablesLength?: number;
}
