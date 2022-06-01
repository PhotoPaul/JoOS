import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AjaxService } from '../../services/ajax.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'language-picker',
  templateUrl: './language-picker.component.html'
})
export class LanguagePickerComponent {
    @Input() align = 'center';

    constructor(private router: Router, private route: ActivatedRoute, private ajax: AjaxService, private auth: AuthenticationService) { }

    pickLanguage(language) {
        localStorage.setItem('language', language);
        this.ajax.get('setLanguage', { language: language });
        this.router.navigate(['/refresh', this.router.url]);
    }
}
