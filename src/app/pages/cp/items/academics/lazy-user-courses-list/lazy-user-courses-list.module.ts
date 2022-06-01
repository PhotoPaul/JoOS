import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalizationModule } from '../../../../../localization/localization.module';
import { UIModule } from '../../../../../ui/ui.module';
import { UserCoursesListComponent as UserCoursesListComponent } from './user-courses-list.component';

@NgModule({
    imports: [
        CommonModule,
        UIModule,
        LocalizationModule
    ],
    declarations: [UserCoursesListComponent],
    entryComponents: [UserCoursesListComponent],
    providers: [
        {
            provide: 'LAZY_ENTRY_COMPONENT',
            useValue: UserCoursesListComponent
        }
    ]
})
export class LazyUserCoursesListModule { }
