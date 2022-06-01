import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'reset',
        component: ResetPasswordComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
