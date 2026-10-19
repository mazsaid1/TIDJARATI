"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/i18n-provider";
import { useIsMounted } from "@/lib/use-mounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const { t } = useI18n();
  const mounted = useIsMounted();

  if (!mounted) {
    return <div className={cn("h-9 w-9 rounded-xl border border-border", className)} aria-hidden />;
  }

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const label =
    theme === "light"
      ? t("Thème clair")
      : theme === "dark"
        ? t("Thème sombre")
        : t("Thème système");

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={t("{label} — cliquer pour basculer", { label })}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          resolvedTheme === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0",
        )}
      />
      <Monitor
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          theme === "system" && resolvedTheme !== "dark" && resolvedTheme !== "light"
            ? "scale-100 opacity-100"
            : "scale-50 opacity-0",
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
