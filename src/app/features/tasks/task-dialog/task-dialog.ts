import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule, MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Task, TaskPriority, TaskStatus } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

type TaskForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
  tags: FormControl<string[]>;
};

@Component({
  selector: 'app-task-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  private readonly taskService = inject(TaskService);
  private readonly dialogRef = inject(MatDialogRef<TaskDialog>);
  readonly data = inject<{ task?: Task, isEditing: boolean }>(MAT_DIALOG_DATA);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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
    priority: new FormControl<TaskPriority>('medium', { nonNullable: true }),
    tags: new FormControl<string[]>([], { nonNullable: true })
  });

  readonly isEditing = computed(() => this.data.isEditing);

  constructor() {
    if (this.data.task) {
      this.form.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        status: this.data.task.status,
        priority: this.data.task.priority ?? 'medium',
        tags: this.data.task.tags ?? []
      });
    } else {
      this.form.reset({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        tags: []
      });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const currentTags = this.form.controls.tags.value;

      if (value.length <= 15 && !currentTags.includes(value)) {
        this.form.controls.tags.setValue([...currentTags, value]);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const currentTags = this.form.controls.tags.value;
    this.form.controls.tags.setValue(currentTags.filter(t => t !== tag));
  }

  editTag(tag: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const currentTags = this.form.controls.tags.value;
    const index = currentTags.indexOf(tag);

    if (index >= 0) {
      // Validation: Max 15 chars and unique (excluding self)
      if (value.length <= 15 && !currentTags.some((t, i) => i !== index && t === value)) {
        const newTags = [...currentTags];
        newTags[index] = value;
        this.form.controls.tags.setValue(newTags);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const now = new Date().toISOString();

    const existing = this.data.task;
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
        tags: value.tags,
        createdAt: now,
        updatedAt: now
      });
    }
    this.dialogRef.close();
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
