import { Injectable } from '@angular/core';

import { AjaxResponse, AjaxService } from '../../services/ajax.service';
import { HomeData } from './items/home/home';

@Injectable({
    providedIn: 'root'
})
export class CPService {

    constructor(private ajax: AjaxService) { }

    getHomeData() {
        return new Promise(resolve => {
            this.ajax.get('getHomeData')
                .then((response: AjaxResponse) => {
                    resolve(response.data as HomeData);
                });
        });
    }
}
