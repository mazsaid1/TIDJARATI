"use client";

import { useMemo, useState } from "react";
import { Search, Users, MessageSquare, Mail, Phone } from "lucide-react";

import { CUSTOMERS } from "@/lib/mock/data";
import { SegmentBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, Dropdown, DropdownItem } from "@/components/ui/primitives";
import { EmptyState } from "@/components/ui/skeleton";
import { useI18n } from "@/components/i18n/i18n-provider";

const SEGMENTS = [
  { key: "all", label: "Tous les clients" },
  { key: "vip", label: "VIP" },
  { key: "regular", label: "Réguliers" },
  { key: "new", label: "Nouveaux" },
  { key: "at_risk", label: "À risque" },
];

export default function CustomersPage() {
  const { t, format } = useI18n();
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("all");

  const rows = useMemo(
    () =>
      CUSTOMERS.filter((c) => (segment === "all" ? true : c.segment === segment)).filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query),
      ),
    [query, segment],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Clients")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Segmentation automatique basée sur la fréquence, la valeur et le risque d’abandon.")}
          </p>
        </div>
        <Button variant="outline">
          <Mail className="h-4 w-4" aria-hidden />
          {t("Campagne e-mail")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SEGMENTS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSegment(s.key)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
              segment === s.key
                ? "border-primary/40 bg-primary-soft text-primary"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            {t(s.label)}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Rechercher par nom, e-mail ou téléphone…")}
            icon={<Search className="h-4 w-4" />}
            className="max-w-md"
            aria-label={t("Rechercher un client")}
          />
        </div>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={Users}
              title={t("Aucun client trouvé")}
              description={t("Vos clients apparaîtront ici dès la première commande confirmée.")}
              className="border-none"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-start">
                    {["Client", "Segment", "Commandes", "Cumul dépensé", "Dernière commande", ""].map((h, i) => (
                      <th
                        key={h + i}
                        className={`px-4 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase ${
                          h === "Commandes" || h === "Cumul dépensé" ? "text-end" : ""
                        }`}
                      >
                        {t(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((c) => (
                    <tr key={c.id} className="transition-colors hover:bg-sidebar-hover">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={c.name} />
                          <div className="min-w-0">
                            <p className="truncate font-medium">{c.name}</p>
                            <p className="truncate text-[12px] text-faint">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <SegmentBadge segment={c.segment} />
                      </td>
                      <td className="px-4 py-3.5 text-end tabular-nums">{c.orders}</td>
                      <td className="px-4 py-3.5 text-end font-semibold tabular-nums">
                        {format.currency(c.spent)}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{format.relative(c.lastOrderAt)}</td>
                      <td className="px-4 py-3.5 text-end">
                        <Dropdown
                          trigger={
                            <button
                              type="button"
                              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-[12.5px] font-medium text-muted-foreground hover:border-primary/40 hover:text-primary"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              {t("Contacter")}
                            </button>
                          }
                        >
                          <DropdownItem icon={<Phone className="h-4 w-4 text-faint" />}>
                            {t("Appeler · {phone}", { phone: c.phone })}
                          </DropdownItem>
                          <DropdownItem icon={<MessageSquare className="h-4 w-4 text-faint" />}>
                            {t("Envoyer un WhatsApp")}
                          </DropdownItem>
                          <DropdownItem icon={<Mail className="h-4 w-4 text-faint" />}>
                            {t("Envoyer un e-mail")}
                          </DropdownItem>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
