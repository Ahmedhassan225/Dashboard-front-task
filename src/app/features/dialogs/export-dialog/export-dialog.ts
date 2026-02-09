import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { ExportService } from '../../../services/export.service';

@Component({
  selector: 'app-export-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './export-dialog.html',
  styleUrl: './export-dialog.scss'
})
export class ExportDialog {
  private readonly taskService = inject(TaskService);
  private readonly exportService = inject(ExportService);
  private readonly dialogRef = inject(MatDialogRef<ExportDialog>);

  readonly availableFormats: string[];
  selectedFormat: string;

  constructor() {
    this.availableFormats = this.exportService.getAvailableFormats();
    this.selectedFormat = this.availableFormats[0] || '';
  }

  export(): void {
    const tasks = this.taskService.tasks();
    this.exportService.exportTasks(tasks, this.selectedFormat);
    this.dialogRef.close();
  }
}
