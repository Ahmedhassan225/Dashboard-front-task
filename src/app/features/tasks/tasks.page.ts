import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
};

@Component({
  selector: 'app-tasks-page',
  imports: [
    ReactiveFormsModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    TaskCardComponent
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  private readonly editingTask = signal<Task | null>(null);
  readonly formVisible = signal(false);

  readonly form = new FormGroup<TaskForm>({
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

  readonly columns = computed(() => ([
    { id: 'todo' as TaskStatus, title: 'Todo', tasks: this.taskService.todoTasks() },
    { id: 'in_progress' as TaskStatus, title: 'In Progress', tasks: this.taskService.inProgressTasks() },
    { id: 'done' as TaskStatus, title: 'Done', tasks: this.taskService.doneTasks() }
  ]));

  readonly isEditing = computed(() => this.editingTask() !== null);

  constructor(private readonly taskService: TaskService) { }

  openCreate(): void {
    this.editingTask.set(null);
    this.form.reset({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium'
    });
    this.formVisible.set(true);
  }

  startEdit(task: Task): void {
    this.editingTask.set(task);
    this.form.reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority ?? 'medium'
    });
    this.formVisible.set(true);
  }

  cancelForm(): void {
    this.formVisible.set(false);
    this.editingTask.set(null);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const now = new Date().toISOString();

    const existing = this.editingTask();
    if (existing) {
      this.taskService.updateTask({
        ...existing,
        ...value,
        updatedAt: now
      });
    } else {
      this.taskService.addTask({
        id: this.generateId(),
        title: value.title,
        description: value.description,
        status: value.status,
        priority: value.priority ?? 'medium',
        createdAt: now,
        updatedAt: now
      });
    }

    this.cancelForm();
  }

  deleteTask(task: Task): void {
    const ok = confirm(`Delete "${task.title}"?`);
    if (!ok) {
      return;
    }
    this.taskService.deleteTask(task.id);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const task = event.item.data as Task;
    const status = event.container.id as TaskStatus;
    this.taskService.moveTask(task.id, status);
  }

  canEnter = (_drag: CdkDrag<Task>, drop: CdkDropList<Task[]>): boolean => {
    return drop.id === 'todo' || drop.id === 'in_progress' || drop.id === 'done';
  };

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
