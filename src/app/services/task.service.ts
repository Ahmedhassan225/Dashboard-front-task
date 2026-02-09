import { Injectable, computed, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { MOCK_TASKS } from '../data/mock-tasks';

const STORAGE_KEY = 'dashboard.tasks';

function loadFromStorage(): Task[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasksSignal = signal<Task[]>(loadFromStorage() ?? MOCK_TASKS);

  readonly tasks = this.tasksSignal.asReadonly();

  readonly todoTasks = computed(() => this.tasks().filter((task) => task.status === 'todo'));
  readonly inProgressTasks = computed(() => this.tasks().filter((task) => task.status === 'in_progress'));
  readonly doneTasks = computed(() => this.tasks().filter((task) => task.status === 'done'));

  readonly taskStats = computed(() => ({
    total: this.tasks().length,
    todo: this.todoTasks().length,
    inProgress: this.inProgressTasks().length,
    done: this.doneTasks().length
  }));

  readonly tasksByDay = computed(() => {
    const days = 7;
    const today = new Date();
    const labels: string[] = [];
    const values: number[] = [];

    for (let i = days - 1; i >= 0; i -= 1) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      labels.push(label);

      const count = this.tasks().filter((task) => {
        const created = new Date(task.createdAt);
        return created.toDateString() === date.toDateString();
      }).length;

      values.push(count);
    }

    return { labels, values };
  });

  readonly tasksByStatus = computed(() => ([
    { label: 'Todo', value: this.todoTasks().length },
    { label: 'In Progress', value: this.inProgressTasks().length },
    { label: 'Done', value: this.doneTasks().length }
  ]));

  addTask(task: Task): void {
    this.tasksSignal.update((tasks) => {
      const next = [task, ...tasks];
      saveToStorage(next);
      return next;
    });
  }

  updateTask(updated: Task): void {
    this.tasksSignal.update((tasks) => {
      const next = tasks.map((task) => (task.id === updated.id ? updated : task));
      saveToStorage(next);
      return next;
    });
  }

  deleteTask(id: string): void {
    this.tasksSignal.update((tasks) => {
      const next = tasks.filter((task) => task.id !== id);
      saveToStorage(next);
      return next;
    });
  }

  moveTask(id: string, status: TaskStatus): void {
    const now = new Date().toISOString();
    this.tasksSignal.update((tasks) => {
      const next = tasks.map((task) =>
        task.id === id ? { ...task, status, updatedAt: now } : task
      );
      saveToStorage(next);
      return next;
    });
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }
}

