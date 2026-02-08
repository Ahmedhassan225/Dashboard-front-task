export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskAssignee {
  id: string;
  name: string;
  initials: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority?: TaskPriority;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignee?: TaskAssignee;
  tags?: string[];
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done'
};

export const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];

