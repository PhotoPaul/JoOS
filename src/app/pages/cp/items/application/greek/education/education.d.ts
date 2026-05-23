export class PrimarySecondaryFormModel {
    public elementaryName: string;
    public elementaryGraduationYear: string;
    public middleSchoolName: string;
    public middleSchoolGraduationYear: string;
    public secondarySchoolName: string;
    public secondarySchoolGraduationYear: string;
    public secondarySchoolDiscipline: string;
}

export class ComputerUseFormModel {
    public computerFluency: number;
    public computerAccess: number;
    public internetAccess: number;
    public wordProcessingFluency: number;
    public presentationFluency: number;
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
    public computerUseFormModel: ComputerUseFormModel;
    public languagesFormModel: LanguagesFormModel;
    public higherFormModel: HigherFormModel;
}
