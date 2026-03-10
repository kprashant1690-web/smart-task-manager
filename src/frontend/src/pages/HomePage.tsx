import { Button } from "@/components/ui/button";
import type { Page, Task } from "@/types";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ListTodo,
  Sparkles,
} from "lucide-react";

interface HomePageProps {
  tasks: Task[];
  onNavigate: (page: Page) => void;
}

export function HomePage({ tasks, onNavigate }: HomePageProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      color: "text-primary",
      bg: "bg-accent",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-[oklch(0.6_0.16_145)]",
      bg: "bg-[oklch(0.6_0.16_145/0.1)]",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-[oklch(0.62_0.22_25)]",
      bg: "bg-[oklch(0.62_0.22_25/0.1)]",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.72 0.18 55 / 0.08), transparent)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              Your personal productivity command center
            </div>
            <h1
              className="font-display font-800 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground animate-fade-in-up"
              style={{ animationDelay: "80ms" }}
            >
              Manage tasks
              <br />
              <span className="text-primary">with precision.</span>
            </h1>
            <p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg animate-fade-in-up"
              style={{ animationDelay: "160ms" }}
            >
              A focused task manager that helps you stay organized, prioritize
              what matters, and accomplish more every day.
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3 animate-fade-in-up"
              style={{ animationDelay: "240ms" }}
            >
              <Button
                data-ocid="home.cta_button"
                size="lg"
                className="gap-2 font-semibold"
                onClick={() => onNavigate("dashboard")}
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 font-semibold"
                onClick={() => onNavigate("add-task")}
              >
                Add New Task
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h2 className="font-display font-700 text-2xl text-foreground mb-8">
          Your Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
            <div
              key={label}
              className="bg-card rounded-xl p-6 shadow-card border border-border animate-fade-in-up"
              style={{ animationDelay: `${i * 80 + 300}ms` }}
            >
              <div
                className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="font-display font-800 text-3xl text-foreground">
                {value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {total > 0 && (
          <div
            className="mt-6 bg-card rounded-xl p-6 shadow-card border border-border animate-fade-in-up"
            style={{ animationDelay: "560ms" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">
                Completion Rate
              </span>
              <span className="font-display font-700 text-lg text-primary">
                {completionRate}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {completed} of {total} tasks completed
            </p>
          </div>
        )}
      </section>

      {/* Feature highlights */}
      <section className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h2 className="font-display font-700 text-2xl text-foreground mb-8">
            Why SmartTask?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Priority-first workflow",
                desc: "Color-coded priority levels help you immediately see what demands attention today.",
                emoji: "🎯",
              },
              {
                title: "Offline-ready storage",
                desc: "All your tasks live in your browser. No account needed, no data leaving your device.",
                emoji: "🔒",
              },
              {
                title: "Instant search & filter",
                desc: "Find any task in milliseconds with real-time search across titles and descriptions.",
                emoji: "⚡",
              },
            ].map(({ title, desc, emoji }, i) => (
              <div
                key={title}
                className="rounded-xl p-6 border border-border bg-background animate-fade-in-up"
                style={{ animationDelay: `${i * 80 + 200}ms` }}
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="font-display font-600 text-base text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
