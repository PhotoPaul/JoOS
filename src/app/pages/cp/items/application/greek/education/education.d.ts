export class PrimarySecondaryFormModel {
    public elementaryName: string;
    public elementaryGraduationYear: string;
    public middleSchoolName: string;
    public middleSchoolGraduationYear: string;
    public secondarySchoolName: string;
    public secondarySchoolGraduationYear: string;
    public secondarySchoolDiscipline: string;
}

export class LanguagesFormModel {
    public greek: number;
    public english: number;
}

export class HigherFormModel {
    public communityCollegeName: string;
    public communityCollegeGraduationYear: string;
    public communityCollegeDiscipline: string;
    public collegeName: string;
    public collegeGraduationYear: string;
    public collegeDiscipline: string;
    public graduateSchoolName: string;
    public graduateSchoolGraduationYear: string;
    public graduateSchoolDiscipline: string;
}

export class EducationFormModel {
    public primarySecondaryFormModel: PrimarySecondaryFormModel;
    public languagesFormModel: LanguagesFormModel;
    public higherFormModel: HigherFormModel;
}
