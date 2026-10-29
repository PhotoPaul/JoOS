import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';
import { Program } from '../academics/academics';
import { UserService } from '../system/user.service';
import { Candidate } from './admission';
import { AdmissionService } from './admission.service';

@Component({
    templateUrl: 'admissions-candidate-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionsCandidateListComponent implements OnInit {
    activeCandidateId: number;
    candidates: Candidate[];
    programs: Program[];
    availableApplications: any[] = [];
    addingAppForCandidateId: number = null;
    selectedAppIdToAdd: number = null;
    addingAppLoading: boolean = false;

    deletingAppForCandidateId: number = null;
    selectedAppToDelete: any = null;

    filter = {} as {
        programId: string;
        hiddenOnly: boolean;
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public admissionService: AdmissionService,
        public userService: UserService,
        public auth: AuthenticationService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.activeCandidateId = params.id;
            this.filter.programId = params.programId ? params.programId : '0';
            this.fetchCandidateProgramData();
            this.filter.programId = params.programId;
        });
    }

    async fetchCandidateProgramData() {
        const filter = {
            programId: this.filter.programId || '0',
            hiddenOnly: !!this.filter.hiddenOnly
        };
        const db: any = await this.admissionService.getApplicantsData(filter, this.activeCandidateId);
        this.candidates = db.applicantsData as Candidate[];
        this.programs = db.programsData as Program[];
        if (!this.availableApplications || this.availableApplications.length === 0) {
            this.availableApplications = (await this.admissionService.getAvailableApplications()) as any[];
        }
        this.changeDetectorRef.markForCheck();
    }

    onActiveProgramChange(programId) {
        let path = './';
        if (this.filter.programId) {
            path += '../../';
        } else if (this.activeCandidateId) {
            path += '../';
        }
        this.router.navigate([path, this.activeCandidateId ? this.activeCandidateId : 0, programId], { relativeTo: this.route });
        this.filter.programId = programId;
    }

    getPortletClass(applicant) {
        if (applicant.applications.length) {
            if (this.isStudent(applicant)) {
                return 'portlet-dark-blue';
            }
            return 'portlet-green';
        }
        return 'portlet-orange';
    }

    openAdmissionsCompleteApplicationPDF(pdfUrl) {
        window.open(pdfUrl);
    }

    openAdmissionsLettersOfRecommendationPDF(pdfUrl) {
        window.open(pdfUrl);
    }

    administrativeActionNeeded(candidate: Candidate) {
        if (this.activeCandidateId === candidate.id) {
            return false;
        } else {
            if (
                this.auth.user.roles.some(role => {
                    return role.roleName === 'registrar';
                })
            ) {
                return (
                    (candidate.applicationStatus         === '1' || candidate.applicationStatus === '3')          &&
                    (candidate.educationStatus           === '1' || candidate.educationStatus === '3')            &&
                    (candidate.healthStatus              === '1' || candidate.healthStatus === '3')               &&
                    (candidate.christianLifeStatus       === '1' || candidate.christianLifeStatus === '3')        &&
                    (candidate.referencesStatus          === '1' || candidate.referencesStatus === '3')           &&
                    (candidate.financialStatus           === '1' || candidate.financialStatus === '3')            &&
                    (candidate.supportingDocumentsStatus === '1' || candidate.supportingDocumentsStatus === '3')
                );
            } else if (
                this.auth.user.roles.some(role => {
                    return role.roleName === 'cashier';
                })
            ) {
                return candidate.financialStatus === '1';
            } else if (
                this.auth.user.roles.some(role => {
                    return role.roleName === 'admissions';
                })
            ) {
                return candidate.vote !== null;
            } else {
                return true;
            }
        }
    }

    isStudent(candidate: Candidate) {
        return candidate.programEnrollmentId;
    }

    votingHandler(data, dataValue) {
        return new Promise((resolve) => {
            this.admissionService.voteForCandidate(data.applicant.id, dataValue);
            resolve();
        });
    }

    getProcessedApplications(candidate: any): any[] {
        if (!candidate || !candidate.applications) {
            return [];
        }

        const hasGeneralApp = candidate.applications.some(app => +app.applicationId === 23);

        if (hasGeneralApp) {
            return candidate.applications;
        }

        // Find if there are any Greek application forms (IDs 1 to 6 and 12, EXCEPT 5 references!)
        const greekForms = candidate.applications.filter(app =>
            [1, 2, 3, 4, 6, 12].indexOf(+app.applicationId) !== -1
        );

        if (greekForms.length === 0) {
            return candidate.applications;
        }

        // Filter out the individual Greek forms (1, 2, 3, 4, 6, 12)
        const nonConsolidatedForms = candidate.applications.filter(app =>
            [1, 2, 3, 4, 6, 12].indexOf(+app.applicationId) === -1
        );

        // Determine the consolidated status of the General Application
        let consolidatedStatus = '1';
        if (greekForms.some(app => !app.applicationStatus || app.applicationStatus === '0')) {
            consolidatedStatus = '0';
        } else if (greekForms.some(app => app.applicationStatus === '3')) {
            consolidatedStatus = '3';
        } else if (greekForms.some(app => app.applicationStatus === '2')) {
            consolidatedStatus = '2';
        }

        // Create the consolidated General Application object
        const generalApp = {
            applicationId: '23',
            applicationStatus: consolidatedStatus,
            editPath: '/cp/admission/general-application',
            viewPath: '/cp/admission/general-application',
            icon: 'fa-file-alt',
            heading_gr: 'Γενική Αίτηση / General Application',
            heading_en: 'General Application',
            viewRoles: 'admin,registrar,cashier,admissions',
            editRoles: 'admin,registrar,admissions'
        };

        return [generalApp, ...nonConsolidatedForms];
    }

    deleteUserPermanently(userId) {
        this.userService.deleteUserPermanently(userId)
        .then((response) => {
            if (response) {
                this.candidates = this.candidates.filter(i => {
                    return i.id !== userId;
                });
            }
        });
    }

    resetApplicant(userId) {
        return new Promise(() => {
            this.admissionService.resetApplicant(userId)
            .then((response) => {
                if (response) {
                    this.candidates.some((candidate) => {
                        if (candidate.id === userId) {
                            candidate.applications.length = 0;
                            return true;
                        }
                    });
                }
            });
        });
    }

    getAvailableApplicationsForCandidate(candidate: any): any[] {
        if (!this.availableApplications || !candidate || !candidate.applications) {
            return [];
        }
        const existingAppIds = candidate.applications.map(app => +app.applicationId);
        return this.availableApplications.filter(app => existingAppIds.indexOf(+app.id) === -1);
    }

    startAddApplication(candidateId: number) {
        this.addingAppForCandidateId = candidateId;
        this.selectedAppIdToAdd = null;
        this.deletingAppForCandidateId = null;
        this.selectedAppToDelete = null;
        this.changeDetectorRef.markForCheck();
    }

    cancelAddApplication() {
        this.addingAppForCandidateId = null;
        this.selectedAppIdToAdd = null;
        this.changeDetectorRef.markForCheck();
    }

    confirmAddApplication(candidateId: number) {
        if (!this.selectedAppIdToAdd) {
            return;
        }
        this.addingAppLoading = true;
        this.activeCandidateId = candidateId;
        this.admissionService.addUserApplication(candidateId, this.selectedAppIdToAdd)
            .then(async () => {
                this.addingAppLoading = false;
                this.addingAppForCandidateId = null;
                this.selectedAppIdToAdd = null;
                await this.fetchCandidateProgramData();
            })
            .catch(() => {
                this.addingAppLoading = false;
                this.changeDetectorRef.markForCheck();
            });
    }

    startDeleteApplication(candidateId: number) {
        this.deletingAppForCandidateId = candidateId;
        this.selectedAppToDelete = null;
        this.addingAppForCandidateId = null;
        this.selectedAppIdToAdd = null;
        this.changeDetectorRef.markForCheck();
    }

    cancelDeleteApplication() {
        this.deletingAppForCandidateId = null;
        this.selectedAppToDelete = null;
        this.changeDetectorRef.markForCheck();
    }

    onSelectAppToDelete(candidate: Candidate, app: any) {
        if (!app) {
            return;
        }
        this.selectedAppToDelete = app;
        this.admissionService.deleteUserApplicationWithConfirmation(candidate, app)
            .then(async (result) => {
                this.deletingAppForCandidateId = null;
                this.selectedAppToDelete = null;
                if (result) {
                    this.activeCandidateId = candidate.id;
                    await this.fetchCandidateProgramData();
                } else {
                    this.changeDetectorRef.markForCheck();
                }
            });
    }
}
