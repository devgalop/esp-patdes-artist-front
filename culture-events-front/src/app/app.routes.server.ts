import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes must be server-rendered (SSR) or client-rendered (CSR)
  { path: 'events/:id', renderMode: RenderMode.Server },
  { path: 'events/:id/reschedule', renderMode: RenderMode.Server },
  // Everything else can be prerendered
  { path: '**', renderMode: RenderMode.Prerender },
];
