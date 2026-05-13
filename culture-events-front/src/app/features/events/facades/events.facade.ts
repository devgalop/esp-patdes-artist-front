import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { EventsApiService } from '../../../core/services/events-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CulturalEvent, CreateEventDto, RescheduleEventDto } from '../../../core/models/event.model';
import { PaginationParams } from '../../../core/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class EventsFacade {
  private readonly api = inject(EventsApiService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  readonly events = signal<CulturalEvent[]>([]);
  readonly selectedEvent = signal<CulturalEvent | null>(null);
  readonly totalCount = signal(0);
  readonly pageSize = signal(10);
  readonly pageNumber = signal(1);
  readonly totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  loadEvents(params?: Partial<PaginationParams>): void {
    const p: PaginationParams = {
      pageNumber: params?.pageNumber ?? this.pageNumber(),
      pageSize: params?.pageSize ?? this.pageSize(),
    };
    this.api.getEvents(p).subscribe(res => {
      this.events.set(res.events ?? []);
      this.totalCount.set(res.events?.length ?? 0);
      this.pageNumber.set(p.pageNumber);
    });
  }

  loadEventById(id: string): void {
    this.api.getEventById(id).subscribe(event => this.selectedEvent.set(event));
  }

  createEvent(dto: CreateEventDto): void {
    this.api.createEvent(dto).subscribe({
      next: () => {
        this.notification.success('Event created successfully');
        this.router.navigate(['/events']);
      },
      error: () => {
        this.notification.error('Failed to create event');
      },
    });
  }

  rescheduleEvent(dto: RescheduleEventDto): void {
    this.api.rescheduleEvent(dto).subscribe({
      next: () => {
        this.notification.success('Event rescheduled successfully');
        this.router.navigate(['/events', dto.EventId]);
      },
      error: () => {
        this.notification.error('Failed to reschedule event');
      },
    });
  }

  changePage(pageNumber: number): void {
    this.loadEvents({ pageNumber });
  }
}
