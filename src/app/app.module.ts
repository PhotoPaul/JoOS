import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AjaxDebugComponent } from './debug/ajax-debug/ajax-debug.component';
import { CustomErrorHandler } from './debug/custom-error-handler.service';
import { LocalizationModule } from './localization/localization.module';
import { LocalizationService } from './localization/localization.service';
import { AuthGuard } from './pages/auth/auth.guard';
import { CPGuard } from './pages/cp/cp.guard';
import { RefreshComponent } from './pages/refresh/refresh.component';
import { AjaxService } from './services/ajax.service';
import { AuthenticationService } from './services/authentication.service';
import { UIModule } from './ui/ui.module';

// Modules
// Services
// Components
@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        routing,
        HttpClientModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        AjaxDebugComponent,
        RefreshComponent
    ],
    providers: [
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        AjaxService,
        AuthenticationService,
        AuthGuard,
        CPGuard,
        LocalizationService
    ],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
