import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterByString'})
export class FilterByStringPipe implements PipeTransform {
    transform(_array: any[], properties: string[], _filter: string): any[] {
        const array = [];
        if (!_filter) {
            return _array;
        } else {
            const filter = this.uppercaseNoDiacritics(_filter);
            for (const i in _array) {
                if (_array.hasOwnProperty(i)) {
                    let found = false;
                    for (const property of properties) {
                        const haystack = Array.isArray(_array[i][property]) ? _array[i][property].join(' ') : _array[i][property];
                        if ((new RegExp(filter)).test(this.uppercaseNoDiacritics(haystack))) {
                        // if ((new RegExp(filter)).test(this.uppercaseNoDiacritics(_array[i][property]))) {
                            found = true;
                        }
                    }
                    if (found) {
                        array.push(_array[i])
                    }
                }
            }
            return array;
        }
    }

    uppercaseNoDiacritics(string: string): string {
        if (!string) {
            string = '';
        }
        const MAP = {
            'Ά': 'Α',
            'Έ': 'Ε',
            'Ή': 'Η',
            'Ί': 'Ι',
            'Ϊ': 'Ι',
            'Ό': 'Ο',
            'Ύ': 'Υ',
            'Ϋ': 'Υ',
            'Ώ': 'Ω'
        };
        string = string.toLocaleUpperCase();
        for (let i = 0; i < string.length; i++) {
            if (MAP[string[i]]) {
                string = string.substr(0, i) + MAP[string[i]] + string.substr(++i);
            }
        }
        return string;
    }
}
