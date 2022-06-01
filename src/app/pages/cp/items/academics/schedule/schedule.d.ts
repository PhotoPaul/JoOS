export class ScheduleDay {
    dateObj: Date;
    items: ScheduleItem[]

}

export class ScheduleItem {
    id: number;
    dateTime: string;
    categoryDescription: string;
    description: string;
    // courseId?: number;
    // fractionId?: number;
    // course?: string;
    // code_gr?: string;
    // code_en?: string;
    // name_gr?: string;
    // name_en?: string;
}
