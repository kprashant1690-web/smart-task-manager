import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Page, Priority, Task } from "@/types";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface AddTaskPageProps {
  editingTask: Task | null;
  onAddTask: (data: Omit<Task, "id" | "createdAt" | "completed">) => void;
  onUpdateTask: (
    id: string,
    data: Partial<Omit<Task, "id" | "createdAt">>,
  ) => void;
  onNavigate: (page: Page) => void;
}

const priorityOptions: { value: Priority; label: string; desc: string }[] = [
  { value: "high", label: "High", desc: "Urgent, needs immediate attention" },
  { value: "medium", label: "Medium", desc: "Important but not urgent" },
  { value: "low", label: "Low", desc: "Can wait, do when possible" },
];

export function AddTaskPage({
  editingTask,
  onAddTask,
  onUpdateTask,
  onNavigate,
}: AddTaskPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ title?: string }>({});

  const isEditing = !!editingTask;

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
    setErrors({});
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string } = {};
    if (!title.trim()) newErrors.title = "Task title is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const data = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    };
    if (isEditing && editingTask) {
      onUpdateTask(editingTask.id, data);
    } else {
      onAddTask(data);
    }
    onNavigate("dashboard");
  };

  const selectedPriority = priorityOptions.find((p) => p.value === priority);

  return (
    <main className="flex-1">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="font-display font-700 text-3xl text-foreground">
            {isEditing ? "Edit Task" : "Add New Task"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isEditing
              ? "Update task details below."
              : "Fill in the details for your new task."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-5 animate-fade-in-up">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="task-title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="task-title"
                data-ocid="add_task.title_input"
                placeholder="e.g. Review product roadmap"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors({});
                }}
                className={
                  errors.title
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="task-desc" className="text-sm font-medium">
                Description
                <span className="ml-1.5 text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="task-desc"
                data-ocid="add_task.description_textarea"
                placeholder="Add more context about this task…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as Priority)}
              >
                <SelectTrigger data-ocid="add_task.priority_select">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(({ value, label, desc }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex flex-col">
                        <span>{label}</span>
                        <span className="text-xs text-muted-foreground">
                          {desc}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedPriority && (
                <p className="text-xs text-muted-foreground">
                  {selectedPriority.desc}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="task-due" className="text-sm font-medium">
                Due Date
                <span className="ml-1.5 text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="task-due"
                data-ocid="add_task.due_date_input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            <Button
              type="submit"
              data-ocid="add_task.submit_button"
              className="gap-2 font-semibold flex-1 sm:flex-none"
            >
              <Save className="w-4 h-4" />
              {isEditing ? "Save Changes" : "Add Task"}
            </Button>
            <Button
              type="button"
              data-ocid="add_task.cancel_button"
              variant="outline"
              onClick={() => onNavigate("dashboard")}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
