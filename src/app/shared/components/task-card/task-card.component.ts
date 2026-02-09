import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TASK_STATUS_LABELS } from '../../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [RouterLink],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly edit = output<Task>();
  readonly remove = output<Task>();

  readonly statusLabels = TASK_STATUS_LABELS;

  onEdit(): void {
    this.edit.emit(this.task());
  }

  onRemove(): void {
    this.remove.emit(this.task());
  }
}
