import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';
import { AcademicsService } from '../academics/academics.service';
import { Candidate } from './admission';
import { AdmissionService } from './admission.service';

@Component({
    templateUrl: './admissions-progress.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdmissionsProgressComponent implements OnInit {
    activeCandidateId: number;
    candidates: Candidate[];

    constructor(
        private route: ActivatedRoute,
        private admissionService: AdmissionService,
        public academicsService: AcademicsService,
        public auth: AuthenticationService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route.params.subscribe(async params => {
            this.activeCandidateId = params.id;
            this.candidates = await this.admissionService.getCandidatesVotingData(this.activeCandidateId) as Candidate[];
            this.changeDetectorRef.detectChanges();
        });
    }

    removeVoteFromCandidate(userId, candidateId) {
        this.admissionService.removeVoteFromCandidate(userId, candidateId)
            .then((response: any) => {
                if (response && response.success) {
                    const candidateIndex = this.candidates.findIndex(candidate => {
                        return candidate.id === candidateId;
                    });
                    const voteIndex = this.candidates[candidateIndex].votes.findIndex(vote => {
                        return vote.userId === userId;
                    });
                    this.candidates[candidateIndex].votes.splice(voteIndex, 1);
                    if (this.candidates[candidateIndex].votes.length === 0) {
                        this.candidates.splice(candidateIndex, 1);
                    }
                }
            });
    }

    async promoteCandidateToStudent(acceptedCandidate) {
        let programId;
        for (const role of acceptedCandidate.roles) {
            if (role.roleId === '5') {
                programId = role.forProgramId;
                break;
            }
        }
        await this.admissionService.promoteCandidateToStudent(acceptedCandidate.id, programId);
        this.candidates.some((candidate: any) => {
            if (candidate.id === acceptedCandidate.id) {
                candidate.roles.push({
                    roleId: '6',
                    forProgramId: programId
                });
                return true;
            }
            return false;
        });
        this.changeDetectorRef.detectChanges();
    }

    async removeCandidateRole(id) {
        await this.admissionService.removeCandidateRole(id);
        this.candidates = this.candidates.filter((candidate: any) => {
            return candidate.id !== id;
        });
        this.changeDetectorRef.detectChanges();
    }
}
