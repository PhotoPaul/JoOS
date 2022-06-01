import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[actionDate]',
  templateUrl: './action-date.component.html'
})
export class ActionDateComponent implements OnInit {
    @Input() dateText: string;
    @Output() dateTextChange = new EventEmitter();
    @Output() changed = new EventEmitter();
    editing = false;
    originalDateText;

    constructor() { }

    ngOnInit() {
    }

    saveDateText($event) {

    }
}
