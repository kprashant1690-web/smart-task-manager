import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FilterTab, Page, Task } from "@/types";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

interface DashboardPageProps {
  tasks: Task[];
  onNavigate: (page: Page) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function DashboardPage({
  tasks,
  onNavigate,
  onEditTask,
  onDeleteTask,
  onToggleComplete,
}: DashboardPageProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  const filtered = tasks.filter((t) => {
    const matchesSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !t.completed) ||
      (filter === "completed" && t.completed);
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const handleDeleteRequest = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setDeleteTarget(task);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDeleteTask(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-700 text-3xl text-foreground">
              Task Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {counts.active} active · {counts.completed} completed
            </p>
          </div>
          <Button
            className="gap-2 w-full sm:w-auto font-semibold"
            onClick={() => onNavigate("add-task")}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="dashboard.search_input"
              placeholder="Search tasks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger data-ocid="dashboard.filter_all_tab" value="all">
                All ({counts.all})
              </TabsTrigger>
              <TabsTrigger
                data-ocid="dashboard.filter_active_tab"
                value="active"
              >
                Active ({counts.active})
              </TabsTrigger>
              <TabsTrigger
                data-ocid="dashboard.filter_completed_tab"
                value="completed"
              >
                Done ({counts.completed})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Task list */}
        <div data-ocid="dashboard.task_list">
          {filtered.length === 0 ? (
            <div
              data-ocid="dashboard.empty_state"
              className="py-20 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display font-600 text-lg text-foreground mb-2">
                {search ? "No tasks found" : "No tasks here"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {search
                  ? `No tasks match "${search}". Try a different search.`
                  : filter === "completed"
                    ? "You haven't completed any tasks yet. Keep going!"
                    : "You're all caught up! Add a new task to get started."}
              </p>
              {!search && filter !== "completed" && (
                <Button
                  className="mt-5 gap-2"
                  size="sm"
                  onClick={() => onNavigate("add-task")}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add your first task
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((task, i) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={i}
                  onEdit={onEditTask}
                  onDelete={handleDeleteRequest}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        taskTitle={deleteTarget?.title ?? ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}
