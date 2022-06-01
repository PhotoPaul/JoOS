export class IdInfoFormModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public birthPlace: string;
    public email: string;
    public phone: string;
    public occupation: string;
    public greekCitizen: boolean;
    public greekIdNumber: string;
    public greekSsn: string;
    public irsOffice: string;
    public citizenship: string;
    public euCitizen: boolean;
    public passportNumber: string;
    public residencePermit: string;
}

export class FamilyInfoFormModel {
    public familyStatus: string;
    public familySpouseFirstName: string;
    public familySpouseLastName: string;
    public familyKids: boolean;
    public familyKidsNamesAges: string;
}

export class AddressInfoFormModel {
    public address: string;
    public city: string;
    public zipCode: string;
    public country: string;
}

export class GuardianInfoFormModel {
    public guardianFirstName: string;
    public guardianLastName: string;
    public guardianOccupation: string;
    public guardianEmail: string;
    public guardianPhone: string;
    public guardianAddressSame: boolean;
    public guardianAddress: string;
    public guardianCity: string;
    public guardianZipCode: string;
    public guardianCountry: string;
    public guardianOpinion: string;
}

export class ApplicationFormModel {
    public idInfoFormModel: IdInfoFormModel;
    public familyInfoFormModel: FamilyInfoFormModel;
    public addressInfoFormModel: AddressInfoFormModel;
    public guardianInfoFormModel: GuardianInfoFormModel;
}