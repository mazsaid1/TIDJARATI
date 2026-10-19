"use client";

import { Download, Globe, Smartphone, MonitorCog } from "lucide-react";

import { REVENUE_SERIES, CHANNEL_SPLIT, FUNNEL } from "@/lib/mock/data";
import { RevenueChart, OrdersBarChart, DonutChart } from "@/components/dashboard/charts";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/primitives";
import { useI18n } from "@/components/i18n/i18n-provider";

const DEVICES = [
  { name: "Mobile", value: 78, icon: Smartphone },
  { name: "Desktop", value: 18, icon: MonitorCog },
  { name: "Tablette", value: 4, icon: Globe },
];

const TOP_CITIES = [
  { city: "Alger", orders: 412, revenue: 1680000 },
  { city: "Oran", orders: 236, revenue: 942000 },
  { city: "Constantine", orders: 158, revenue: 631000 },
  { city: "Sétif", orders: 121, revenue: 498000 },
  { city: "Blida", orders: 104, revenue: 421000 },
  { city: "Béjaïa", orders: 87, revenue: 356000 },
];

export default function AnalyticsPage() {
  const { t, format } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Analytics")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Performance temps réel — pixels Meta & TikTok, conversions API et attribution multi-canal.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="30d" className="ms-0">
            <TabsList>
              {[
                { v: "7d", l: "7 j" },
                { v: "30d", l: "30 j" },
                { v: "90d", l: "90 j" },
              ].map((tab) => (
                <TabsTrigger key={tab.v} value={tab.v}>
                  {t(tab.l)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button variant="outline">
            <Download className="h-4 w-4" aria-hidden />
            {t("Exporter")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Globe} label={t("Visiteurs uniques")} value={format.number(71200)} delta={14.2} hint={t("Tous canaux confondus")} />
        <KpiCard icon={Smartphone} label={t("Taux de rebond mobile")} value={format.percent(38.4)} delta={-3.1} hint={t("Amélioration vs mois dernier")} />
        <KpiCard icon={MonitorCog} label={t("Temps moyen sur page")} value={t("2 min 47")} delta={6.8} hint={t("Pages de captation")} />
        <KpiCard icon={Download} label={t("Coût d’acquisition")} value={format.currency(412)} delta={-8.5} hint={t("Moyenne pondérée Meta + TikTok")} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("Trafic et conversions")}</CardTitle>
          <CardDescription>{t("Chiffre d’affaires confirmé par jour — 30 derniers jours")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueChart data={REVENUE_SERIES} className="h-80" />
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t("Commandes par jour")}</CardTitle>
            <CardDescription>{t("Volume confirmé vs paniers créés")}</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersBarChart data={REVENUE_SERIES} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("Canaux d’acquisition")}</CardTitle>
            <CardDescription>{t("Part des commandes")}</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={CHANNEL_SPLIT.map((c) => ({ ...c, name: t(c.name) }))} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t("Villes performantes")}</CardTitle>
            <CardDescription>{t("Top 6 par chiffre d’affaires")}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border text-start">
                    <th className="px-6 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase">#</th>
                    <th className="px-6 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase">{t("Ville")}</th>
                    <th className="px-6 py-3 text-end text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Commandes")}
                    </th>
                    <th className="px-6 py-3 text-end text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Chiffre d’affaires")}
                    </th>
                    <th className="px-6 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase">
                      {t("Répartition")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {TOP_CITIES.map((c, i) => {
                    const pct = (c.revenue / TOP_CITIES[0].revenue) * 100;
                    return (
                      <tr key={c.city} className="transition-colors hover:bg-sidebar-hover">
                        <td className="px-6 py-3.5 text-faint tabular-nums">{i + 1}</td>
                        <td className="px-6 py-3.5 font-medium">{c.city}</td>
                        <td className="px-6 py-3.5 text-end tabular-nums">{format.number(c.orders)}</td>
                        <td className="px-6 py-3.5 text-end font-semibold tabular-nums">
                          {format.number(c.revenue / 1000)} k DZD
                        </td>
                        <td className="px-6 py-3.5">
                          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("Appareils")}</CardTitle>
            <CardDescription>{t("Répartition des sessions")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {DEVICES.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <d.icon className="h-4 w-4" aria-hidden />
                    {t(d.name)}
                  </span>
                  <span className="font-semibold tabular-nums">{d.value} %</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-border bg-muted/50 p-3.5">
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{t("Insight IA")} : </span>
                {t("78 % du trafic vient du mobile — vos pages sont optimisées, mais le checkout mobile gagnerait à afficher le paiement à la livraison en haut de page.")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {FUNNEL.slice(1).map((f) => (
                <div key={f.step} className="rounded-lg border border-border p-2.5 text-center">
                  <p className="text-[11px] leading-tight text-faint">{t(f.step)}</p>
                  <p className="mt-1 text-[13px] font-semibold tabular-nums">{f.percent} %</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
