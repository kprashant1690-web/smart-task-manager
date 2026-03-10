import type { Priority, Task } from "@/types";
import { useCallback, useState } from "react";

const STORAGE_KEY = "stm_tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : getDefaultTasks();
  } catch {
    return getDefaultTasks();
  }
}

function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getDefaultTasks(): Task[] {
  return [
    {
      id: "1",
      title: "Design new landing page",
      description:
        "Create wireframes and high-fidelity mockups for the product landing page redesign. Coordinate with the marketing team for copy.",
      priority: "high" as Priority,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Review Q3 performance metrics",
      description:
        "Analyze sales data, user engagement metrics, and compare against Q2 targets. Prepare a summary report for stakeholders.",
      priority: "medium" as Priority,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      title: "Set up CI/CD pipeline",
      description:
        "Configure GitHub Actions for automated testing and deployment to staging and production environments.",
      priority: "high" as Priority,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      title: "Write unit tests for auth module",
      description:
        "Cover login, registration, and token refresh flows with Jest and React Testing Library. Target 85% coverage.",
      priority: "medium" as Priority,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      title: "Update project documentation",
      description:
        "Revise the README, API docs, and onboarding guide to reflect recent architectural changes.",
      priority: "low" as Priority,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: false,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "6",
      title: "Conduct team retrospective",
      description:
        "Facilitate the sprint retrospective meeting, gather feedback on what went well and areas for improvement.",
      priority: "low" as Priority,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      completed: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

export function useTasks() {
  const [tasks, setTasksState] = useState<Task[]>(loadTasks);

  const setTasks = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasksState((prev) => {
      const next = updater(prev);
      saveTasks(next);
      return next;
    });
  }, []);

  const addTask = useCallback(
    (data: Omit<Task, "id" | "createdAt" | "completed">) => {
      const task: Task = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [task, ...prev]);
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (id: string, data: Partial<Omit<Task, "id" | "createdAt">>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks],
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    },
    [setTasks],
  );

  return { tasks, addTask, updateTask, deleteTask, toggleComplete };
}
