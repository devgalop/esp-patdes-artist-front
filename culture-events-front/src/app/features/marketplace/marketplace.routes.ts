import { Routes } from '@angular/router';

export const marketplaceRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent)
  },
];
