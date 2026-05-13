import { Component, ChangeDetectionStrategy, input, output, OnInit, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { CreateEventDto } from '../../../../core/models/event.model';
import { futureDateValidator, positiveNumberValidator } from '../../../../shared/validators/event.validators';

@Component({
  selector: 'app-event-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private billingTypeSub!: Subscription;

  readonly initialValue = input<Partial<CreateEventDto>>();
  readonly formSubmit = output<CreateEventDto>();
  readonly submitLabel = input<string>('Create Event');

  form!: FormGroup;

  readonly eventTypes = ['Concert', 'Exhibition', 'Theater', 'Festival', 'Workshop', 'Other'];
  readonly billingTypes = ['Free', 'Paid', 'Donation'];

  ngOnInit(): void {
    const v = this.initialValue();
    this.form = this.fb.group({
      name: [v?.name ?? '', [Validators.required, Validators.minLength(3)]],
      description: [v?.description ?? '', [Validators.required, Validators.minLength(10)]],
      scheduledAt: [v?.scheduledAt ?? '', [Validators.required, futureDateValidator()]],
      details: this.fb.group({
        type: [v?.details?.type ?? '', Validators.required],
        billingType: [v?.details?.billingType ?? '', Validators.required],
        price: [{ value: v?.details?.price ?? '', disabled: true }],
        location: [{ value: v?.details?.location ?? '', disabled: true }],
      }),
    });

    this.billingTypeSub = this.form.get('details.billingType')!.valueChanges
      .subscribe(billingType => this.onBillingTypeChange(billingType));

    // Apply initial state if editing an existing event
    if (v?.details?.billingType) {
      this.onBillingTypeChange(v.details.billingType);
    }
  }

  ngOnDestroy(): void {
    this.billingTypeSub?.unsubscribe();
  }

  private onBillingTypeChange(billingType: string): void {
    const price = this.form.get('details.price')!;
    const location = this.form.get('details.location')!;

    if (billingType === 'Paid') {
      this.enableWithValidators(price, [Validators.required, positiveNumberValidator()]);
      this.enableWithValidators(location, [Validators.required]);
    } else {
      this.disableAndClear(price);
      this.disableAndClear(location);
    }
  }

  private enableWithValidators(control: AbstractControl, validators: Parameters<AbstractControl['setValidators']>[0]): void {
    control.enable();
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  private disableAndClear(control: AbstractControl): void {
    control.disable();
    control.setValue('');
    control.clearValidators();
    control.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const isPaid = raw.details.billingType === 'Paid';
    const dto: CreateEventDto = {
      ...raw,
      scheduledAt: raw.scheduledAt instanceof Date
        ? raw.scheduledAt.toISOString().split('T')[0]
        : raw.scheduledAt,
      details: {
        ...raw.details,
        price: isPaid ? String(raw.details.price) : '0',
        location: isPaid ? raw.details.location : '',
      },
    };
    this.formSubmit.emit(dto);
  }
}
