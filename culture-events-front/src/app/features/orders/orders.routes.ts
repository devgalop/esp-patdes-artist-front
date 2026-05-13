import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./pages/order-create/order-create.component').then(m => m.OrderCreateComponent)
  },
];
