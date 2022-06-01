export class ApprovalsFormModel {
    public studentPackage: string;
    public financialApproval: boolean;
    public selfPaid: boolean;
    public sponsors: string;
    public sponsorsTotal: number;
    public debtApproval: boolean;
    public deposit: string;
}

export class FinancialFormModel {
    approvalsFormModel: ApprovalsFormModel;
}

export class OrderModel {
    public Amount: number;
    public CustomerTrns: string;
    public RequestLang: string;
    public PaymentTimeOut: number;
}