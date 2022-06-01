import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DatepickerModule, ModalModule, TimepickerModule, TooltipModule } from 'ngx-bootstrap';

import { AuthIfDirective } from '../directives/authIf.directive';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationPipe } from '../localization/localization.pipe';
import { BreakEveryNPipe } from '../pipes/breakEveryN.pipe';
import { BreakEveryValueChangePipe } from '../pipes/breakEveryValueChange.pipe';
import { FGradePipe } from '../pipes/fGrade.pipe';
import { FilterByStringPipe } from '../pipes/filterByString.pipe';
import { FNamePipe } from '../pipes/fName.pipe';
import { FStatusPipe } from '../pipes/fStatus.pipe';
import { FUpperCasePipe } from '../pipes/fUpperCase.pipe';
import { NgForTimesPipe } from '../pipes/ngForTimes.pipe';
import { ToArrayPipe } from '../pipes/toArray.pipe';
import { ActionButtonComponent } from './action-button/action-button.component';
import { ActionCollectionComponent } from './action-collection/action-collection.component';
import { ActionDateComponent } from './action-date/action-date.component';
import { ActionSelectComponent } from './action-select/action-select.component';
import { ActionTextComponent } from './action-text/action-text.component';
import { ActionVoteComponent } from './action-vote/action-vote.component';
import { CircleTileComponent } from './circle-tile/circle-tile.component';
import { DataFilterComponent } from './data-filter.component';
import { DataPanelComponent } from './data-panel.component';
import { DateInputComponent } from './date-input.component';
import { FormComponent } from './form/form.component';
import { ImgThumbnailComponent } from './img-thumbnail/img-thumbnail.component';
import { LoadingComponent } from './loading.component';
import { ModalComponent } from './modal/modal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RequiredFieldWarningComponent } from './required-field-warning/required-field-warning.component';
import { TimeInputComponent } from './time-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LocalizationModule,
        FileUploadModule,
        DatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [
        AutofocusDirective,
        AuthIfDirective,
        FNamePipe,
        FStatusPipe,
        FUpperCasePipe,
        FGradePipe,
        FilterByStringPipe,
        BreakEveryNPipe,
        BreakEveryValueChangePipe,
        ToArrayPipe,
        NgForTimesPipe,
        ActionTextComponent,
        ActionDateComponent,
        ActionSelectComponent,
        ActionButtonComponent,
        ActionCollectionComponent,
        ActionVoteComponent,
        DataPanelComponent,
        DataFilterComponent,
        DateInputComponent,
        TimeInputComponent,
        CircleTileComponent,
        LoadingComponent,
        RequiredFieldWarningComponent,
        ImgThumbnailComponent,
        ModalComponent,
        FormComponent,
        NotificationsComponent
    ],
    exports: [
        LocalizationModule,
        FileUploadModule,
        DatepickerModule,
        TimepickerModule,
        TooltipModule,
        AutofocusDirective,
        AuthIfDirective,
        FNamePipe,
        FStatusPipe,
        FUpperCasePipe,
        FGradePipe,
        FilterByStringPipe,
        BreakEveryNPipe,
        BreakEveryValueChangePipe,
        ToArrayPipe,
        NgForTimesPipe,
        ActionTextComponent,
        ActionDateComponent,
        ActionSelectComponent,
        ActionButtonComponent,
        ActionCollectionComponent,
        ActionVoteComponent,
        DataPanelComponent,
        DataFilterComponent,
        DateInputComponent,
        TimeInputComponent,
        CircleTileComponent,
        LoadingComponent,
        RequiredFieldWarningComponent,
        ImgThumbnailComponent,
        ModalComponent,
        FormComponent,
        NotificationsComponent
    ],
    providers: [LocalizationPipe],
    entryComponents: [ModalComponent]
})
export class UIModule {

}
