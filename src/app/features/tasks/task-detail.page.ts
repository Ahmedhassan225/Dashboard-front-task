import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Task, TaskPriority, TaskStatus, TASK_STATUS_LABELS } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

type TaskDetailForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
};

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './task-detail.page.html',
  styleUrl: './task-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  private readonly paramMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  readonly id = computed(() => this.paramMap().get('id') ?? '');
  readonly task = computed(() => this.taskService.getTaskById(this.id()));
  readonly statusLabels = TASK_STATUS_LABELS;

  readonly form = new FormGroup<TaskDetailForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(80)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(240)]
    }),
    status: new FormControl<TaskStatus>('todo', { nonNullable: true }),
    priority: new FormControl<TaskPriority>('medium', { nonNullable: true })
  });

  constructor() {
    effect(() => {
      const task = this.task();
      if (!task) {
        return;
      }
      this.form.reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority ?? 'medium'
      });
    });
  }

  save(): void {
    if (this.form.invalid || !this.task()) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const existing = this.task() as Task;
    this.taskService.updateTask({
      ...existing,
      ...value,
      updatedAt: new Date().toISOString()
    });
  }
}
