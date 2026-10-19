"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#integrations", label: "Intégrations" },
  { href: "/#pricing", label: "Tarifs" },
  { href: "/#testimonials", label: "Témoignages" },
  { href: "/#faq", label: "FAQ" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <nav
        aria-label="Navigation principale"
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-2xl px-4 transition-all duration-300 sm:px-5",
          scrolled ? "glass shadow-[var(--shadow-md)]" : "border border-transparent",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="TIDJARATI — accueil">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] font-display text-sm font-bold text-white shadow-[0_6px_20px_-8px_rgba(124,58,237,0.9)]">
            H
          </span>
          <span className="font-display text-[15.5px] font-semibold tracking-tight">TIDJARATI</span>
        </Link>

        <ul className="ml-6 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-hover hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="hidden h-9 items-center rounded-xl px-3.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-hover hover:text-foreground sm:inline-flex"
          >
            Connexion
          </Link>
          <Link
            href="/sign-up"
            className="group hidden h-9 items-center gap-1.5 rounded-xl bg-[image:var(--gradient-brand)] px-4 text-[13.5px] font-medium text-white shadow-[0_8px_26px_-10px_rgba(124,58,237,0.9)] transition-all hover:-translate-y-0.5 sm:inline-flex"
          >
            Commencer
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-4 mt-2 overflow-hidden rounded-2xl border border-glass-border bg-background-elevated transition-all duration-300 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <ul className="p-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-[14.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-hover hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex gap-2 border-t border-border p-2">
            <Link
              href="/sign-in"
              className="flex h-10 flex-1 items-center justify-center rounded-xl border border-border text-[14px] font-medium"
            >
              Connexion
            </Link>
            <Link
              href="/sign-up"
              className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-[14px] font-medium text-white"
            >
              Commencer
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
