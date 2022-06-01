export class ChurchMinistryFormModel {
    public churchName: string;
    public churchMember: string;
    public churchMemberHowLong: string;
    public ministryTalent: string;
    public ministryExperience: string;
}

export class TestimonyFormModel {
    public testimony: string;
    public statementOfFaithApproval: boolean;
}

export class ChristianLifeFormModel {
    public churchMinistryFormModel: ChurchMinistryFormModel;
    public testimonyFormModel: TestimonyFormModel;
}
