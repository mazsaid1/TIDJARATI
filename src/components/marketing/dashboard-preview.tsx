"use client";

import { Banknote, ShoppingCart, Target, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";

import { REVENUE_SERIES, ORDERS } from "@/lib/mock/data";
import { OrderStatusBadge } from "@/components/dashboard/status-badge";
import { useI18n } from "@/components/i18n/i18n-provider";

const KPI = [
  { icon: Banknote, label: "CA 30 j", value: "4,82 M", delta: "+18,4 %" },
  { icon: ShoppingCart, label: "Commandes", value: "1 284", delta: "+9,7 %" },
  { icon: Target, label: "Conversion", value: "3,9 %", delta: "+2,1 %" },
];

/** Stylised dashboard preview — hero visual, decorative (aria-hidden). */
export function DashboardPreview() {
  const { t, format } = useI18n();
  const max = Math.max(...REVENUE_SERIES.map((d) => d.revenue));
  const points = REVENUE_SERIES.map((d, i) => {
    const x = (i / (REVENUE_SERIES.length - 1)) * 100;
    const y = 100 - (d.revenue / max) * 82 - 9;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  return (
    <div className="relative mx-auto w-full max-w-4xl" aria-hidden>
      {/* Glow behind */}
      <div className="absolute inset-x-8 -top-6 bottom-0 rounded-[2rem] bg-[image:var(--gradient-brand)] opacity-25 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-glass-border bg-background-elevated shadow-[var(--shadow-lg)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <div className="mx-auto flex h-6 w-56 max-w-[50%] items-center justify-center rounded-md bg-muted text-[10.5px] text-faint">
            app.tidjarati.com/dashboard
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-3">
            {KPI.map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center gap-1.5">
                  <k.icon className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate text-[11px] text-muted-foreground">{t(k.label)}</span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-semibold tracking-tight tabular-nums sm:text-xl">
                    {k.value}
                  </span>
                  <span className="text-[10.5px] font-semibold text-success tabular-nums">{k.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-muted-foreground">{t("Chiffre d’affaires")}</p>
                <p className="font-display text-base font-semibold tabular-nums sm:text-lg">
                  {format.currency(249000)}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10.5px] font-semibold text-success tabular-nums">
                <TrendingUp className="h-3 w-3" /> +18,4 %
              </span>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-3 h-24 w-full sm:h-28">
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`0,100 ${points} 100,100`} fill="url(#hero-area)" />
              <polyline
                points={points}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Mini orders */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {ORDERS.slice(0, 3).map((o, i) => (
              <div
                key={o.id}
                className={`flex items-center gap-3 px-4 py-2.5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="font-mono text-[11px] text-faint">{o.reference}</span>
                <span className="hidden truncate text-[12px] font-medium sm:inline">{o.customer}</span>
                <span className="ms-auto flex items-center gap-2">
                  <OrderStatusBadge status={o.status} />
                  <span className="text-[11.5px] font-semibold tabular-nums">
                    {format.currency(o.total)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI card */}
      <div className="absolute -end-2 -bottom-6 hidden w-64 animate-float rounded-xl border border-glass-border glass p-3.5 shadow-[var(--shadow-lg)] sm:block lg:-end-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <p className="text-[12px] font-semibold">{t("Assistant IA")}</p>
          <ArrowUpRight className="ms-auto h-3.5 w-3.5 text-faint" />
        </div>
        <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
          {t("Relancez les")}{" "}
          <span className="font-semibold text-foreground">{t("312 paniers COD")}</span>{" "}
          {t("abandonnés — impact estimé")}{" "}
          <span className="font-semibold text-success">{t("+142 000 DZD")}</span>.
        </p>
      </div>

      {/* Floating order card */}
      <div className="absolute -bottom-5 start-2 hidden animate-float rounded-xl border border-glass-border glass p-3 shadow-[var(--shadow-lg)] md:block lg:start-6" style={{ animationDelay: "1.4s" }}>
        <p className="text-[10.5px] text-faint">
          {t("Nouvelle commande · {time}", { time: format.relative(ORDERS[0].createdAt) })}
        </p>
        <p className="mt-0.5 text-[12px] font-semibold">
          {ORDERS[0].reference} · {format.currency(ORDERS[0].total)}
        </p>
      </div>
    </div>
  );
}
