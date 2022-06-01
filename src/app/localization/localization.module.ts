import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LanguagePickerComponent } from './language-picker/language-picker.component';
import { LocalizationPipe } from './localization.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LocalizationPipe,
        LanguagePickerComponent
    ],
    exports: [
        LocalizationPipe,
        LanguagePickerComponent
    ]
})
export class LocalizationModule { }
