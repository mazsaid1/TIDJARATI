"use client";

import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

import { useI18n } from "@/components/i18n/i18n-provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] bg-[image:var(--gradient-hero)]" />

      <div className="relative">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-glow">
          <Compass className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-8 font-display text-6xl font-semibold tracking-tight text-gradient">404</p>
        <h1 className="mt-3 font-display text-xl font-semibold tracking-tight">
          {t("Cette page n’existe pas (encore)")}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
          {t("Le lien a peut-être expiré ou la page est en cours de construction. Retournez à l’accueil ou explorez le dashboard de démonstration.")}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[image:var(--gradient-brand)] px-5 text-[14px] font-medium text-white shadow-[0_12px_32px_-14px_rgba(124,58,237,0.9)] transition-all hover:-translate-y-0.5"
          >
            <ArrowLeft className="rtl-flip h-4 w-4" aria-hidden />
            {t("Retour à l’accueil")}
          </Link>
          <Link
            href="/dashboard"
            className="glass inline-flex h-11 items-center rounded-xl px-5 text-[14px] font-medium transition-all hover:border-primary/40"
          >
            {t("Voir la démo")}
          </Link>
        </div>
      </div>
    </div>
  );
}
