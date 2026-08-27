import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: 'input[ngModel], textarea[ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: NoEmojiValidatorDirective,
        multi: true
    }]
})
export class NoEmojiValidatorDirective implements Validator {
    constructor(private el: ElementRef) { }

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const hasEmoji = value && /[\uD800-\uDFFF]/.test(value);
        return hasEmoji ? { 'hasEmoji': true } : null;
    }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        const input = this.el.nativeElement as HTMLInputElement;
        const value = input.value;
        const cleaned = value.replace(/[\uD800-\uDFFF]/g, '');

        if (value !== cleaned) {
            const start = input.selectionStart;
            const end = input.selectionEnd;

            // Set HTML value directly
            input.value = cleaned;

            // Dispatch input event to notify Angular's DefaultValueAccessor to update the model
            input.dispatchEvent(new Event('input', { bubbles: true }));

            // Restore selection/cursor position
            const diff = value.length - cleaned.length;
            const newCursor = Math.max(0, (start || 0) - diff);
            input.setSelectionRange(newCursor, newCursor);
        }
    }
}
