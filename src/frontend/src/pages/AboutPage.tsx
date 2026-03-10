import { CheckCircle2, Moon, Search, Shield, Tag, Zap } from "lucide-react";

export function AboutPage() {
  const features = [
    {
      icon: CheckCircle2,
      title: "Full CRUD",
      desc: "Add, edit, delete, and complete tasks with fluid interactions.",
    },
    {
      icon: Zap,
      title: "Instant Search",
      desc: "Real-time filtering across titles and descriptions.",
    },
    {
      icon: Tag,
      title: "Priority System",
      desc: "Three-tier priority (High, Medium, Low) with visual indicators.",
    },
    {
      icon: Shield,
      title: "Local-first",
      desc: "All data stored in localStorage. Your tasks never leave your browser.",
    },
    {
      icon: Moon,
      title: "Dark Mode",
      desc: "Full dark mode support with preference persistence.",
    },
    {
      icon: Search,
      title: "Smart Filters",
      desc: "Filter by All, Active, or Completed to focus on what matters.",
    },
  ];

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Hero */}
        <div className="mb-12 animate-fade-in-up">
          <h1 className="font-display font-800 text-4xl md:text-5xl text-foreground mb-4">
            About <span className="text-primary">SmartTask</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            SmartTask Manager is a clean, focused productivity tool built for
            people who want to get things done without the overhead of complex
            project management software.
          </p>
        </div>

        {/* Mission */}
        <div
          className="bg-card rounded-xl border border-border shadow-card p-8 mb-8 animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          <h2 className="font-display font-700 text-xl text-foreground mb-3">
            Our Philosophy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe that task management should be fast, intuitive, and
            distraction-free. SmartTask strips away complexity to give you a
            laser focus on what you need to accomplish today. No subscriptions,
            no accounts, no sync — just you and your tasks, working together in
            your browser.
          </p>
        </div>

        {/* Features */}
        <div className="animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <h2 className="font-display font-700 text-xl text-foreground mb-5">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 60 + 240}ms` }}
              >
                <div className="w-9 h-9 rounded-lg bg-accent flex-shrink-0 flex items-center justify-center mt-0.5">
                  <Icon className="w-4.5 h-4.5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-600 text-sm text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div
          className="mt-8 bg-card rounded-xl border border-border shadow-card p-8 animate-fade-in-up"
          style={{ animationDelay: "480ms" }}
        >
          <h2 className="font-display font-700 text-xl text-foreground mb-3">
            Built With
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "shadcn/ui",
              "Vite",
              "LocalStorage API",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
