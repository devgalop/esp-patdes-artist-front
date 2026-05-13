import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

export interface ColumnDef {
  key: string;
  label: string;
  formatter?: (value: unknown) => string;
}

@Component({
  selector: 'app-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatProgressBarModule, EmptyStateComponent],
  template: `
    @if (loading()) {
      <mat-progress-bar mode="indeterminate" />
    }
    @if (!loading() && data().length === 0) {
      <app-empty-state title="No results" [message]="emptyMessage() ?? 'No data to display'" />
    }
    @if (data().length > 0) {
      <table mat-table [dataSource]="data()" class="data-table">
        @for (col of columns(); track col.key) {
          <ng-container [matColumnDef]="col.key">
            <th mat-header-cell *matHeaderCellDef>{{ col.label }}</th>
            <td mat-cell *matCellDef="let row">
              {{ col.formatter ? col.formatter(row[col.key]) : row[col.key] }}
            </td>
          </ng-container>
        }
        <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns();"
            (click)="rowClick.emit(row)"
            [class.clickable]="true">
        </tr>
      </table>
    }
  `,
  styles: [`
    .data-table { width: 100%; }
    tr.mat-mdc-row.clickable { cursor: pointer; }
    tr.mat-mdc-row.clickable:hover { background: var(--mat-sys-surface-variant); }
  `]
})
export class DataTableComponent {
  readonly columns = input.required<ColumnDef[]>();
  readonly data = input.required<unknown[]>();
  readonly loading = input<boolean>(false);
  readonly emptyMessage = input<string>();
  readonly rowClick = output<unknown>();

  displayedColumns = computed(() => this.columns().map(c => c.key));
}
