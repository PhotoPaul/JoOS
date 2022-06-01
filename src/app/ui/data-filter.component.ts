import { Component } from '@angular/core';

@Component({
    selector: 'data-filter',
    template: `<div><form role="form"><input (ngModelChange)="filter = $event" [ngModelOptions]="{standalone: true}" [(ngModel)]="filter" type="search" class="form-control" [placeholder]="'filter' | l" autofocus></form></div>`
})
export class DataFilterComponent {
    filter = '';

    constructor() { }
}
