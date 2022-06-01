import { Component, Injector, NgModuleFactoryLoader, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { FileSystemService } from '../../../../services/file-system.service';
import { ModalService } from '../../../../ui/modal/modal.service';
import { CPService } from '../../cp.service';
import { LibraryService } from '../library/library.service';
import { HomeData } from './home';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    @ViewChild('userCoursesList', { read: ViewContainerRef }) userCoursesListRef;
    homeData: HomeData;

    constructor(
        private cp: CPService,
        private modal: ModalService,
        public fs: FileSystemService,
        public libraryService: LibraryService,
        private readonly loader: NgModuleFactoryLoader,
        private readonly injector: Injector,
    ) { }

    async ngOnInit() {
        this.homeData = await this.cp.getHomeData() as HomeData;

        // Show Evaluations Message if there are Evaluations Pending
        if (this.homeData.myEvaluations) {
            this.modal.show({
                type: 'ok',
                message: 'evaluationFormsPending'
            });
        }

        // If user has courses, lazy load UserCoursesList Component and show it
        if (this.homeData.academicsMyCoursesLength > 0) {
            const factory = await this.loader.load('app/pages/cp/items/academics/lazy-user-courses-list/lazy-user-courses-list.module#LazyUserCoursesListModule');
            const module = factory.create(this.injector);
            const entryComponentType = module.injector.get('LAZY_ENTRY_COMPONENT');
            const componentFactory = module.componentFactoryResolver.resolveComponentFactory(entryComponentType);
            if (this.userCoursesListRef) {
                this.userCoursesListRef.createComponent(componentFactory);
            }
        }
    }
}
