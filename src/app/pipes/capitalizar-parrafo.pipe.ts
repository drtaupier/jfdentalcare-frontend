import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizarParrafo'
})
export class CapitalizarParrafoPipe implements PipeTransform {
    transform(value: string): string {
      return value.replace(/(^|[.]\s+)(\w)/g, (match, p1, p2) => {
        return p1 + p2.toUpperCase();
      });
    }
}
