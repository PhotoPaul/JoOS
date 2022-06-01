import { CommonModule } from '@angular/common';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRoutes } from '@angular/router';

import { LocalizationModule } from '../../localization/localization.module';
import { FGradePipe } from '../../pipes/fGrade.pipe';
import { FileSystemService } from '../../services/file-system.service';
import { NavigationService } from '../../services/navigation.service';
import { UIModule } from '../../ui/ui.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { BreadcrumbService } from './breadcrumbs.service';
import { CPComponent } from './cp.component';
import { CPGuard } from './cp.guard';
import { CPRouting } from './cp.routing';
import { AcademicsService } from './items/academics/academics.service';
import { ScheduleService } from './items/academics/schedule/schedule.service';
import { MyCoursesComponent } from './items/academics/students/my-courses.component';
import { StudentsService } from './items/academics/students/students.service';
import { AdmissionService } from './items/admission/admission.service';
import { ApplicationService } from './items/application/application.service';
import { ErrorComponent } from './items/error/error.component';
import { FinancesService } from './items/finances/finances.service';
import { HomeComponent } from './items/home/home.component';
import { MyAdviseesComponent } from './items/home/my-advisees/my-advisees.component';
import { MyEvaluationsComponent } from './items/home/my-evaluations/my-evaluations.component';
import { UserApplicationsComponent } from './items/home/user-applications/user-applications.component';
import { UserService } from './items/system/user.service';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LocalizationModule,
        UIModule,
        CPRouting
    ],
    declarations: [
        CPComponent,
        TopbarComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        HomeComponent,
        ErrorComponent,
        MyAdviseesComponent,
        MyCoursesComponent,
        UserApplicationsComponent,
        MyEvaluationsComponent
    ],
    providers: [
        CPGuard,
        NavigationService,
        BreadcrumbService,
        FileSystemService,
        UserService,
        StudentsService,
        ScheduleService,
        AcademicsService,
        FGradePipe,
        ApplicationService,
        AdmissionService,
        FinancesService,
        {
            provide: NgModuleFactoryLoader,
            useClass: SystemJsNgModuleLoader
        },
        provideRoutes([
            { path: 'lazy-user-courses-list', loadChildren: 'app/pages/cp/items/academics/lazy-user-courses-list/lazy-user-courses-list.module#LazyUserCoursesListModule' }
        ])
    ]
})
export class CPModule {

}
