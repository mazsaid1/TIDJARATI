"use client";

import { useMemo, useState } from "react";
import { Search, Download, ListFilter, Truck, Phone, Ellipsis, ShoppingCart } from "lucide-react";

import { ORDERS, type OrderStatus } from "@/lib/mock/data";
import { OrderStatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { Dropdown, DropdownItem } from "@/components/ui/primitives";
import { useI18n } from "@/components/i18n/i18n-provider";
import { CHANNEL_LABEL } from "@/lib/status";
import { WILAYAS, wilayaName } from "@/lib/wilayas";

const FILTERS = [
  { key: "all", label: "Toutes" },
  { key: "cod_pending", label: "COD à confirmer" },
  { key: "processing", label: "En préparation" },
  { key: "shipped", label: "Expédiées" },
  { key: "delivered", label: "Livrées" },
  { key: "cancelled", label: "Annulées" },
] as const;

export default function OrdersPage() {
  const { t, format, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [selected, setSelected] = useState<string | null>(null);

  const cityLabel = (city: string) => {
    const wilaya = WILAYAS.find((w) => w.name === city);
    return wilaya ? wilayaName(wilaya, locale) : city;
  };

  const rows = useMemo(
    () =>
      ORDERS.filter((o) => (filter === "all" ? true : o.status === filter)).filter(
        (o) =>
          o.customer.toLowerCase().includes(query.toLowerCase()) ||
          o.reference.toLowerCase().includes(query.toLowerCase()) ||
          o.city.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, filter],
  );

  const order = ORDERS.find((o) => o.id === selected);
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: ORDERS.length };
    for (const o of ORDERS) map[o.status] = (map[o.status] ?? 0) + 1;
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{t("Commandes")}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {t("Toutes vos commandes, tous canaux confondus — livraison COD et paiement en ligne.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" aria-hidden />
            {t("Exporter")}
          </Button>
          <Button>
            <Truck className="h-4 w-4" aria-hidden />
            {t("Synchroniser transporteurs")}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all ${
              filter === f.key
                ? "border-primary/40 bg-primary-soft text-primary"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            {t(f.label)}
            <span className="ms-1.5 text-[11.5px] tabular-nums opacity-70">{counts[f.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Rechercher une référence, un client, une ville…")}
            icon={<Search className="h-4 w-4" />}
            className="max-w-sm"
            aria-label={t("Rechercher une commande")}
          />
          <Button variant="outline" size="sm" className="ms-auto">
            <ListFilter className="h-3.5 w-3.5" aria-hidden />
            {t("Filtres avancés")}
          </Button>
        </div>

        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title={t("Aucune commande ne correspond")}
              description={t("Modifiez vos filtres ou vérifiez la synchronisation avec vos pages de captation.")}
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                >
                  {t("Réinitialiser les filtres")}
                </Button>
              }
              className="border-none"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-start">
                    {["Référence", "Client", "Canal", "Transporteur", "Statut", "Total", ""].map((h, i) => (
                      <th
                        key={h + i}
                        className={`px-4 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase ${
                          h === "Total" ? "text-end" : ""
                        }`}
                      >
                        {t(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setSelected(o.id)}
                      className="cursor-pointer transition-colors hover:bg-sidebar-hover"
                    >
                      <td className="px-4 py-3.5 font-medium tabular-nums">{o.reference}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-medium">{o.customer}</p>
                        <p className="text-[12px] text-faint">
                          {cityLabel(o.city)} · {format.relative(o.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="outline">{t(CHANNEL_LABEL[o.channel] ?? o.channel)}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{o.courier ?? "—"}</td>
                      <td className="px-4 py-3.5">
                        <OrderStatusBadge status={o.status} />
                      </td>
                      <td className="px-4 py-3.5 text-end font-semibold tabular-nums">
                        {format.currency(o.total)}
                      </td>
                      <td className="px-4 py-3.5 text-end">
                        <Dropdown
                          trigger={
                            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint hover:bg-sidebar-hover hover:text-foreground">
                              <Ellipsis className="h-4 w-4" />
                            </button>
                          }
                        >
                          <DropdownItem icon={<Phone className="h-4 w-4 text-faint" />}>
                            {t("Appeler le client")}
                          </DropdownItem>
                          <DropdownItem icon={<Truck className="h-4 w-4 text-faint" />}>
                            {t("Suivre le colis")}
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

      <Modal
        open={Boolean(order)}
        onClose={() => setSelected(null)}
        title={order ? `${order.reference} — ${order.customer}` : ""}
        description={
          order
            ? `${cityLabel(order.city)} · ${t("{n} article(s)", { n: format.number(order.items) })}`
            : ""
        }
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelected(null)}>
              {t("Fermer")}
            </Button>
            <Button>
              <Phone className="h-4 w-4" aria-hidden />
              {t("Confirmer par appel")}
            </Button>
          </>
        }
      >
        {order && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
              <div>
                <p className="text-[12.5px] text-muted-foreground">{t("Montant total")}</p>
                <p className="font-display text-xl font-semibold tabular-nums">
                  {format.currency(order.total)}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <dt className="text-faint">{t("Canal d’acquisition")}</dt>
                <dd className="mt-0.5 font-medium">
                  {t(CHANNEL_LABEL[order.channel] ?? order.channel)}
                </dd>
              </div>
              <div>
                <dt className="text-faint">{t("Transporteur")}</dt>
                <dd className="mt-0.5 font-medium">{order.courier ?? t("Non assigné")}</dd>
              </div>
              <div>
                <dt className="text-faint">{t("Articles")}</dt>
                <dd className="mt-0.5 font-medium tabular-nums">{order.items}</dd>
              </div>
              <div>
                <dt className="text-faint">{t("Créée")}</dt>
                <dd className="mt-0.5 font-medium">{format.relative(order.createdAt)}</dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
