import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaLabel,
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  hint?: string;
  className?: string;
}) {
  const up = delta >= 0;
  return (
    <Card className={cn("group relative overflow-hidden p-5", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -end-16 h-36 w-36 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold tabular-nums",
            up ? "bg-success/10 text-success" : "bg-danger/10 text-danger",
          )}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {deltaLabel ?? formatPercent(Math.abs(delta) * (up ? 1 : -1)).replace("+", up ? "+" : "")}
        </span>
      </div>
      <p className="mt-4 font-display text-[26px] leading-none font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      {hint && <p className="mt-2 text-[12.5px] text-faint">{hint}</p>}
    </Card>
  );
}
