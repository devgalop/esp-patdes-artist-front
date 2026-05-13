import { Component, ChangeDetectionStrategy, OnInit, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { EventsFacade } from '../../facades/events.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { futureDateValidator } from '../../../../shared/validators/event.validators';

@Component({
  selector: 'app-event-reschedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    RouterLink,
    PageHeaderComponent,
  ],
  templateUrl: './event-reschedule.component.html',
  styles: [`.form-card { max-width: 480px; }`],
})
export class EventRescheduleComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(EventsFacade);

  readonly id = input.required<string>();

  form = this.fb.group({
    newDate: ['', [Validators.required, futureDateValidator()]],
  });

  ngOnInit(): void {
    this.facade.loadEventById(this.id());
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const rawDate = raw.newDate as unknown;
    const date = rawDate instanceof Date
      ? rawDate.toISOString()
      : new Date(rawDate as string).toISOString();
    this.facade.rescheduleEvent({ EventId: this.id(), NewDate: date });
  }
}
