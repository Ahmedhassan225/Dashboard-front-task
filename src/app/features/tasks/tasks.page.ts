import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskDialog } from './task-dialog/task-dialog';
import { ExportDialog } from '../../features/dialogs/export-dialog/export-dialog';

@Component({
  selector: 'app-tasks-page',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    TaskCardComponent,
    MatDialogModule,
    PageHeader,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  private readonly taskService = inject(TaskService);
  private readonly dialog = inject(MatDialog);

  readonly columns = computed(() => ([
    { id: 'todo' as TaskStatus, title: 'Todo', tasks: this.taskService.todoTasks() },
    { id: 'in_progress' as TaskStatus, title: 'In Progress', tasks: this.taskService.inProgressTasks() },
    { id: 'done' as TaskStatus, title: 'Done', tasks: this.taskService.doneTasks() }
  ]));

  openCreate(): void {
    this.dialog.open(TaskDialog, {
      data: { isEditing: false }
    });
  }

  openExportDialog(): void {
    this.dialog.open(ExportDialog);
  }

  startEdit(task: Task): void {
    this.dialog.open(TaskDialog, {
      data: { task, isEditing: true }
    });
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
}
