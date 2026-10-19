"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { CreateModal } from "@/components/dashboard/create-modal";

const KEY = "tidjarati:sidebar-collapsed";

const subscribeStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // The persisted preference is read through an external store so SSR and the
  // first client render stay in sync (no setState inside an effect). React uses
  // `getServerSnapshot` during hydration, then re-reads the client snapshot.
  const persistedCollapsed = useSyncExternalStore(
    subscribeStorage,
    () => window.localStorage.getItem(KEY) === "1",
    () => false,
  );
  const [collapseOverride, setCollapseOverride] = useState<boolean | null>(null);
  const collapsed = collapseOverride ?? persistedCollapsed;
  const setCollapsed = useCallback(
    (next: boolean | ((value: boolean) => boolean)) => {
      setCollapseOverride((previous) => {
        const current = previous ?? persistedCollapsed;
        return typeof next === "function" ? next(current) : next;
      });
    },
    [persistedCollapsed],
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // Persist the collapse preference (writes to an external system — allowed in effects).
  useEffect(() => {
    if (collapseOverride === null) return;
    window.localStorage.setItem(KEY, collapseOverride ? "1" : "0");
  }, [collapseOverride]);

  // ⌘K opens create palette shortcut; ⌘B toggles sidebar (Linear-like)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const key = e.key.toLowerCase();
      if (key === "b") {
        e.preventDefault();
        setCollapsed((v) => !v);
      }
      if (key === "k") {
        e.preventDefault();
        setCreateOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCollapsed]);

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller au contenu du dashboard
      </a>

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          "min-h-dvh transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed ? "lg:pl-[116px]" : "lg:pl-[288px]",
        )}
      >
        <Topbar onOpenMobile={() => setMobileOpen(true)} onCreate={() => setCreateOpen(true)} />
        <main id="dashboard-main" className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
