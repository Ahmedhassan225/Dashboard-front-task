import { Routes } from '@angular/router';
import { TasksPage } from './tasks.page';
import { TaskDetailPage } from './task-detail.page';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: ':id',
    component: TaskDetailPage
  }
];

