import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  private readonly taskService = inject(TaskService);

  readonly stats = this.taskService.taskStats;
  readonly statusData = this.taskService.tasksByStatus;
  readonly trendData = this.taskService.tasksByDay;

  readonly statusChartData = computed<ChartConfiguration<'doughnut'>['data']>(() => ({
    labels: this.statusData().map((item) => item.label),
    datasets: [
      {
        data: this.statusData().map((item) => item.value),
        backgroundColor: ['#1f6feb', '#f59e0b', '#22c55e']
      }
    ]
  }));

  readonly trendChartData = computed<ChartConfiguration<'line'>['data']>(() => ({
    labels: this.trendData().labels,
    datasets: [
      {
        data: this.trendData().values,
        label: 'Tasks created',
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.15)',
        tension: 0.35,
        fill: true,
        pointRadius: 3
      }
    ]
  }));

  readonly doughnutOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          color: '#0f172a'
        }
      }
    }
  };

  readonly lineOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: '#475569' },
        grid: { color: 'rgba(148, 163, 184, 0.2)' }
      },
      y: {
        ticks: { color: '#475569' },
        grid: { color: 'rgba(148, 163, 184, 0.2)' }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
}
