export class UserRecords {
    id: number;
    lastName: string;
    firstName: string;
    balance: number;
}

export class AccountTemplateItemInputModel {
    visible: boolean;
    title: string;
    accountTemplateItem: AccountTemplateItem;
}

export class AccountTemplatesData {
    accountTemplateItemCategories: AccountTemplateItemCategory[];
    accountTemplates: AccountTemplates[];
}

export class AccountTemplates {
    name: string;
    accountTemplateItems: AccountTemplateItem[]
}

export class AccountTemplateItem {
    id: number;
    name: string;
    category_id: string;
    amount: number;
}

export class AccountTemplateInputModel {
    visible: boolean;
    date: string;
    minDate: Date;
    maxDate: Date;
    previewVisible: boolean;
    title: string;
    accountTemplateName: AccountTemplateItem;
}

export class RecordInputModel {
    visible: boolean;
    title: string;
    record: Record;
}

export class UserRecordsData {
    userData: UserData;
    accountTemplateItemCategories: AccountTemplateItemCategory[];
    records: Record[];
}

export class UserData {
    id: number;
    firstName: string;
    lastName: string;
}

export class AccountTemplateItemCategory {
    id: number;
    name_gr: string;
    name_en: string;
}

export class Record {
    id: number;
    userId: number;
    amount: number;
    category_id: number;
    comment: string;
    date_time: string;

    constructor(
        date_time?: string
    )
}

export class CashierHomeData {
    ajaxSuccess: boolean;
    totalAmount: number;
    noRecordTemplates: number;
    noApplications: number;
    noDaysLeft: number;
    noPrograms: number;
    noStudents: number;
}