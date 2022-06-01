import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fUpperCase'})
export class FUpperCasePipe implements PipeTransform {
    transform(string: string): string {
        if (!string) {
            return '';
        }

        const MAP = {
            'ά': 'Α',
            'Ά': 'Α',
            'έ': 'Ε',
            'Έ': 'Ε',
            'ή': 'Η',
            'Ή': 'Η',
            'ί': 'Ι',
            'Ί': 'Ι',
            'ΐ': 'Ϊ',
            'ό': 'Ο',
            'Ό': 'Ο',
            'ύ': 'Υ',
            'Ύ': 'Υ',
            'ΰ': 'Ϋ',
            'ώ': 'Ω',
            'Ώ': 'Ω'
        };

        for (let i = 0; i < string.length; i++) {
            if (MAP[string[i]]) {
                string = string.substr(0, i) + MAP[string[i]] + string.substr(++i);
            }
        }
        return string;
    }
}
