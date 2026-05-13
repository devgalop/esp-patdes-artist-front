import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CatalogResponse } from '../models/catalog.model';

@Injectable({ providedIn: 'root' })
export class MarketplaceApiService {
  private readonly api = inject(ApiService);

  getCatalogByProvider(providerId: string): Observable<CatalogResponse> {
    return this.api.get<CatalogResponse>(`/marketplace/catalog?providerId=${providerId}`);
  }
}
