import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { useTasks } from "@/hooks/useTasks";
import { AboutPage } from "@/pages/AboutPage";
import { AddTaskPage } from "@/pages/AddTaskPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { HomePage } from "@/pages/HomePage";
import type { Page, Task } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DARK_KEY = "stm_dark";

function initDarkMode(): boolean {
  const stored = localStorage.getItem(DARK_KEY);
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState<boolean>(initDarkMode);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem(DARK_KEY, String(darkMode));
  }, [darkMode]);

  const handleNavigate = (target: Page) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    handleNavigate("add-task");
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    toast.success("Task deleted");
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    toggleComplete(id);
    toast.success(
      task.completed ? "Task marked as active" : "Task completed! 🎉",
    );
  };

  const handleAddTask = (
    data: Omit<Task, "id" | "createdAt" | "completed">,
  ) => {
    addTask(data);
    toast.success("Task added successfully");
  };

  const handleUpdateTask = (
    id: string,
    data: Partial<Omit<Task, "id" | "createdAt">>,
  ) => {
    updateTask(id, data);
    setEditingTask(null);
    toast.success("Task updated");
  };

  const handleNavigatePage = (target: Page) => {
    if (target !== "add-task") setEditingTask(null);
    handleNavigate(target);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        currentPage={page}
        onNavigate={handleNavigatePage}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((v) => !v)}
      />

      <div className="flex-1 flex flex-col animate-fade-in" key={page}>
        {page === "home" && (
          <HomePage tasks={tasks} onNavigate={handleNavigatePage} />
        )}
        {page === "dashboard" && (
          <DashboardPage
            tasks={tasks}
            onNavigate={handleNavigatePage}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        {page === "add-task" && (
          <AddTaskPage
            editingTask={editingTask}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onNavigate={handleNavigatePage}
          />
        )}
        {page === "about" && <AboutPage />}
      </div>

      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
