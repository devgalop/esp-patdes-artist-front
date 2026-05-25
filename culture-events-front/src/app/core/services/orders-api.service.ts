import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CreateOrderDto, PayOrderDto } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private readonly api = inject(ApiService);

  createOrder(dto: CreateOrderDto): Observable<unknown> {
    return this.api.post<unknown>('/orders', dto);
  }

  payOrder(dto: PayOrderDto): Observable<unknown> {
    return this.api.post<unknown>('/pay-order', dto);
  }
}
