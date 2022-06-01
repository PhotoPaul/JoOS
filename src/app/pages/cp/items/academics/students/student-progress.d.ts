export class StudentProgress {
    id: number;
    firstName: string;
    lastName: string;
    programs: StudentProgressProgram[];
}

export class StudentProgressProgram {
    id: number;
    program_name_gr: string;
    program_name_en: string;
    number_of_semesters: number;
    active: boolean;
    graduated: boolean;
    pdfUrl: string;
    progress: StudentProgressItem[];
}

export class StudentProgressItem {
    id: number;
    field_name: string;
    field_description_gr: string;
    field_description_en: string;
    required: boolean;
    requires_document: boolean;
    for_semester: number;
    progress_item_id: number;
    document_id: number;
    completed: boolean | string;
    date_time: string;
    lastName: string;
    firstName: string;
}