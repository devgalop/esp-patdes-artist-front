import { Injectable, inject, signal } from '@angular/core';
import { MarketplaceApiService } from '../../../core/services/marketplace-api.service';
import { CatalogProduct } from '../../../core/models/catalog.model';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable({ providedIn: 'root' })
export class MarketplaceFacade {
  private readonly api = inject(MarketplaceApiService);
  private readonly notification = inject(NotificationService);

  readonly products = signal<CatalogProduct[]>([]);
  readonly currentProvider = signal<string>('');

  loadCatalog(providerId: string): void {
    this.currentProvider.set(providerId);
    this.api.getCatalogByProvider(providerId).subscribe({
      next: (res) => this.products.set(res.catalog?.items ?? []),
      error: () => {}
    });
  }
}
