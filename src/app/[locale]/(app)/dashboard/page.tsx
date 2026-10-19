import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  ShoppingCart,
  Target,
  Wallet,
  ArrowUpRight,
  Sparkles,
  Activity,
  PackageSearch,
  Zap,
} from "lucide-react";

import { KPIS, REVENUE_SERIES, CHANNEL_SPLIT, AI_INSIGHTS, ACTIVITY, ORDERS, FUNNEL } from "@/lib/mock/data";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart, DonutChart } from "@/components/dashboard/charts";
import { OrderStatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/skeleton";
import { DEMO_NOW, cn, formatCurrency, formatDate, formatNumber, relativeTime } from "@/lib/utils";
import { intlLocale, toLocale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import { WILAYAS, wilayaName } from "@/lib/wilayas";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getT(locale);
  return {
    title: t("Vue d’ensemble"),
    description: t("Pilotage temps réel de votre boutique TIDJARATI."),
  };
}

const ICONS = [Banknote, ShoppingCart, Target, Wallet];

const TONE: Record<string, string> = {
  opportunity: "border-success/30 bg-success/[0.07]",
  warning: "border-warning/30 bg-warning/[0.07]",
  info: "border-info/30 bg-info/[0.07]",
};

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const t = getT(locale);
  const intl = intlLocale(locale);
  const today = formatDate("2026-10-19T00:00:00.000Z", intl, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cityLabel = (city: string) => {
    const wilaya = WILAYAS.find((w) => w.name === city);
    return wilaya ? wilayaName(wilaya, locale) : city;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-muted-foreground">
            {t("{date} · mise à jour {when}", {
              date: today,
              when: t("il y a {n} min", { n: 2 }),
            })}
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-[28px]">
            {t("Bonjour Noura 👋")}
          </h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Votre chiffre d’affaires progresse de")}{" "}
            <span className="font-semibold text-success">+18,4 %</span>{" "}
            {t("— 3 actions prioritaires vous attendent.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="md">
            <Activity className="h-4 w-4" aria-hidden />
            {t("30 derniers jours")}
          </Button>
          <Link
            href="/dashboard/analytics"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-4 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(124,58,237,0.75)] transition-all hover:-translate-y-0.5"
          >
            {t("Voir le rapport")} <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi, i) => (
          <KpiCard
            key={kpi.id}
            icon={ICONS[i] ?? Activity}
            label={t(kpi.label)}
            value={t(kpi.value)}
            delta={kpi.delta}
            hint={t(kpi.hint)}
            className="animate-fade-up"
          />
        ))}
      </div>

      {/* Main charts */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{t("Chiffre d’affaires")}</CardTitle>
              <CardDescription>{t("Revenus confirmés, 10 derniers jours")}</CardDescription>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-1">
              {["Jours", "Semaines", "Mois"].map((p, i) => (
                <span
                  key={p}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-[12px] font-medium",
                    i === 0 ? "bg-card text-foreground shadow-[var(--shadow-sm)]" : "text-faint",
                  )}
                >
                  {t(p)}
                </span>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart data={REVENUE_SERIES} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("Canaux")}</CardTitle>
            <CardDescription>{t("Répartition des commandes")}</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={CHANNEL_SPLIT} />
            <ul className="mt-4 space-y-2.5">
              {CHANNEL_SPLIT.map((c) => (
                <li key={c.name} className="flex items-center gap-2.5 text-[13px]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} aria-hidden />
                  <span className="text-muted-foreground">{t(c.name)}</span>
                  <span className="ms-auto font-semibold tabular-nums">{c.value} %</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* AI insights + funnel */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                {t("Recommandations IA")}
              </CardTitle>
              <CardDescription>{t("Analyse de vos données des 7 derniers jours")}</CardDescription>
            </div>
            <Badge variant="gradient">{t("3 opportunités")}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className={cn(
                  "group rounded-xl border p-4 transition-colors hover:border-primary/40",
                  TONE[insight.tone],
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold">{t(insight.title)}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                      {t(insight.body)}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0 tabular-nums">
                    {t(insight.impact)}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Zap className="h-3.5 w-3.5" aria-hidden />
                    {t("Appliquer")}
                  </Button>
                  <Button size="sm" variant="ghost">
                    {t("Ignorer")}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("Entonnoir")}</CardTitle>
            <CardDescription>{t("Visiteurs → commandes confirmées")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {FUNNEL.map((step, i) => (
              <div key={step.step}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-muted-foreground">{t(step.step)}</span>
                  <span className="font-semibold tabular-nums">{formatNumber(step.value, intl)}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[image:var(--gradient-brand)] transition-[width] duration-700"
                    style={{ width: `${Math.max(step.percent, 3)}%`, opacity: 1 - i * 0.12 }}
                  />
                </div>
                <p className="mt-1 text-[11.5px] text-faint tabular-nums">
                  {t("{n} % des visiteurs", { n: step.percent })}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-muted/50 p-3.5">
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{t("Taux global :")} </span>
                {t("3,9 % — supérieur à la moyenne du secteur (2,4 %) sur vos catégories.")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders + activity */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>{t("Commandes récentes")}</CardTitle>
              <CardDescription>{t("Temps réel — synchronisé avec vos transporteurs")}</CardDescription>
            </div>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:underline"
            >
              {t("Tout voir")} <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border text-start">
                    <th className="px-6 py-2.5 text-start text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Référence")}
                    </th>
                    <th className="px-6 py-2.5 text-start text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Client")}
                    </th>
                    <th className="px-6 py-2.5 text-start text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Statut")}
                    </th>
                    <th className="px-6 py-2.5 text-end text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Total")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ORDERS.slice(0, 6).map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-sidebar-hover">
                      <td className="px-6 py-3 font-medium tabular-nums">{order.reference}</td>
                      <td className="px-6 py-3">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-[12px] text-faint">
                          {cityLabel(order.city)} · {relativeTime(order.createdAt, DEMO_NOW, locale)}
                        </p>
                      </td>
                      <td className="px-6 py-3">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-3 text-end font-semibold tabular-nums">
                        {formatCurrency(order.total, "DZD", intl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("Activité")}</CardTitle>
            <CardDescription>{t("Événements de l’équipe et de l’IA")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-5 border-s border-border ps-5">
              {ACTIVITY.map((event) => (
                <li key={event.id} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -start-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                      event.tone === "success"
                        ? "bg-success"
                        : event.tone === "warning"
                          ? "bg-warning"
                          : event.tone === "info"
                            ? "bg-info"
                            : "bg-primary",
                    )}
                  />
                  <p className="text-[13px] leading-relaxed">
                    <span className="font-semibold">{t(event.actor)}</span>{" "}
                    <span className="text-muted-foreground">{t(event.action)}</span>
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-faint">
                    {relativeTime(event.at, DEMO_NOW, locale)}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Low stock */}
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PackageSearch className="h-4 w-4 text-warning" aria-hidden />
              {t("Stock à surveiller")}
            </CardTitle>
            <CardDescription>{t("Produits sous le seuil de réapprovisionnement")}</CardDescription>
          </div>
          <Link
            href="/dashboard/products"
            className="inline-flex h-8 items-center rounded-lg border border-border-strong px-3 text-[13px] font-medium transition-colors hover:border-primary/50 hover:bg-primary-soft"
          >
            {t("Gérer le stock")}
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Coussin tissé main", stock: 0, sales: 173 },
              { name: "Tapis Berbère 120×180", stock: 8, sales: 412 },
              { name: "Bracelet argent gravé", stock: 62, sales: 96 },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13.5px] font-semibold">{p.name}</p>
                  <Badge variant={p.stock === 0 ? "danger" : "warning"}>
                    {p.stock === 0 ? t("Rupture") : t("{n} restants", { n: p.stock })}
                  </Badge>
                </div>
                <p className="mt-2 text-[12.5px] text-muted-foreground tabular-nums">
                  {t("{n} ventes sur 30 jours", { n: p.sales })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Empty state demo (integrations) */}
      <EmptyState
        icon={Sparkles}
        title={t("Connectez votre compte WhatsApp Business")}
        description={t(
          "Recevez les confirmations de commandes COD et relancez vos clients automatiquement depuis TIDJARATI.",
        )}
        action={
          <Button variant="glass" size="md">
            {t("Connecter WhatsApp")}
          </Button>
        }
      />
    </div>
  );
}
