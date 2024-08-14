import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class NumberFormatterPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): string {
    if (!value) return '';

    // Convertir en nombre
    let numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Appliquer le formatage avec des espaces comme séparateurs
    return numericValue.toLocaleString('en-US').replace(/,/g, ' ');
  }

}