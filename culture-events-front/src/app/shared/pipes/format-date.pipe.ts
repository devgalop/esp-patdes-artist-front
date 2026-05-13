import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate', pure: true })
export class FormatDatePipe implements PipeTransform {
  transform(isoString: string | undefined | null): string {
    if (!isoString) return '—';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
