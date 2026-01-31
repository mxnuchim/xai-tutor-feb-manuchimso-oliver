export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Launched";

export type TaskPriority = "Normal Priority" | "High Priority";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignees: string[];
  dueDate: string;
  priority: TaskPriority;
  isOverdue?: boolean;
}
