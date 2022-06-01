import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'breakEveryN'})
export class BreakEveryNPipe implements PipeTransform {
    transform(flatArray: any[], n: number): any {
        const array = [];
        if (Array.isArray(flatArray)) {
            let i = 0;
            while (i < flatArray.length) {
                array.push(flatArray.slice(i, i + n));
                i += n;
            }
        }
        return array;
    }
}
