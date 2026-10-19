"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Megaphone,
  Sparkles,
  CreditCard,
  Settings,
  Bell,
  PanelLeftClose,
  PanelLeft,
  Layers,
  UsersRound,
  Shield,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/i18n-provider";
import { Badge } from "@/components/ui/badge";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  count?: number;
  badge?: string;
};

type NavGroup = { section: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    section: "Pilotage",
    items: [
      { href: "/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/analytics", label: "Analytics", icon: Layers },
      { href: "/dashboard/orders", label: "Commandes", icon: ShoppingCart, count: 12 },
      { href: "/dashboard/products", label: "Produits", icon: Package },
      { href: "/dashboard/customers", label: "Clients", icon: Users },
    ],
  },
  {
    section: "Croissance",
    items: [
      { href: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
      { href: "/dashboard/ai", label: "Assistant IA", icon: Sparkles, badge: "Nouveau" },
    ],
  },
  {
    section: "Organisation",
    items: [
      { href: "/dashboard/billing", label: "Abonnement", icon: CreditCard },
      { href: "/dashboard/team", label: "Équipe", icon: UsersRound },
      { href: "/dashboard/notifications", label: "Notifications", icon: Bell, count: 3 },
      { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
    ],
  },
];

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = usePathname();
  const { t, format } = useI18n();

  return (
    <>
      {/* Mobile scrim */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[color:var(--overlay)] backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onMobileClose}
        aria-hidden
      />

      <aside
        aria-label={t("Navigation principale")}
        className={cn(
          "fixed top-4 bottom-4 start-4 z-50 hidden flex-col rounded-2xl border border-glass-border glass shadow-[var(--shadow-lg)] transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:flex",
          collapsed ? "w-[76px]" : "w-[248px]",
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-4">
          <Link
            href="/"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] font-display text-[15px] font-bold text-white shadow-[0_8px_24px_-10px_rgba(124,58,237,0.9)]"
            aria-label={t("TIDJARATI — accueil")}
          >
            H
          </Link>
          {!collapsed && (
            <div className="min-w-0 animate-fade-up">
              <p className="truncate font-display text-[14.5px] font-semibold tracking-tight">TIDJARATI</p>
              <p className="truncate text-[11.5px] text-faint">Atelier Noura</p>
            </div>
          )}
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? t("Déplier la navigation") : t("Replier la navigation")}
            className={cn(
              "ms-auto flex h-7 w-7 items-center justify-center rounded-lg text-faint transition-all hover:bg-sidebar-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
              collapsed && "mx-auto mt-2",
            )}
          >
            {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4">
          {NAV.map((group) => (
            <div key={group.section} className="mb-4">
              {!collapsed && (
                <p className="mb-1.5 px-3 text-[10.5px] font-semibold tracking-[0.14em] text-faint uppercase">
                  {t(group.section)}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? t(item.label) : undefined}
                        onClick={onMobileClose}
                        className={cn(
                          "group/item relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                          collapsed && "justify-center px-0",
                          active
                            ? "bg-sidebar-active text-foreground"
                            : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground",
                        )}
                      >
                        {active && (
                          <span
                            aria-hidden
                            className="absolute top-1/2 start-[-13px] h-5 w-[3px] -translate-y-1/2 rounded-full bg-[image:var(--gradient-brand)]"
                          />
                        )}
                        <item.icon
                          className={cn(
                            "h-[17px] w-[17px] shrink-0 transition-colors",
                            active ? "text-primary" : "text-faint group-hover/item:text-current",
                          )}
                          aria-hidden
                        />
                        {!collapsed && (
                          <>
                            <span className="truncate">{t(item.label)}</span>
                            <span className="ms-auto flex items-center gap-1.5">
                              {item.count ? (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10.5px] font-bold text-white tabular-nums">
                                  {item.count}
                                </span>
                              ) : null}
                              {item.badge ? (
                                <Badge variant="primary" className="px-1.5 py-0 text-[10px]">
                                  {t(item.badge)}
                                </Badge>
                              ) : null}
                            </span>
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Plan upsell */}
        <div className="p-3">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border border-primary/25 bg-[image:linear-gradient(160deg,rgba(124,58,237,0.22),rgba(167,139,250,0.08))] p-4",
              collapsed && "flex flex-col items-center p-3",
            )}
          >
            {!collapsed ? (
              <>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12.5px] font-semibold">Plan Growth</p>
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {format.number(82)} %
                  </span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-background/40">
                  <div className="h-full w-[82%] rounded-full bg-[image:var(--gradient-brand)]" />
                </div>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
                  {t("{used} / {total} commandes ce mois", {
                    used: format.number(1284),
                    total: format.number(10000),
                  })}
                </p>
                <Link
                  href="/dashboard/billing"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary hover:underline"
                >
                  {t("Gérer l’abonnement")} <ChevronRight className="rtl-flip h-3 w-3" />
                </Link>
              </>
            ) : (
              <Link href="/dashboard/billing" aria-label={t("Gérer l'abonnement")}>
                <Shield className="h-4 w-4 text-primary" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 start-0 z-50 flex w-[272px] flex-col border-e border-glass-border bg-background-elevated transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] font-display text-sm font-bold text-white">
            H
          </span>
          <p className="font-display text-[15px] font-semibold tracking-tight">TIDJARATI</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group) => (
            <div key={group.section} className="mb-4">
              <p className="mb-1.5 px-3 text-[10.5px] font-semibold tracking-[0.14em] text-faint uppercase">
                {t(group.section)}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onMobileClose}
                        tabIndex={mobileOpen ? 0 : -1}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors",
                          active
                            ? "bg-sidebar-active text-foreground"
                            : "text-muted-foreground hover:bg-sidebar-hover",
                        )}
                      >
                        <item.icon
                          className={cn("h-[18px] w-[18px]", active ? "text-primary" : "text-faint")}
                          aria-hidden
                        />
                        <span>{t(item.label)}</span>
                        {item.count ? (
                          <span className="ms-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10.5px] font-bold text-white tabular-nums">
                            {item.count}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
