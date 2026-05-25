import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersApiService } from '../../../core/services/orders-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CreateOrderDto, PayOrderDto } from '../../../core/models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersFacade {
  private readonly api = inject(OrdersApiService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  createOrder(dto: CreateOrderDto): void {
    this.api.createOrder(dto).subscribe({
      next: () => {
        this.notification.success('Order created successfully');
        this.router.navigate(['/events']);
      },
      error: () => {}
    });
  }

  payOrder(dto: PayOrderDto): void {
    this.api.payOrder(dto).subscribe({
      next: () => {
        this.notification.success('Order paid successfully');
        this.router.navigate(['/events']);
      },
      error: () => {}
    });
  }
}
