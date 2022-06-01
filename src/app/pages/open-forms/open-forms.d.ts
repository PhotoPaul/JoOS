export interface OpenFormDataModel {
    meta: LetterOfRecommendationMetaModel;
    questions: [{
        questionId: number;
        title_en: string;
        title_gr: string;
        type: number;
    }];
}

interface LetterOfRecommendationMetaModel {
    title: string;
    applicantId: number;
    applicantFirstName: string;
    applicantLastName: string;
    referenceFirstName: string;
    referenceLastName: string;
    occupation: string;
    address: string;
    cityZipCountry: string;
    phone: string;
    email: string;
}
