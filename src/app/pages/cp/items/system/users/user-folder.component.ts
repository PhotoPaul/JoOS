import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { UserData } from '../users';

@Component({
    templateUrl: './user-folder.component.html'
})
export class UserFolderComponent implements OnInit {
    public userData: UserData;

    constructor(private route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.userService.getUserData(id)
                .then((userData: UserData) => {
                    this.userData = userData;
                });
        });
    }
}
