# Culture Events Front

Modern Angular 21 SPA for Cultural Events Management.

## Stack

- **Angular 21** — standalone components, signals, `inject()`
- **Angular Material 21** — Material 3 design system
- **RxJS 7** — reactive streams
- **TypeScript 5.9** — strict mode

## Quick Start

```bash
cd culture-events-front
npm install
npm start          # http://localhost:4200
```

> The API server must be running at `http://localhost:5136`.

## Project Structure

```
src/app/
├── core/
│   ├── config/          # APP_CONFIG (base URL, page size)
│   ├── tokens/          # InjectionToken: API_BASE_URL
│   ├── models/          # TypeScript interfaces (Event, Order, Catalog…)
│   ├── interceptors/    # loadingInterceptor, errorInterceptor
│   ├── services/        # ApiService, EventsApiService, NotificationService…
│   └── utils/           # date.utils, form.utils
│
├── shared/
│   ├── components/ui/   # DataTable, EmptyState, ConfirmDialog, PageHeader, Spinner
│   ├── pipes/           # formatDate, currencyFormat
│   ├── validators/      # futureDateValidator, positiveNumberValidator
│   └── services/        # DialogService
│
├── layout/
│   └── shell/           # Main layout: sidenav + toolbar + router-outlet
│
└── features/
    ├── events/          # List · Detail · Create · Reschedule
    ├── marketplace/     # Provider catalog
    └── orders/          # Create order
```

## Routes

| Path | Component |
|------|-----------|
| `/events` | Event list (paginated) |
| `/events/create` | Create event form |
| `/events/:id` | Event detail |
| `/events/:id/reschedule` | Reschedule form |
| `/marketplace` | Provider catalog |
| `/orders/create` | Create order |

## Architecture Decisions

### Smart / Dumb components
Container components (`*-list`, `*-detail`, `*-create`) own state via **Facades**.  
Presentational components (`EventFormComponent`, `DataTableComponent`) only receive inputs and emit outputs.

### Facades
Each feature has a Facade (`EventsFacade`, `MarketplaceFacade`, `OrdersFacade`) that:
- Holds feature signals (state)
- Calls API services
- Delegates notifications to `NotificationService`
- Navigates on success

### Interceptors (functional)
- `loadingInterceptor` — increments/decrements a counter in `LoadingService`
- `errorInterceptor` — parses `HttpErrorResponse` and shows a snackbar

### Generic `ApiService`
Single typed HTTP wrapper. Feature API services depend on it — never on `HttpClient` directly.

## API Configuration

Base URL is provided via `InjectionToken` in `app.config.ts`:

```ts
{ provide: API_BASE_URL, useValue: 'http://localhost:5136' }
```

To change environment, update `core/config/app.config.ts`:

```ts
export const APP_CONFIG = {
  apiBaseUrl: 'http://localhost:5136',
  defaultPageSize: 10,
};
```
