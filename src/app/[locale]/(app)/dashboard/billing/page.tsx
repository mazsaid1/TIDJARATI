"use client";

import { useState } from "react";
import { Check, CreditCard, Download, ShieldCheck, Sparkles } from "lucide-react";

import { PLANS, STORE } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useI18n } from "@/components/i18n/i18n-provider";
import { cn } from "@/lib/utils";

const INVOICES = [
  { id: "INV-2026-010", date: "01/10/2026", amount: 2990, status: "paid" },
  { id: "INV-2026-009", date: "01/09/2026", amount: 2990, status: "paid" },
  { id: "INV-2026-008", date: "01/08/2026", amount: 1490, status: "paid" },
  { id: "INV-2026-007", date: "01/07/2026", amount: 1490, status: "failed" },
];

export default function BillingPage() {
  const { t, format } = useI18n();
  const [yearly, setYearly] = useState(false);
  const [checkout, setCheckout] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Abonnement")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Plan")}{" "}
            <span className="font-semibold text-foreground">{STORE.plan}</span>{" "}
            {t("— 1 284 commandes sur 10 000 ce cycle. Paiement par carte ou virement (Algérie).")}
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" aria-hidden />
          {t("Exporter les factures")}
        </Button>
      </div>

      {/* Usage */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Commandes ce cycle", value: `${format.number(1284)} / ${format.number(10000)}`, pct: 12.8 },
          { label: "Pages de captation", value: "14 / ∞", pct: 100 },
          {
            label: "Stockage médias",
            value: t("{used} Go / {total} Go", { used: format.number(2.1), total: format.number(20) }),
            pct: 10.5,
          },
        ].map((u) => (
          <Card key={u.label} className="p-5">
            <p className="text-[13px] text-muted-foreground">{t(u.label)}</p>
            <p className="mt-1.5 font-display text-lg font-semibold tabular-nums">{u.value}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                style={{ width: `${Math.min(u.pct, 100)}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Plans */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-semibold">{t("Comparer les plans")}</p>
        <div className="flex items-center gap-2.5 text-[13px]">
          <span className={cn(!yearly ? "font-medium" : "text-muted-foreground")}>{t("Mensuel")}</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={t("Facturation annuelle")}
            onClick={() => setYearly((v) => !v)}
            className={cn(
              "relative h-6 w-11 rounded-full border border-transparent transition-colors",
              yearly ? "bg-primary" : "bg-border-strong",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                yearly && "translate-x-5 rtl:-translate-x-5",
              )}
            />
          </button>
          <span className={cn(yearly ? "font-medium" : "text-muted-foreground")}>{t("Annuel")}</span>
          <Badge variant="success">−20 %</Badge>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const current = plan.id === STORE.plan;
          const price = yearly ? plan.yearly : plan.price;
          return (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col p-5",
                plan.featured && "border-primary/50 shadow-glow",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                  {t("Le plus choisi")}
                </span>
              )}
              <h3 className="font-display text-[15px] font-semibold">{plan.name}</h3>
              <p className="mt-1 min-h-10 text-[12.5px] leading-snug text-muted-foreground">{t(plan.tagline)}</p>
              <p className="mt-3 font-display text-[26px] font-semibold tracking-tight tabular-nums">
                {format.number(price)} <span className="text-sm font-normal text-faint">DZD</span>
                <span className="text-[13px] font-normal text-faint"> / {yearly ? t("an") : t("mois")}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] leading-snug">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">{t(f)}</span>
                  </li>
                ))}
                {plan.limits.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-[13px] leading-snug text-faint">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {t(l)}
                  </li>
                ))}
              </ul>
              {current ? (
                <Badge variant="primary" className="mt-5 justify-center py-2">
                  {t("Plan actuel")}
                </Badge>
              ) : (
                <Button
                  variant={plan.featured ? "primary" : "outline"}
                  className="mt-5 w-full"
                  onClick={() => setCheckout(plan.id)}
                >
                  {plan.price === 0 ? t("Passer en gratuit") : t("Choisir ce plan")}
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" aria-hidden />
            {t("Historique de facturation")}
          </CardTitle>
          <CardDescription>{t("Reçus PDF et moyens de paiement")}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-border text-start">
                  {["Facture", "Date", "Montant", "Statut", ""].map((h, i) => (
                    <th
                      key={h + i}
                      className={`px-5 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase ${
                        h === "Montant" ? "text-end" : ""
                      }`}
                    >
                      {t(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="transition-colors hover:bg-sidebar-hover">
                    <td className="px-5 py-3.5 font-medium tabular-nums">{inv.id}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{inv.date}</td>
                    <td className="px-5 py-3.5 text-end font-semibold tabular-nums">
                      {format.currency(inv.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={inv.status === "paid" ? "success" : "danger"} dot>
                        {inv.status === "paid" ? t("Payée") : t("Échouée")}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-end">
                      <button className="text-[13px] font-medium text-primary hover:underline">PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-4">
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
              {t("Paiement sécurisé · CIB / Edahabia / carte internationale")}
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={Boolean(checkout)}
        onClose={() => setCheckout(null)}
        title={t("Confirmer le changement de plan")}
        description={t("Le prorata sera calculé automatiquement à la date du 19 octobre.")}
        footer={
          <>
            <Button variant="ghost" onClick={() => setCheckout(null)}>
              {t("Annuler")}
            </Button>
            <Button onClick={() => setCheckout(null)}>
              <Sparkles className="h-4 w-4" aria-hidden />
              {t("Confirmer et payer")}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-muted/50 p-4 text-[13px]">
            <p className="text-muted-foreground">{t("Nouveau plan")}</p>
            <p className="mt-1 font-display text-lg font-semibold capitalize">{checkout}</p>
            <p className="mt-2 text-muted-foreground">
              {t("Montant dû aujourd’hui :")}{" "}
              <span className="font-semibold text-foreground tabular-nums">
                {format.currency(
                  (PLANS.find((p) => p.id === checkout)?.price ?? 0) -
                    (PLANS.find((p) => p.id === STORE.plan)?.price ?? 0),
                )}
              </span>{" "}
              {t("(prorata)")}
            </p>
          </div>
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            {t("Le redéclassement vers un plan inférieur prend effet à la fin du cycle en cours. Vos données et votre historique restent intacts.")}
          </p>
        </div>
      </Modal>
    </div>
  );
}
