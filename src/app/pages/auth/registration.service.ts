import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../services/ajax.service';
import { CandidateRegistrationFormModel } from './registration';

@Injectable()
export class RegistrationService {

    constructor(private ajax: AjaxService) { }

    registerCandidate(candidateRegistrationFormModel: CandidateRegistrationFormModel) {
        return new Promise(resolve => {
            this.ajax.get('registerCandidate', candidateRegistrationFormModel)
                .then((response: AjaxResponse) => {
                    resolve(response.data);
                });
        });
    }
}
