import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <h1 class="page-header__title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="page-header__subtitle">{{ subtitle() }}</p>
      }
    </header>
  `,
  styles: [`
    .page-header { margin-bottom: 24px; }
    .page-header__title { margin: 0; font-size: 1.75rem; font-weight: 600; }
    .page-header__subtitle { margin: 4px 0 0; opacity: .65; font-size: .95rem; }
  `]
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
