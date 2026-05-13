import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/event-list/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/event-create/event-create.component').then(m => m.EventCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/event-detail/event-detail.component').then(m => m.EventDetailComponent)
  },
  {
    path: ':id/reschedule',
    loadComponent: () => import('./pages/event-reschedule/event-reschedule.component').then(m => m.EventRescheduleComponent)
  },
];
