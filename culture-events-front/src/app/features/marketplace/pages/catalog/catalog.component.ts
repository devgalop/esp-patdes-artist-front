import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MarketplaceFacade } from '../../facades/marketplace.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/ui/empty-state/empty-state.component';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatCardModule,
    MatButtonModule, MatChipsModule, MatIconModule, RouterLink,
    PageHeaderComponent, EmptyStateComponent, CurrencyFormatPipe
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  private readonly facade = inject(MarketplaceFacade);

  readonly products = this.facade.products;
  readonly currentProvider = this.facade.currentProvider;

  readonly providers = ['HomeForniture', 'HiperSound', 'MultiSound'];
  readonly providerControl = new FormControl<string>('HomeForniture');

  ngOnInit(): void {
    this.loadProvider(this.providerControl.value!);
    this.providerControl.valueChanges.subscribe(v => { if (v) this.loadProvider(v); });
  }

  loadProvider(providerId: string): void {
    this.facade.loadCatalog(providerId);
  }
}
