import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalizationModule } from '../../localization/localization.module';
import { UIModule } from '../../ui/ui.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { ReCaptchaComponent } from './re-captcha.component';
import { RegisterComponent } from './register.component';
import { RegistrationService } from './registration.service';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        LocalizationModule,
        UIModule
    ],
    declarations: [
        LoginComponent,
        ReCaptchaComponent,
        RegisterComponent,
        ResetPasswordComponent
    ],
    providers: [
        RegistrationService
    ]
})
export class AuthModule { }
