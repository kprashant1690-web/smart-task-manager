import { Button } from "@/components/ui/button";
import type { Page } from "@/types";
import { CheckSquare, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const navLinks: { label: string; page: Page; ocid: string }[] = [
  { label: "Home", page: "home", ocid: "nav.home_link" },
  { label: "Dashboard", page: "dashboard", ocid: "nav.dashboard_link" },
  { label: "Add Task", page: "add-task", ocid: "nav.add_task_link" },
  { label: "About", page: "about", ocid: "nav.about_link" },
];

export function Navbar({
  currentPage,
  onNavigate,
  darkMode,
  onToggleDark,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-xs">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <CheckSquare
              className="w-4.5 h-4.5 text-primary-foreground"
              strokeWidth={2.5}
            />
          </div>
          <span className="font-display font-700 text-lg tracking-tight text-foreground">
            Smart<span className="text-primary">Task</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, page, ocid }) => (
            <li key={page}>
              <button
                type="button"
                data-ocid={ocid}
                onClick={() => onNavigate(page)}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Dark toggle + hamburger */}
        <div className="flex items-center gap-2">
          <Button
            data-ocid="nav.dark_mode_toggle"
            variant="ghost"
            size="icon"
            onClick={onToggleDark}
            className="h-9 w-9 rounded-md text-muted-foreground hover:text-foreground"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            data-ocid="nav.menu_toggle"
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-md text-muted-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ label, page, ocid }) => (
              <li key={page}>
                <button
                  type="button"
                  data-ocid={ocid}
                  onClick={() => {
                    onNavigate(page);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
