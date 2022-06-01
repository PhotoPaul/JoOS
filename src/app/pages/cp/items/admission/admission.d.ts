import { ChristianLifeFormModel } from '../application/greek/christian-life/christian-life';
import { EducationFormModel } from '../application/greek/education/education';
import { FinancialFormModel } from '../application/greek/financial/financial';
import { HealthFormModel } from '../application/greek/health/health';
import { ApplicationFormModel } from '../application/greek/personal/personal';

export class Candidate {
    id: number;
    firstName: string;
    lastName: string;
    roles: string [];
    programEnrollmentId: number;
    date_time: string;
    applications: object [];
    applicationStatus: any;
    healthStatus: any;
    educationStatus: any;
    christianLifeStatus: any;
    referencesStatus: any;
    financialStatus: any
    supportingDocumentsStatus: any;
    vote: number;
    votes?: any[];
}

export class CompleteApplication {
    pdfUrl: string;
    applicationFormModel: ApplicationFormModel;
    healthFormModel: HealthFormModel;
    educationFormModel: EducationFormModel;
    christianLifeFormModel: ChristianLifeFormModel;
    financialFormModel: FinancialFormModel;
}
