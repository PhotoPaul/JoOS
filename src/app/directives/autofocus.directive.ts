import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective {
    constructor(elementRef: ElementRef) {
        setTimeout(() => {
            elementRef.nativeElement.focus();
        }, 100);
    }
}
