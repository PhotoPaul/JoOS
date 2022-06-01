import { CompleteApplication } from '../admission/admission';

export interface UserData {
    // [Basic]
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: RoleData[];
    date_time: string;
    photoURI: string;
    // [Additional]
    birthDate: string;
    phone: string;
    greekCitizen: boolean;
    greekIdNumber: string;
    greekSsn: string;
    irsOffice: string;
    citizenship: string;
    euCitizen: boolean;
    passportNumber: string;
    residencePermit: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    noUserApplications: number;
    noUserFiles: number;
}

export interface RoleData {
    roleId: number;
    roleName: string;
    forProgramId: number;
    title_en: string;
    title_gr: string;
    program_name_en: string;
    program_name_gr: string;
}

export interface ProgramData {
    id: number;
    program_name_en: string;
    program_name_gr: string;
}

export interface StudentFolderData {
    completeApplication: CompleteApplication;
}
