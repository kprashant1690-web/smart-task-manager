import { Button } from "@/components/ui/button";
import type { Task } from "@/types";
import { Calendar, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const priorityLabel: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${dateStr}T00:00:00`);
  return due < today;
}

export function TaskCard({
  task,
  index,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskCardProps) {
  const overdue = !task.completed && isOverdue(task.dueDate);
  const idx = index + 1;

  return (
    <article
      data-ocid={`task.item.${idx}`}
      className={`
        relative bg-card rounded-lg shadow-card
        transition-all duration-300 ease-out
        hover:shadow-card-hover hover:-translate-y-0.5
        task-card-${task.priority}
        ${task.completed ? "opacity-70" : ""}
        animate-fade-in-up
      `}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            data-ocid={`task.complete_toggle.${idx}`}
            onClick={() => onToggleComplete(task.id)}
            className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
            aria-label={task.completed ? "Mark as active" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-display font-600 text-base leading-snug ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-card-foreground"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Priority badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold priority-badge-${task.priority}`}
            >
              {priorityLabel[task.priority]}
            </span>

            {/* Due date */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  overdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <Calendar className="w-3 h-3" />
                {overdue && !task.completed ? "Overdue · " : ""}
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button
              data-ocid={`task.edit_button.${idx}`}
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <Button
              data-ocid={`task.delete_button.${idx}`}
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
