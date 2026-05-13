import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CulturalEvent, CreateEventDto, RescheduleEventDto, EventsResponse } from '../models/event.model';
import { PaginationParams } from '../models/pagination.model';

@Injectable({ providedIn: 'root' })
export class EventsApiService {
  private readonly api = inject(ApiService);

  getEvents(params: PaginationParams): Observable<EventsResponse> {
    return this.api.get<EventsResponse>('/events', {
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    });
  }

  getEventById(id: string): Observable<CulturalEvent> {
    return this.api.get<CulturalEvent>(`/events/${id}`);
  }

  createEvent(dto: CreateEventDto): Observable<CulturalEvent> {
    return this.api.post<CulturalEvent>('/events', dto);
  }

  rescheduleEvent(dto: RescheduleEventDto): Observable<void> {
    return this.api.put<void>('/events/reschedule', dto);
  }
}
