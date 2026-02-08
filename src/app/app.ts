import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';
import { ExportService } from './services/export.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly nav = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' }
  ];

  readonly showExportDialog = signal(false);

  constructor(
    private readonly taskService: TaskService,
    private readonly exportService: ExportService
  ) { }

  openExportDialog(): void {
    console.log('Export dialog opened');
    this.showExportDialog.set(true);
  }

  closeExportDialog(): void {
    this.showExportDialog.set(false);
  }

  exportToJson(): void {
    const tasks = this.taskService.tasks();
    this.exportService.exportTasks(tasks, 'json');
    this.closeExportDialog();
  }
}
