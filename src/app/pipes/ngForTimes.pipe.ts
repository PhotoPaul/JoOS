import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ngForTimes'})
export class NgForTimesPipe implements PipeTransform {
    transform(noElements: number): any {
        return new Array(+noElements);
    }
}
