import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./pages/order-create/order-create.component').then(m => m.OrderCreateComponent)
  },
  {
    path: 'pay',
    loadComponent: () => import('./pages/order-pay/order-pay.component').then(m => m.OrderPayComponent)
  },
];
