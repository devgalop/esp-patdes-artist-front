import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { OrdersFacade } from '../../facades/orders.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { PayOrderDto, PaymentMethod } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-pay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCardModule, RouterLink, PageHeaderComponent
  ],
  templateUrl: './order-pay.component.html',
  styleUrl: './order-pay.component.scss',
})
export class OrderPayComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly facade = inject(OrdersFacade);

  readonly paymentMethods: PaymentMethod[] = ['CreditCard', 'PayPal', 'BankTransfer', 'ApplePay', 'GooglePay', 'PSE'];

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      orderId: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const dto: PayOrderDto = this.form.getRawValue();
    this.facade.payOrder(dto);
  }
}
