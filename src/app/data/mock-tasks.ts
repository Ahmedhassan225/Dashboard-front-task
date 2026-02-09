import { Task, TaskAssignee, TaskPriority, TaskStatus } from '../models/task.model';

const now = new Date();

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

const users: TaskAssignee[] = [
  {
    id: 'user-001',
    name: 'John Doe',
    initials: 'JD',
    role: 'Developer'
  },
  {
    id: 'user-002',
    name: 'Sarah Smith',
    initials: 'SS',
    role: 'Designer'
  },
  {
    id: 'user-003',
    name: 'Mike Johnson',
    initials: 'MJ',
    role: 'Project Manager'
  },
  {
    id: 'user-004',
    name: 'Emily Davis',
    initials: 'ED',
    role: 'QA Engineer'
  }
];

function generateTasks(): Task[] {
  return [
    // TODO TASKS
    {
      id: 'task-001',
      title: 'Design new homepage layout',
      description: 'Create wireframes and mockups for the new homepage redesign with modern UI elements',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, 2)),
      assignee: users[0],
      tags: ['Design', 'Frontend'],
      createdAt: addDays(now, -2).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-002',
      title: 'Update documentation',
      description: 'Review and update API documentation for v2.0 release',
      status: 'todo',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 5)),
      assignee: users[1],
      tags: ['Documentation'],
      createdAt: addDays(now, -3).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },
    {
      id: 'task-003',
      title: 'Fix responsive design issues',
      description: 'Address layout problems on mobile and tablet devices',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, 3)),
      assignee: users[3],
      tags: ['Frontend', 'Bug Fix'],
      createdAt: addDays(now, -5).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-004',
      title: 'Organize team meeting',
      description: 'Schedule and prepare agenda for quarterly planning session',
      status: 'todo',
      priority: 'low',
      dueDate: formatDate(addDays(now, 7)),
      assignee: users[2],
      tags: ['Admin', 'Planning'],
      createdAt: addDays(now, -4).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },

    // OVERDUE TODO TASKS
    {
      id: 'task-015',
      title: 'Prepare Q4 budget report',
      description: 'Compile and analyze financial data for quarterly budget presentation',
      status: 'todo',
      priority: 'high',
      dueDate: formatDate(addDays(now, -2)),
      assignee: users[1],
      tags: ['Finance', 'Critical'],
      createdAt: addDays(now, -16).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-016',
      title: 'Review client feedback',
      description: 'Analyze customer feedback from user testing sessions',
      status: 'todo',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -3)),
      assignee: users[3],
      tags: ['Research', 'Feedback'],
      createdAt: addDays(now, -15).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },

    // IN PROGRESS TASKS
    {
      id: 'task-005',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with refresh tokens',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, 3)),
      assignee: users[0],
      tags: ['Backend', 'Security'],
      createdAt: addDays(now, -7).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-006',
      title: 'Optimize database queries',
      description: 'Review and optimize slow queries identified in performance audit',
      status: 'in_progress',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 4)),
      assignee: users[1],
      tags: ['Performance', 'Backend'],
      createdAt: addDays(now, -6).toISOString(),
      updatedAt: addDays(now, -0.5).toISOString()
    },
    {
      id: 'task-007',
      title: 'Create API endpoints',
      description: 'Develop RESTful API endpoints for task management features',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, 2)),
      assignee: users[2],
      tags: ['Backend', 'API'],
      createdAt: addDays(now, -8).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-008',
      title: 'Add dark mode support',
      description: 'Implement theme toggle with dark/light mode preferences',
      status: 'in_progress',
      priority: 'medium',
      dueDate: formatDate(addDays(now, 6)),
      assignee: users[3],
      tags: ['Frontend', 'UI/UX'],
      createdAt: addDays(now, -9).toISOString(),
      updatedAt: addDays(now, -0.3).toISOString()
    },

    // OVERDUE IN PROGRESS TASK
    {
      id: 'task-017',
      title: 'Update payment gateway integration',
      description: 'Migrate to new payment provider API and update billing logic',
      status: 'in_progress',
      priority: 'high',
      dueDate: formatDate(addDays(now, -1)),
      assignee: users[0],
      tags: ['Backend', 'Critical', 'Payments'],
      createdAt: addDays(now, -14).toISOString(),
      updatedAt: now.toISOString()
    },

    // DONE TASKS
    {
      id: 'task-009',
      title: 'Fix critical login bug',
      description: 'Resolved issue preventing users from logging in on mobile devices',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -1)),
      assignee: users[2],
      tags: ['Bug Fix', 'Mobile'],
      createdAt: addDays(now, -2).toISOString(),
      updatedAt: now.toISOString()
    },
    {
      id: 'task-010',
      title: 'Setup CI/CD pipeline',
      description: 'Configured GitHub Actions for automated testing and deployment',
      status: 'done',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -2)),
      assignee: users[0],
      tags: ['DevOps', 'Infrastructure'],
      createdAt: addDays(now, -9).toISOString(),
      updatedAt: addDays(now, -1).toISOString()
    },
    {
      id: 'task-011',
      title: 'Write unit tests',
      description: 'Add comprehensive unit tests for authentication module',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -3)),
      assignee: users[1],
      tags: ['Testing', 'QA'],
      createdAt: addDays(now, -10).toISOString(),
      updatedAt: addDays(now, -2).toISOString()
    },
    {
      id: 'task-012',
      title: 'Refactor payment module',
      description: 'Clean up and optimize payment processing code',
      status: 'done',
      priority: 'medium',
      dueDate: formatDate(addDays(now, -4)),
      assignee: users[3],
      tags: ['Refactoring', 'Code Quality'],
      createdAt: addDays(now, -12).toISOString(),
      updatedAt: addDays(now, -3).toISOString()
    },
    {
      id: 'task-013',
      title: 'Security audit',
      description: 'Conduct comprehensive security review of the application',
      status: 'done',
      priority: 'high',
      dueDate: formatDate(addDays(now, -5)),
      assignee: users[0],
      tags: ['Security', 'Audit'],
      createdAt: addDays(now, -13).toISOString(),
      updatedAt: addDays(now, -4).toISOString()
    },
    {
      id: 'task-014',
      title: 'Update dependencies',
      description: 'Update all npm packages to latest stable versions',
      status: 'done',
      priority: 'low',
      dueDate: formatDate(addDays(now, -6)),
      assignee: users[2],
      tags: ['Maintenance', 'Dependencies'],
      createdAt: addDays(now, -14).toISOString(),
      updatedAt: addDays(now, -5).toISOString()
    }
  ];
}

export const MOCK_TASKS: Task[] = generateTasks();

