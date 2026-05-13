import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat', pure: true })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string | number | null | undefined, currency = 'USD'): string {
    if (value == null || value === '') return '—';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return String(value);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
  }
}
