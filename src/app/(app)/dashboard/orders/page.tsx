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
import { formatCurrency, relativeTime } from "@/lib/utils";

const FILTERS: Array<{ key: "all" | OrderStatus; label: string }> = [
  { key: "all", label: "Toutes" },
  { key: "cod_pending", label: "COD à confirmer" },
  { key: "processing", label: "En préparation" },
  { key: "shipped", label: "Expédiées" },
  { key: "delivered", label: "Livrées" },
  { key: "cancelled", label: "Annulées" },
];

export default function OrdersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [selected, setSelected] = useState<string | null>(null);

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
          <h1 className="font-display text-2xl font-semibold tracking-tight">Commandes</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Toutes vos commandes, tous canaux confondus — livraison COD et paiement en ligne.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4" aria-hidden />
            Exporter
          </Button>
          <Button>
            <Truck className="h-4 w-4" aria-hidden />
            Synchroniser transporteurs
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
            {f.label}
            <span className="ml-1.5 text-[11.5px] tabular-nums opacity-70">{counts[f.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une référence, un client, une ville…"
            icon={<Search className="h-4 w-4" />}
            className="max-w-sm"
            aria-label="Rechercher une commande"
          />
          <Button variant="outline" size="sm" className="ml-auto">
            <ListFilter className="h-3.5 w-3.5" aria-hidden />
            Filtres avancés
          </Button>
        </div>

        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={ShoppingCart}
              title="Aucune commande ne correspond"
              description="Modifiez vos filtres ou vérifiez la synchronisation avec vos pages de captation."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              }
              className="border-none"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    {["Référence", "Client", "Canal", "Transporteur", "Statut", "Total", ""].map((h, i) => (
                      <th
                        key={h + i}
                        className={`px-4 py-3 text-[11.5px] font-semibold tracking-wider text-faint uppercase ${
                          h === "Total" ? "text-right" : ""
                        }`}
                      >
                        {h}
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
                          {o.city} · {relativeTime(o.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="outline">
                          {o.channel === "landing"
                            ? "Page de captation"
                            : o.channel === "store"
                              ? "Boutique"
                              : o.channel === "instagram"
                                ? "Instagram"
                                : "WhatsApp"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">{o.courier ?? "—"}</td>
                      <td className="px-4 py-3.5">
                        <OrderStatusBadge status={o.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold tabular-nums">
                        {formatCurrency(o.total)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Dropdown
                          trigger={
                            <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-faint hover:bg-sidebar-hover hover:text-foreground">
                              <Ellipsis className="h-4 w-4" />
                            </button>
                          }
                        >
                          <DropdownItem icon={<Phone className="h-4 w-4 text-faint" />}>
                            Appeler le client
                          </DropdownItem>
                          <DropdownItem icon={<Truck className="h-4 w-4 text-faint" />}>
                            Suivre le colis
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
        description={order ? `${order.city} · ${order.items} article(s)` : ""}
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelected(null)}>
              Fermer
            </Button>
            <Button>
              <Phone className="h-4 w-4" aria-hidden />
              Confirmer par appel
            </Button>
          </>
        }
      >
        {order && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
              <div>
                <p className="text-[12.5px] text-muted-foreground">Montant total</p>
                <p className="font-display text-xl font-semibold tabular-nums">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <dt className="text-faint">Canal d’acquisition</dt>
                <dd className="mt-0.5 font-medium">
                  {order.channel === "landing" ? "Page de captation" : order.channel}
                </dd>
              </div>
              <div>
                <dt className="text-faint">Transporteur</dt>
                <dd className="mt-0.5 font-medium">{order.courier ?? "Non assigné"}</dd>
              </div>
              <div>
                <dt className="text-faint">Articles</dt>
                <dd className="mt-0.5 font-medium tabular-nums">{order.items}</dd>
              </div>
              <div>
                <dt className="text-faint">Créée</dt>
                <dd className="mt-0.5 font-medium">{relativeTime(order.createdAt)}</dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
