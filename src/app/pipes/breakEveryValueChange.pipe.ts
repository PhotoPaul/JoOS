import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'breakEveryValueChange'})
export class BreakEveryValueChangePipe implements PipeTransform {
    transform(flatArray: any[], property: any): any {
        const array = [];
        if (Array.isArray(flatArray) && flatArray.length) {
            let value: any = flatArray[0][property];
            let i = 0;
            let j = 0;
            while (i < flatArray.length) {
                if (value !== flatArray[i][property]) {
                    value = flatArray[i][property];
                    array.push(flatArray.slice(j, i));
                    j = i;
                }
                i ++;
            }
            array.push(flatArray.slice(j, i));
        }
        return array;
    }
}
