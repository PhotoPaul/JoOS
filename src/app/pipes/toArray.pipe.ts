import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {

    transform(object: any, args?: any): any {
        return Object.keys(object).map(i => {
            return object[i];
        });
    }

}
