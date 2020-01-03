import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'cuttext'})
export class ShortTextPipe implements PipeTransform {
    transform(value: string, length: number) {
        if (value.length <= length) {
            return value;
        }
        return  value.slice(0, length) + '. . .';

    }
}
