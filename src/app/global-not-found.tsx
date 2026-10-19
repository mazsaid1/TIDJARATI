import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import "./globals.css";
import { LOCALE_DIR, LOCALE_HTML_LANG, LOCALES, type Locale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "404 — TIDJARATI",
  robots: { index: false, follow: false },
};

/**
 * 404 globale, rendue par le routeur (hors layouts).
 *
 * Pourquoi ce fichier : le root layout vit sous le segment dynamique
 * `[locale]`, donc Next ne peut pas composer une 404 commune aux trois
 * locales. `global-not-found` doit rester **entièrement statique** (Cache
 * Components interdit `headers()`/`cookies()` au prérendu) : la locale est
 * donc résolue côté client, avant le premier paint, à partir du cookie
 * `tidjarati-locale` puis de `navigator.language`. Les trois variantes sont
 * prérendues et seule celle de la locale active est affichée (CSS).
 */
const T = {
  fr: getT("fr"),
  en: getT("en"),
  ar: getT("ar"),
} satisfies Record<Locale, ReturnType<typeof getT>>;

const LOCALE_SCRIPT = `(function(){try{
var m=document.cookie.match(/(?:^|; )tidjarati-locale=(fr|en|ar)/);
var l=m?m[1]:(function(){var n=(navigator.language||"fr").slice(0,2).toLowerCase();return n==="ar"||n==="en"?n:"fr";})();
var d=document.documentElement;
d.lang=l==="ar"?"ar-DZ":l+"-DZ";
d.dir=l==="ar"?"rtl":"ltr";
d.setAttribute("data-locale",l);
}catch(e){}})();`;

export default function GlobalNotFound() {
  return (
    <html lang="fr-DZ" dir="ltr" data-locale="fr" className="h-full">
      <head>
        <style>{`
          html[data-locale="fr"] [data-locale-block]:not([data-locale-block="fr"]),
          html[data-locale="en"] [data-locale-block]:not([data-locale-block="en"]),
          html[data-locale="ar"] [data-locale-block]:not([data-locale-block="ar"]) { display: none !important; }
        `}</style>
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <script dangerouslySetInnerHTML={{ __html: LOCALE_SCRIPT }} />
        {LOCALES.map((locale) => {
          const t = T[locale];
          return (
            <div
              key={locale}
              data-locale-block={locale}
              lang={LOCALE_HTML_LANG[locale]}
              dir={LOCALE_DIR[locale]}
              className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 text-center"
            >
              <div aria-hidden className="absolute inset-0 grid-bg" />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[400px] bg-[image:var(--gradient-hero)]"
              />

              <div className="relative">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-glow">
                  <Compass className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-8 font-display text-6xl font-semibold tracking-tight text-gradient">
                  404
                </p>
                <h1 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {t("Cette page n’existe pas (encore)")}
                </h1>
                <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                  {t(
                    "Le lien a peut-être expiré ou la page est en cours de construction. Retournez à l’accueil ou explorez le dashboard de démonstration.",
                  )}
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
        })}
      </body>
    </html>
  );
}
