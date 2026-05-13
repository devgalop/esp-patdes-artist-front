import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { EventsFacade } from '../../facades/events.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { DataTableComponent, ColumnDef } from '../../../../shared/components/ui/data-table/data-table.component';
import { CulturalEvent } from '../../../../core/models/event.model';

@Component({
  selector: 'app-event-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    PageHeaderComponent,
    DataTableComponent,
  ],
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit, OnDestroy {
  private readonly facade = inject(EventsFacade);
  private readonly router = inject(Router);
  private routerSub!: Subscription;

  readonly events = this.facade.events;
  readonly totalCount = this.facade.totalCount;
  readonly pageSize = this.facade.pageSize;
  readonly pageNumber = this.facade.pageNumber;

  readonly columns: ColumnDef[] = [
    { key: 'name', label: 'Name' },
    { key: 'scheduledAt', label: 'Date', formatter: (v) => v ? new Date(v as string).toLocaleDateString('en-US') : '\u2014' },
    { key: 'type', label: 'Type', formatter: (v) => (v as string) ?? '\u2014' },
    { key: 'billingType', label: 'Billing', formatter: (v) => (v as string) ?? '\u2014' },
    { key: 'status', label: 'Status', formatter: (v) => (v as string) ?? '\u2014' },
  ];

  ngOnInit(): void {
    this.facade.loadEvents({ pageNumber: 1, pageSize: this.facade.pageSize() });

    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd && e.urlAfterRedirects === '/events')
    ).subscribe(() => {
      this.facade.loadEvents({ pageNumber: 1, pageSize: this.facade.pageSize() });
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  onRowClick(row: unknown): void {
    const event = row as CulturalEvent;
    if (event.id) this.router.navigate(['/events', event.id]);
  }

  onPageChange(event: PageEvent): void {
    this.facade.changePage(event.pageIndex + 1);
  }
}
