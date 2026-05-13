import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="empty-state">
      <mat-icon class="empty-state__icon">{{ icon() }}</mat-icon>
      <h3 class="empty-state__title">{{ title() }}</h3>
      <p class="empty-state__message">{{ message() }}</p>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      gap: 12px;
      color: var(--mat-sys-on-surface-variant);
    }
    .empty-state__icon { font-size: 64px; width: 64px; height: 64px; opacity: .5; }
    .empty-state__title { margin: 0; font-size: 1.25rem; font-weight: 500; }
    .empty-state__message { margin: 0; font-size: .9rem; opacity: .75; text-align: center; }
  `]
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly icon = input<string>('inbox');
}
