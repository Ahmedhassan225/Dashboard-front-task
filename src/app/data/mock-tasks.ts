import { Task } from '../models/task.model';

const now = new Date();
const iso = (date: Date) => date.toISOString();
const daysAgo = (days: number) => iso(new Date(now.getTime() - days * 24 * 60 * 60 * 1000));
const daysFromNow = (days: number) => iso(new Date(now.getTime() + days * 24 * 60 * 60 * 1000));

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Design new homepage layout',
    description: 'Create wireframes and mockups for the new homepage redesign.',
    status: 'todo',
    priority: 'high',
    dueDate: daysFromNow(2),
    assignee: { id: 'user-001', name: 'John Doe', initials: 'JD', role: 'Designer' },
    tags: ['Design', 'Frontend'],
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1)
  },
  {
    id: 'task-002',
    title: 'Update documentation',
    description: 'Review and update API documentation for the next release.',
    status: 'todo',
    priority: 'medium',
    dueDate: daysFromNow(5),
    assignee: { id: 'user-002', name: 'Sarah Smith', initials: 'SS', role: 'Technical Writer' },
    tags: ['Docs'],
    createdAt: daysAgo(6),
    updatedAt: daysAgo(2)
  },
  {
    id: 'task-003',
    title: 'Fix responsive layout issues',
    description: 'Address layout problems on mobile and tablet devices.',
    status: 'todo',
    priority: 'high',
    dueDate: daysFromNow(3),
    assignee: { id: 'user-003', name: 'Emily Davis', initials: 'ED', role: 'QA Engineer' },
    tags: ['Frontend', 'Bug'],
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1)
  },
  {
    id: 'task-004',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication with refresh tokens.',
    status: 'in_progress',
    priority: 'high',
    dueDate: daysFromNow(3),
    assignee: { id: 'user-004', name: 'Mike Johnson', initials: 'MJ', role: 'Developer' },
    tags: ['Backend', 'Security'],
    createdAt: daysAgo(7),
    updatedAt: daysAgo(0)
  },
  {
    id: 'task-005',
    title: 'Optimize database queries',
    description: 'Review and optimize slow queries from performance audit.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: daysFromNow(4),
    assignee: { id: 'user-002', name: 'Sarah Smith', initials: 'SS', role: 'Engineer' },
    tags: ['Performance'],
    createdAt: daysAgo(8),
    updatedAt: daysAgo(1)
  },
  {
    id: 'task-006',
    title: 'Create API endpoints',
    description: 'Develop REST endpoints for task management features.',
    status: 'in_progress',
    priority: 'high',
    dueDate: daysFromNow(2),
    assignee: { id: 'user-004', name: 'Mike Johnson', initials: 'MJ', role: 'Developer' },
    tags: ['Backend', 'API'],
    createdAt: daysAgo(10),
    updatedAt: daysAgo(0)
  },
  {
    id: 'task-007',
    title: 'Fix critical login bug',
    description: 'Resolved issue preventing users from logging in on mobile.',
    status: 'done',
    priority: 'high',
    dueDate: daysAgo(1),
    assignee: { id: 'user-003', name: 'Emily Davis', initials: 'ED', role: 'QA Engineer' },
    tags: ['Bug', 'Mobile'],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1)
  },
  {
    id: 'task-008',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment.',
    status: 'done',
    priority: 'medium',
    dueDate: daysAgo(2),
    assignee: { id: 'user-004', name: 'Mike Johnson', initials: 'MJ', role: 'DevOps' },
    tags: ['DevOps'],
    createdAt: daysAgo(9),
    updatedAt: daysAgo(2)
  },
  {
    id: 'task-009',
    title: 'Security audit',
    description: 'Conduct a security review of the application.',
    status: 'done',
    priority: 'high',
    dueDate: daysAgo(5),
    assignee: { id: 'user-001', name: 'John Doe', initials: 'JD', role: 'Security' },
    tags: ['Security'],
    createdAt: daysAgo(12),
    updatedAt: daysAgo(4)
  }
];

