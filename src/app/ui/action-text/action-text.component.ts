import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[actionText]',
  templateUrl: './action-text.component.html'
})
export class ActionTextComponent implements OnInit {
    @Input() text = '';
    @Output() textChange = new EventEmitter();
    @Output() changed = new EventEmitter();
    editing = false;
    originalText;

    constructor() { }

    ngOnInit() {
        this.originalText = this.text;
    }

    saveText($event) {
        if (
            this.editing === true && (
                $event.type === 'blur' || (
                    $event.type === 'keydown' &&
                    $event.keyCode === 13
                )
            )
        ) {
            this.text = this.text.trim();
            if (this.text !== this.originalText) {
                this.originalText = this.text;
                this.changed.emit(this.text);
            }
            this.editing = false;
        }
    }
}
