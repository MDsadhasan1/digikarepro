"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export default function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-lg bg-muted animate-pulse",
          size === "sm" ? "w-8 h-8" : "w-9 h-9",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-all duration-200",
        size === "sm" ? "w-8 h-8" : "w-9 h-9",
        className
      )}
    >
      <Sun
        className={cn(
          "absolute transition-all duration-300",
          size === "sm" ? "w-4 h-4" : "w-5 h-5",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}
      />
      <Moon
        className={cn(
          "absolute transition-all duration-300",
          size === "sm" ? "w-4 h-4" : "w-5 h-5",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}
      />
    </button>
  );
}
