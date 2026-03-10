export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // ISO date string
  completed: boolean;
  createdAt: string;
};

export type Page = "home" | "dashboard" | "add-task" | "about";

export type FilterTab = "all" | "active" | "completed";
