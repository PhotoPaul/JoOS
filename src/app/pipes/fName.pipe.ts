import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fName'})
export class FNamePipe implements PipeTransform {
    transform(value: string, lastName: string, firstName: string): string {
        if (!lastName) {
            return '';
        } else if (!firstName) {
            return lastName;
        } else {
            return lastName + ', ' + firstName;
        }
    }
}
