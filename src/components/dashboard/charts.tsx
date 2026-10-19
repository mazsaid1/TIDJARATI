"use client";

import { useId } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn, formatCurrency, formatNumber } from "@/lib/utils";

/* --------------------------------- Tooltip -------------------------------- */

function ChartTooltip({
  active,
  payload,
  label,
  format = "currency",
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string }>;
  label?: string;
  format?: "currency" | "number" | "plain";
}) {
  if (!active || !payload?.length) return null;
  const fmt = (v: number) =>
    format === "currency" ? formatCurrency(v) : format === "number" ? formatNumber(v) : String(v);

  return (
    <div className="glass rounded-xl px-3.5 py-2.5 text-[12.5px] shadow-[var(--shadow-lg)]">
      {label && <p className="mb-1.5 font-medium text-foreground">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 tabular-nums">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto pl-3 font-semibold text-foreground">
              {fmt(Number(entry.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const axis = {
  stroke: "var(--faint)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

/* ------------------------------ Revenue chart ----------------------------- */

export function RevenueChart({
  data,
  className,
}: {
  data: Array<{ label: string; revenue: number; orders: number }>;
  className?: string;
}) {
  // Stable, SSR-safe identifier (avoids `Math.random()` during prerender).
  const gradientId = `rev-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div className={cn("h-72 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" {...axis} interval="preserveStartEnd" minTickGap={24} />
          <YAxis
            {...axis}
            width={52}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
            }
          />
          <Tooltip
            cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
            content={<ChartTooltip format="currency" />}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Chiffre d'affaires"
            stroke="#7c3aed"
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------------- Donut ----------------------------------- */

export function DonutChart({
  data,
  className,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  className?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className={cn("relative h-56 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="94%"
            paddingAngle={3}
            stroke="none"
            animationDuration={900}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip format="plain" />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold tabular-nums">{total}%</span>
        <span className="text-[11.5px] text-faint">des commandes</span>
      </div>
    </div>
  );
}

/* ------------------------------ Compare bars ------------------------------ */

export function OrdersBarChart({
  data,
  className,
}: {
  data: Array<{ label: string; orders: number }>;
  className?: string;
}) {
  return (
    <div className={cn("h-56 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="label" {...axis} interval="preserveStartEnd" minTickGap={24} />
          <YAxis {...axis} width={40} />
          <Tooltip
            cursor={{ fill: "var(--primary-soft)" }}
            content={<ChartTooltip format="number" />}
          />
          <Bar
            dataKey="orders"
            name="Commandes"
            fill="#a78bfa"
            radius={[6, 6, 2, 2]}
            animationDuration={900}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
