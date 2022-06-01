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
    filter = {} as {
        programId: string;
        hiddenOnly: boolean;
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public admissionService: AdmissionService,
        public userService: UserService,
        private auth: AuthenticationService,
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
        const db: any = await this.admissionService.getApplicantsData(this.filter, this.activeCandidateId);
        this.candidates = db.applicantsData as Candidate[];
        this.programs = db.programsData as Program[];
        this.changeDetectorRef.detectChanges();
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
}
