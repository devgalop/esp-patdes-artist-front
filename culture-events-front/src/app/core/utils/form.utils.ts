import { AbstractControl, ValidationErrors } from '@angular/forms';

export function getFieldError(control: AbstractControl | null, errorKey: string): boolean {
  return !!(control?.hasError(errorKey) && control.touched);
}

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selected = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today ? null : { pastDate: true };
}
