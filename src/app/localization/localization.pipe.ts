import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { LocalizationService } from './localization.service';

@Pipe({
    name: 'l'
})
export class LocalizationPipe implements PipeTransform {
    constructor (
        private localization: LocalizationService,
        private ds: DomSanitizer
    ) { }

    transform (s: any, o: any): any {
        if (o) {
            if (o === 'html') {
                return this.ds.bypassSecurityTrustHtml(this.localization.s(s));
            } else {
                return this.localization.op(o, s);
            }
        }
        return this.localization.s(s);
    }
}
