import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Component({
    selector: 're-captcha',
    template: `<div class="text-xs-center">
                   <div
                       class="g-recaptcha"
                       [attr.data-sitekey]="site_key"
                       data-callback="verifyCallback"
                       data-expired-callback="captchaExpiredCallback"
                    ></div>
               </div>`
})

export class ReCaptchaComponent implements OnInit {

    @Input()
    site_key: string = null;
    /* Available languages: https://developers.google.com/recaptcha/docs/language */
    @Input()
    language: string = null;

    @Output()
    captchaResponse = new EventEmitter<string>();
    @Output()
    captchaExpired = new EventEmitter();

    public static reset() {
        (<any>window).grecaptcha.reset();
    }

    constructor(zone: NgZone) {
        window[<any>'verifyCallback'] = <any>((response: any) => zone.run(this.recaptchaCallback.bind(this, response)));
        window[<any>'captchaExpiredCallback'] = <any>(() => zone.run(this.recaptchaExpiredCallback.bind(this)));
    }

    recaptchaCallback(response: string) {
        this.captchaResponse.emit(response);
    }

    recaptchaExpiredCallback() {
        this.captchaExpired.emit();
    }

    ngOnInit() {
        const doc = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js' + (this.language ? '?hl=' + this.language : '');
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    }
}
