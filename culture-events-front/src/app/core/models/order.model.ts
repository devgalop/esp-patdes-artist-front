export interface OrderDetail {
  productId: string;
  quantity: string;
}

export interface CreateOrderDto {
  userId: string;
  eventId: string;
  providerId: string;
  details: OrderDetail[];
  cuponCode: string | null;
  observations: string | null;
}

export type PaymentMethod = 'CreditCard' | 'PayPal' | 'BankTransfer' | 'ApplePay' | 'GooglePay' | 'PSE';

export interface PayOrderDto {
  orderId: string;
  paymentMethod: PaymentMethod;
}
