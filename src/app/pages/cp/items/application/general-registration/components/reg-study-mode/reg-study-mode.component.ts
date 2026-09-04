import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'app-reg-study-mode',
    templateUrl: './reg-study-mode.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegStudyModeComponent {
    @Input() registrationData: any;
    @Input() validate: boolean;
    @Input() formLoading: boolean;

    @Output() save = new EventEmitter<{ current: string, next: string }>();

    onStudyModeChange() {
        if (!this.registrationData || !this.registrationData.application) {
            return;
        }
        const app = this.registrationData.application;
        if (app.studyMode === 'greek') {
            app.ispLoad = null;
            app.ispTrack = null;
            app.ispResidence = null;
        } else if (app.studyMode === 'isp') {
            app.greekTrack = null;
            app.greekLoad = null;
            app.greekDuration = null;
            app.greekResidence = null;
        }
    }

    onGreekTrackChange() {
        if (!this.registrationData || !this.registrationData.application) {
            return;
        }
        const app = this.registrationData.application;
        if (app.greekTrack === 'online') {
            app.greekLoad = null;
            app.greekDuration = null;
            app.greekResidence = null;
        }
    }

    onGreekLoadChange() {
        if (!this.registrationData || !this.registrationData.application) {
            return;
        }
        const app = this.registrationData.application;
        if (app.greekLoad !== 'full-time') {
            app.greekDuration = null;
        }
    }

    onIspLoadChange() {
        if (!this.registrationData || !this.registrationData.application) {
            return;
        }
        const app = this.registrationData.application;
        if (app.ispLoad === 'full-time') {
            app.ispTrack = null;
        }
    }

    needsCourseEnrollment(): boolean {
        if (!this.registrationData || !this.registrationData.application) {
            return false;
        }
        const app = this.registrationData.application;
        if (app.studyMode === 'greek') {
            if (app.greekTrack === 'online') {
                return true;
            }
            if (app.greekTrack === 'in-person' && (app.greekLoad === 'part-time' || app.greekLoad === 'auditor')) {
                return true;
            }
        }
        return false;
    }

    onSave(current: string, defaultNext: string) {
        const next = this.needsCourseEnrollment() ? 'regCourseSelectionInfo' : 'regMedicalInfo';
        this.save.emit({ current, next });
    }
}
