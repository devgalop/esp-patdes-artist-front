import { Component, ChangeDetectionStrategy, inject, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { OrdersFacade } from '../../facades/orders.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { CreateOrderDto } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatCardModule, RouterLink, PageHeaderComponent
  ],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(OrdersFacade);

  readonly eventId = input<string>();
  readonly providerId = input<string>();

  readonly providers = ['HomeForniture', 'HiperSound', 'MultiSound'];

  form!: FormGroup;

  get detailsArray(): FormArray {
    return this.form.get('details') as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      eventId: [this.eventId() ?? '', Validators.required],
      providerId: [this.providerId() ?? '', Validators.required],
      cuponCode: [null],
      observations: [null],
      details: this.fb.array([this.createDetailRow()])
    });
  }

  createDetailRow(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: ['1', [Validators.required, Validators.min(1)]]
    });
  }

  addDetail(): void {
    this.detailsArray.push(this.createDetailRow());
  }

  removeDetail(index: number): void {
    if (this.detailsArray.length > 1) this.detailsArray.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const dto: CreateOrderDto = this.form.getRawValue();
    this.facade.createOrder(dto);
  }
}
