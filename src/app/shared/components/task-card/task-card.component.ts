import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  readonly statusLabels = TASK_STATUS_LABELS;

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onRemove(): void {
    this.remove.emit(this.task);
  }
}
