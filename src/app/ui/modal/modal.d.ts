import { ActionButtonInputs } from '../action-collection/action-collection';

export interface CustomModalOptions {
    type: string;
    templateRef?: any;
    title?: string;
    message?: string | string[];
    bodyClass?: string;
    onOk?: (any) => void;
    onClose?: Function;
    onYes?: Function;
    onNo?: Function;
    confirmationButtons?: ActionButtonInputs[];
}