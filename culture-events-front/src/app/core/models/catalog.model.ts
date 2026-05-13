export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string;
  providerId?: string;
}

export interface CatalogItem {
  providerId: string;
  items: CatalogProduct[];
}

export interface CatalogResponse {
  catalog: CatalogItem;
}
