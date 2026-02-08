import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { NotFoundPage } from './features/not-found/not-found.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES)
  },
  {
    path: '**',
    component: NotFoundPage
  }
];
