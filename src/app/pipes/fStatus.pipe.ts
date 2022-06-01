import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fStatus'})
export class FStatusPipe implements PipeTransform {
    transform(status: string): string {
        if (status === '1') {
            return 'Εγκρίθηκε';
        } else if (status === '0') {
            return 'Εκκρεμότητα';
        } else {
            return '';
        }
    }
}
