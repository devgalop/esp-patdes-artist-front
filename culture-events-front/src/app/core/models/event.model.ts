export interface EventDetails {
  type?: string;
  billingType?: string;
  price?: string;
  location?: string;
}

export interface CulturalEvent {
  id?: string;
  name: string;
  description: string;
  scheduledAt: string;
  status?: string;
  type?: string;
  billingType?: string;
  details?: EventDetails;
}

export interface EventsResponse {
  events: CulturalEvent[];
}

export interface CreateEventDto {
  name: string;
  description: string;
  scheduledAt: string;
  details: EventDetails;
}

export interface RescheduleEventDto {
  EventId: string;
  NewDate: string;
}
