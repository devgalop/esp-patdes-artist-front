import { Component, ChangeDetectionStrategy, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { EventsFacade } from '../../facades/events.facade';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { FormatDatePipe } from '../../../../shared/pipes/format-date.pipe';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-event-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    PageHeaderComponent,
    FormatDatePipe,
    CurrencyFormatPipe,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  private readonly facade = inject(EventsFacade);

  readonly id = input.required<string>();
  readonly event = this.facade.selectedEvent;

  ngOnInit(): void {
    this.facade.loadEventById(this.id());
  }
}
