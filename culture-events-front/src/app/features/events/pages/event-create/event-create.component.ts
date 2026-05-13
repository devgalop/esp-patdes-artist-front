import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EventsFacade } from '../../facades/events.facade';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { PageHeaderComponent } from '../../../../shared/components/ui/page-header/page-header.component';
import { CreateEventDto } from '../../../../core/models/event.model';

@Component({
  selector: 'app-event-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, EventFormComponent, PageHeaderComponent],
  template: `
    <app-page-header title="Create Event" subtitle="Fill in the details for the new cultural event" />
    <mat-card class="form-card">
      <mat-card-content>
        <app-event-form (formSubmit)="onCreate($event)" />
      </mat-card-content>
    </mat-card>
  `,
  styles: [`.form-card { max-width: 720px; }`],
})
export class EventCreateComponent {
  private readonly facade = inject(EventsFacade);

  onCreate(dto: CreateEventDto): void {
    this.facade.createEvent(dto);
  }
}
