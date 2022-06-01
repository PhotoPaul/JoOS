export class HealthHistoryModel {
    public tonsillitis: string;
    public chickenPox: string;
    public bronchialAsthma: string;
    public diphtheria: string;
    public epilepsy: string;
    public rubella: string;
    public measles: string;
    public yellowFever: string;
    public meningitis: string;
    public mumps: string;
    public polio: string;
    public cholera: string;
    public heartAbnormality: string;
    public otherDiseases: boolean;
    public otherDiseasesDetails: string;
    public vaccineDiphtheria: string;
    public vaccinePertussis: string;
    public vaccineTetanus: string;
    public vaccineSmallpox: string;
    public vaccineRubella: string;
    public vaccineMeasles: string;
    public vaccineMumps: string;
    public vaccinePolio: string;
    public vaccineCholera: string;
    public otherVaccines: boolean;
    public otherVaccinesDetails: string;
}

export class DrugsUseModel {
    public drugsUse: boolean;
    public drugsUseDetails: string;
}

export class CurrentHealthModel {
    public currentDiseases: boolean;
    public currentDiseasesDetails: string;
    public currentSymptoms: boolean;
    public currentSymptomsDetails: string;
    public currentMedicines: boolean;
    public currentMedicinesDetails: string;
    public foodAllergy: boolean;
    public foodAllergyDetails: string;
}

export class EmergencyContactsModel {
    public firstEmergencyContactFirstName: string;
    public firstEmergencyContactLastName: string;
    public firstEmergencyContactPhone: string;
    public secondEmergencyContactFirstName: string;
    public secondEmergencyContactLastName: string;
    public secondEmergencyContactPhone: string;
    public doctor: boolean;
    public doctorFirstName: string;
    public doctorLastName: string;
    public doctorPhone: string;
    public doctorAddress: string;
    public doctorCity: string;
    public doctorZipCode: string;
    public doctorCountry: string;
    public doctorContactApproval: boolean;
    public otherDoctorContactApproval: boolean;
}

export class HealthFormModel {
    healthHistoryModel: HealthHistoryModel;
    drugsUseModel: DrugsUseModel;
    currentHealthModel: CurrentHealthModel;
    emergencyContactsModel: EmergencyContactsModel;
}

export class HealthFormData {
    public tonsillitis: string;
    public chickenPox: string;
    public bronchialAsthma: string;
    public diphtheria: string;
    public epilepsy: string;
    public rubella: string;
    public measles: string;
    public yellowFever: string;
    public meningitis: string;
    public mumps: string;
    public polio: string;
    public cholera: string;
    public heartAbnormality: string;
    public otherDiseases: string;
    public otherDiseasesDetails: string;
    public vaccineDiphtheria: string;
    public vaccinePertussis: string;
    public vaccineTetanus: string;
    public vaccineSmallpox: string;
    public vaccineRubella: string;
    public vaccineMeasles: string;
    public vaccineMumps: string;
    public vaccinePolio: string;
    public vaccineCholera: string;
    public otherVaccines: string;
    public otherVaccinesDetails: string;
    public drugsUse: string;
    public drugsUseDetails: string;
    public currentDiseases: string;
    public currentDiseasesDetails: string;
    public currentSymptoms: string;
    public currentSymptomsDetails: string;
    public currentMedicines: string;
    public currentMedicinesDetails: string;
    public foodAllergy: string;
    public foodAllergyDetails: string;
    public firstEmergencyContactFirstName: string;
    public firstEmergencyContactLastName: string;
    public firstEmergencyContactPhone: string;
    public secondEmergencyContactFirstName: string;
    public secondEmergencyContactLastName: string;
    public secondEmergencyContactPhone: string;
    public doctor: string;
    public doctorFirstName: string;
    public doctorLastName: string;
    public doctorPhone: string;
    public doctorAddress: string;
    public doctorCity: string;
    public doctorZipCode: string;
    public doctorCountry: string;
    public doctorContactApproval: string;
    public otherDoctorContactApproval: string;
}