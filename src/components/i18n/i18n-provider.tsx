"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  intlLocale,
  LOCALE_COOKIE_KEY,
  LOCALE_DIR,
  LOCALE_HTML_LANG,
  type Locale,
} from "@/lib/i18n/config";
import { translate, type TVars } from "@/lib/i18n/translate";
import {
  DEMO_NOW,
  formatCompact,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  relativeTime,
} from "@/lib/utils";

export type I18nValue = {
  locale: Locale;
  /** `rtl` for Arabic, `ltr` otherwise. */
  dir: "ltr" | "rtl";
  isRTL: boolean;
  /** Translate a French source key (gettext-style) into the active locale. */
  t: (key: string, vars?: TVars) => string;
  /** Switch language: persists the choice and re-renders the server tree. */
  setLocale: (locale: Locale) => void;
  /** Locale-aware formatters — prices always in DZD. */
  format: {
    currency: (value: number, currency?: string) => string;
    number: (value: number) => string;
    compact: (value: number) => string;
    percent: (value: number) => string;
    date: (iso: string, options?: Intl.DateTimeFormatOptions) => string;
    relative: (iso: string) => string;
  };
};

const I18nContext = createContext<I18nValue | null>(null);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = LOCALE_HTML_LANG[locale];
  root.dir = LOCALE_DIR[locale];
  root.dataset.locale = locale;
}

/**
 * Locale provider.
 *
 * The initial locale comes from the server (`[locale]` route segment), so the
 * prerendered HTML already has the right language and `dir`. Switching language
 * writes the cookie and calls `router.refresh()`, which re-runs the proxy
 * rewrite server-side — no flash, no hydration mismatch.
 */
export function I18nProvider({ locale: initialLocale, children }: { locale: Locale; children: ReactNode }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [syncedFrom, setSyncedFrom] = useState<Locale>(initialLocale);

  // Adjust state when the server renders a new locale (e.g. after
  // `router.refresh()`): React's recommended alternative to a
  // setState-in-effect, which would trigger a cascading render.
  if (initialLocale !== syncedFrom) {
    setSyncedFrom(initialLocale);
    setLocaleState(initialLocale);
  }

  // Keeps <html lang/dir> in sync (also re-applies after the dev StrictMode remount).
  useLayoutEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      try {
        document.cookie = `${LOCALE_COOKIE_KEY}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
      } catch {
        /* cookies unavailable (SSR) — the server default still applies */
      }
      setLocaleState(next);
      router.refresh();
    },
    [locale, router],
  );

  const value = useMemo<I18nValue>(() => {
    const tag = intlLocale(locale);
    return {
      locale,
      dir: LOCALE_DIR[locale],
      isRTL: LOCALE_DIR[locale] === "rtl",
      t: (key, vars) => translate(locale, key, vars),
      setLocale,
      format: {
        currency: (amount, currency) => formatCurrency(amount, currency, tag),
        number: (amount) => formatNumber(amount, tag),
        compact: (amount) => formatCompact(amount, tag),
        percent: (amount) => formatPercent(amount, tag),
        date: (iso, options) => formatDate(iso, tag, options),
        relative: (iso) => relativeTime(iso, DEMO_NOW, locale),
      },
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Convenience hook when only the translator is needed. */
export function useT() {
  return useI18n().t;
}
