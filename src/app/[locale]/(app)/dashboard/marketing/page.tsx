"use client";

import { Megaphone, Plus, Zap, Eye, MousePointerClick, Target, Copy } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives";
import { useI18n } from "@/components/i18n/i18n-provider";
import { cn } from "@/lib/utils";

const CAMPAIGNS = [
  {
    id: "camp-1",
    name: "Retargeting paniers COD — Octobre",
    channel: "Meta",
    status: "active",
    spend: 84000,
    revenue: 392000,
    roas: 4.7,
    ctr: 3.2,
  },
  {
    id: "camp-2",
    name: "TikTok — Tapis Berbère v2",
    channel: "TikTok",
    status: "active",
    spend: 46000,
    revenue: 158000,
    roas: 3.4,
    ctr: 2.1,
  },
  {
    id: "camp-3",
    name: "Relance WhatsApp J+1",
    channel: "WhatsApp",
    status: "active",
    spend: 6000,
    revenue: 142000,
    roas: 23.6,
    ctr: 61.4,
  },
  {
    id: "camp-4",
    name: "Lancement collection Automne",
    channel: "Meta",
    status: "paused",
    spend: 22000,
    revenue: 51000,
    roas: 2.3,
    ctr: 1.4,
  },
];

const PIXELS = [
  { name: "Meta Pixel — Principal", id: "683021014486505", status: "connected", events: 12480 },
  { name: "Meta Pixel — Secondaire", id: "1706757789868538", status: "connected", events: 3120 },
  { name: "Meta Pixel — Backup", id: "1019049179972649", status: "connected", events: 890 },
  { name: "TikTok Pixel", id: "CUUKE3JC77U8E2TJR560", status: "connected", events: 6420 },
  { name: "Google Ads", id: "AW-11293847561", status: "disconnected", events: 0 },
];

const TEMPLATES = [
  { name: "Flash Sale 48h — COD", desc: "Compte à rebours + preuve sociale + formulaire court.", conv: 5.8 },
  { name: "Catalogue produits — Grid", desc: "Grille de 6 produits avec filtres et panier rapide.", conv: 3.9 },
  { name: "Produit unique — Hero", desc: "Tunnel mono-produit : vidéo, témoignages, FAQ, CTA.", conv: 6.4 },
  { name: "Collecte de leads WhatsApp", desc: "Capture de numéro + relance automatique J+1.", conv: 11.2 },
];

export default function MarketingPage() {
  const { t, format } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Marketing")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Campagnes, pixels de suivi et pages de captation — pilotés depuis un seul endroit.")}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" aria-hidden />
          {t("Nouvelle campagne")}
        </Button>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="campaigns">{t("Campagnes")}</TabsTrigger>
          <TabsTrigger value="pixels">{t("Pixels & suivi")}</TabsTrigger>
          <TabsTrigger value="templates">{t("Pages de captation")}</TabsTrigger>
        </TabsList>

        {/* ------------------------------- Campaigns ------------------------------- */}
        <TabsContent value="campaigns" className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Dépenses (30 j)", value: format.currency(158000), icon: Target },
              { label: "Revenus attribués", value: format.currency(643000), icon: Zap },
              { label: "ROAS moyen", value: `${format.number(4.1)}×`, icon: MousePointerClick },
              { label: "CTR moyen", value: `${format.number(3.8)} %`, icon: Eye },
            ].map((s) => (
              <Card key={s.label} className="p-5">
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <s.icon className="h-4 w-4 text-primary" aria-hidden />
                  {t(s.label)}
                </div>
                <p className="mt-2 font-display text-xl font-semibold tabular-nums">{s.value}</p>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-start">
                      {["Campagne", "Canal", "Dépenses", "Revenus", "ROAS", "Statut"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-4 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase ${
                            i >= 2 && i <= 4 ? "text-end" : ""
                          }`}
                        >
                          {t(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {CAMPAIGNS.map((c) => (
                      <tr key={c.id} className="transition-colors hover:bg-sidebar-hover">
                        <td className="px-4 py-3.5">
                          <p className="font-medium">{t(c.name)}</p>
                          <p className="text-[12px] text-faint tabular-nums">
                            {t("CTR {n} %", { n: format.number(c.ctr) })}
                          </p>
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge
                            variant={c.channel === "Meta" ? "info" : c.channel === "TikTok" ? "primary" : "success"}
                          >
                            {c.channel}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5 text-end tabular-nums">{format.currency(c.spend)}</td>
                        <td className="px-4 py-3.5 text-end font-semibold tabular-nums">
                          {format.currency(c.revenue)}
                        </td>
                        <td
                          className={cn(
                            "px-4 py-3.5 text-end font-bold tabular-nums",
                            c.roas >= 4 ? "text-success" : c.roas >= 2.5 ? "text-warning" : "text-danger",
                          )}
                        >
                          {format.number(c.roas)}×
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant={c.status === "active" ? "success" : "neutral"} dot>
                            {c.status === "active" ? t("Active") : t("En pause")}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --------------------------------- Pixels -------------------------------- */}
        <TabsContent value="pixels" className="mt-5 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-4 w-4 text-primary" aria-hidden />
                  {t("Pixels connectés")}
                </CardTitle>
                <CardDescription>
                  {t("Jusqu’à 7 pixels simultanés par page, avec conversions API serveur.")}
                </CardDescription>
              </div>
              <Badge variant="gradient">{t("4 / 7 actifs")}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {PIXELS.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "flex flex-wrap items-center gap-3 rounded-xl border p-4 transition-colors",
                    p.status === "connected" ? "border-border hover:border-primary/40" : "border-dashed border-border-strong",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-semibold">{t(p.name)}</p>
                    <p className="mt-0.5 flex items-center gap-2 font-mono text-[12px] text-faint">
                      {p.id}
                      <button
                        type="button"
                        aria-label={t("Copier l’identifiant")}
                        className="text-faint transition-colors hover:text-primary"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </p>
                  </div>
                  <p className="text-[12.5px] text-muted-foreground tabular-nums">
                    {t("{n} événements / 30 j", { n: format.number(p.events) })}
                  </p>
                  <Badge variant={p.status === "connected" ? "success" : "warning"} dot>
                    {p.status === "connected" ? t("Connecté") : t("Non connecté")}
                  </Badge>
                  <Button size="sm" variant={p.status === "connected" ? "ghost" : "secondary"}>
                    {p.status === "connected" ? t("Configurer") : t("Connecter")}
                  </Button>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-border-strong p-4">
                <p className="text-[13px] text-muted-foreground">
                  {t("Ajoutez un 5ᵉ pixel (Google Ads, Snapchat, Pinterest…) — TIDJARATI gère la redondance et la déduplication des événements.")}
                </p>
                <Button variant="secondary" size="sm" className="mt-3">
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  {t("Ajouter un pixel")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ------------------------------- Templates ------------------------------- */}
        <TabsContent value="templates" className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {TEMPLATES.map((tpl) => (
              <article
                key={tpl.name}
                className="group card-premium card-hover flex flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[15px] font-semibold">{t(tpl.name)}</h3>
                  <Badge variant="primary" className="tabular-nums">
                    {t("{n} % conv.", { n: format.number(tpl.conv) })}
                  </Badge>
                </div>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{t(tpl.desc)}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button size="sm">{t("Utiliser")}</Button>
                  <Button size="sm" variant="ghost">
                    {t("Aperçu")}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
