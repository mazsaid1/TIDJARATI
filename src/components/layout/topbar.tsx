"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  Plus,
  Bell,
  ChevronDown,
  LifeBuoy,
  UserRound,
  LogOut,
  Settings,
  CreditCard,
  Check,
} from "lucide-react";

import { cn, initials } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Dropdown, DropdownItem } from "@/components/ui/primitives";
import { OrderStatusBadge } from "@/components/dashboard/status-badge";
import { ORDERS } from "@/lib/mock/data";

const CMD = [
  { group: "Navigation", items: ["Vue d'ensemble", "Commandes", "Produits", "Clients", "Analytics", "Assistant IA"] },
  { group: "Actions rapides", items: ["Créer une page de captation", "Ajouter un produit", "Inviter un membre", "Exporter en CSV"] },
];

export function Topbar({
  onOpenMobile,
  onCreate,
}: {
  onOpenMobile: () => void;
  onCreate: () => void;
}) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      CMD.flatMap((g) =>
        g.items
          .filter((i) => i.toLowerCase().includes(query.toLowerCase()))
          .map((item) => ({ group: g.group, item })),
      ),
    [query],
  );

  const recent = ORDERS.slice(0, 4);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Ouvrir la navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Command palette trigger */}
        <button
          type="button"
          onClick={() => setCmdOpen(true)}
          className="group flex h-10 flex-1 max-w-md items-center gap-2.5 rounded-xl border border-border bg-card/60 px-3.5 text-left text-[13.5px] text-faint transition-all hover:border-primary/40 hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none sm:max-w-sm"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">Rechercher une commande, un client…</span>
          <kbd className="ml-auto hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-faint sm:inline-block">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
          <Button onClick={onCreate} className="hidden sm:inline-flex" size="md">
            <Plus className="h-4 w-4" aria-hidden />
            Créer
          </Button>
          <Button onClick={onCreate} size="icon" aria-label="Créer" className="sm:hidden">
            <Plus className="h-5 w-5" />
          </Button>

          <ThemeToggle />

          <Dropdown
            align="end"
            className="w-[330px] max-w-[calc(100vw-2rem)]"
            trigger={
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                  3
                </span>
              </button>
            }
          >
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-[13px] font-semibold">Notifications</p>
              <button className="text-[12px] text-primary hover:underline">Tout marquer comme lu</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {recent.map((o) => (
                <Link
                  key={o.id}
                  href="/dashboard/orders"
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-sidebar-hover"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">
                      {o.reference} — {o.customer}
                    </span>
                    <span className="mt-1 flex items-center gap-2">
                      <OrderStatusBadge status={o.status} />
                      <span className="text-[11.5px] text-faint tabular-nums">
                        {o.total.toLocaleString("fr-FR")} DZD
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="border-t border-border p-2">
              <Link
                href="/dashboard/notifications"
                className="block rounded-lg px-3 py-2 text-center text-[13px] font-medium text-primary hover:bg-primary-soft"
              >
                Voir toutes les notifications
              </Link>
            </div>
          </Dropdown>

          <Dropdown
            align="end"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-border bg-card py-1 pr-1.5 pl-1 transition-colors hover:border-primary/40"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[image:linear-gradient(135deg,#7c3aed,#a78bfa)] text-[11px] font-bold text-white">
                  {initials("Noura Amrane")}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-faint" aria-hidden />
              </button>
            }
          >
            <div className="flex items-center gap-3 px-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:linear-gradient(135deg,#7c3aed,#a78bfa)] text-[12px] font-bold text-white">
                {initials("Noura Amrane")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">Noura Amrane</p>
                <p className="truncate text-[12px] text-faint">noura@atelier-noura.dz</p>
              </div>
            </div>
            <div className="my-1 border-t border-border" />
            <DropdownItem icon={<UserRound className="h-4 w-4 text-faint" />}>Mon profil</DropdownItem>
            <DropdownItem icon={<Settings className="h-4 w-4 text-faint" />}>Paramètres</DropdownItem>
            <DropdownItem icon={<CreditCard className="h-4 w-4 text-faint" />}>Abonnement</DropdownItem>
            <DropdownItem icon={<LifeBuoy className="h-4 w-4 text-faint" />}>Centre d’aide</DropdownItem>
            <div className="my-1 border-t border-border" />
            <DropdownItem danger icon={<LogOut className="h-4 w-4" />}>Se déconnecter</DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Command palette */}
      <Modal open={cmdOpen} onClose={() => setCmdOpen(false)} size="md">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tapez une commande ou recherchez…"
          className="w-full border-none bg-transparent pb-3 text-[15px] text-foreground outline-none placeholder:text-faint"
          aria-label="Palette de commandes"
        />
        <div className="max-h-72 overflow-y-auto border-t border-border pt-2">
          {results.length === 0 && (
            <p className="py-8 text-center text-[13px] text-faint">
              Aucun résultat pour « {query} »
            </p>
          )}
          {CMD.map((group) => {
            const items = group.items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
            if (!items.length) return null;
            return (
              <div key={group.group} className="mb-2">
                <p className="px-1 pb-1 text-[11px] font-semibold tracking-wider text-faint uppercase">
                  {group.group}
                </p>
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCmdOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] text-foreground transition-colors hover:bg-sidebar-hover"
                  >
                    <Check className="h-3.5 w-3.5 text-transparent" aria-hidden />
                    {item}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </Modal>
    </header>
  );
}

export function MobileBrandBar({ className }: { className?: string }) {
  return (
    <div className={cn("lg:hidden", className)}>
      <Link href="/" className="font-display text-sm font-semibold tracking-tight">
        TIDJARATI
      </Link>
    </div>
  );
}
