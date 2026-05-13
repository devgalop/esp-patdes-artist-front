export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatDisplayDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
