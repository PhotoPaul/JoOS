import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '../localization/localization.service';

@Pipe({
    name: 'fGrade'
})

export class FGradePipe implements PipeTransform {
    constructor(private localization: LocalizationService) { }

    transform(value: any, format: string): string | number {
        let grade: number | string;
        if (!value) {
            grade = '';
        } else if (value === -1 || value === '-1.0') {
            grade = this.localization.s('incomplete');
        } else if (value === -2 || value === '-2.0') {
            grade = this.localization.s('passGrade');
        } else if (value === -3 || value === '-3.0') {
            grade = this.localization.s('noPassGrade');
        } else if (value === -5 || value === '-5.0') {
            grade = this.localization.s('classified');
        } else {
            grade = parseFloat(value);
            if (format === 'letter') {
                grade = getLetter(grade);
            } else if (format === 'both') {
                grade = value + ' (' + getLetter(grade) + ')';
            }
        }
        return grade;

        function getLetter(grade: number): string {
            if (grade >= 9) {
                return 'A';
            } else if (grade >= 8) {
                return 'B';
            } else if (grade >= 7 ) {
                return 'C';
            } else if (grade >= 6 ) {
                return 'D';
            // } else if (grade >= 5) {
            //     return 'E';
            } else {
                return 'F';
            }
        }
    }
}
