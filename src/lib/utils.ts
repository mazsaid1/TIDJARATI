import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { DEFAULT_LOCALE, LOCALE_INTL, type Locale } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/translate";

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** The only currency TIDJARATI bills in — Algerian dinar. */
export const CURRENCY = "DZD";

export function formatCurrency(
  value: number,
  currency: string = CURRENCY,
  locale: string = LOCALE_INTL[DEFAULT_LOCALE],
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatNumber(value: number, locale: string = LOCALE_INTL[DEFAULT_LOCALE]) {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatCompact(value: number, locale: string = LOCALE_INTL[DEFAULT_LOCALE]) {
  return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatPercent(value: number, locale: string = LOCALE_INTL[DEFAULT_LOCALE]) {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  }).format(value / 100);
}

export function formatDate(
  iso: string,
  locale: string = LOCALE_INTL[DEFAULT_LOCALE],
  options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" },
) {
  return new Date(iso).toLocaleDateString(locale, options);
}

/**
 * Fixed reference timestamp for the deterministic demo dataset.
 *
 * `cacheComponents` forbids non-deterministic values (e.g. `new Date()`) during
 * prerendering. The mock data is anchored around 2026-10-19, so we expose a
 * constant "now" instead of calling `new Date()` at render time.
 */
export const DEMO_NOW = new Date("2026-10-19T09:35:00.000Z");

export function relativeTime(iso: string, now: Date = DEMO_NOW, locale: Locale = DEFAULT_LOCALE) {
  const diff = now.getTime() - new Date(iso).getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return translate(locale, "à l’instant");
  if (minutes < 60) return translate(locale, "il y a {n} min", { n: minutes });
  const hours = Math.round(minutes / 60);
  if (hours < 24) return translate(locale, "il y a {n} h", { n: hours });
  const days = Math.round(hours / 24);
  if (days < 30) return translate(locale, "il y a {n} j", { n: days });
  return formatDate(iso, LOCALE_INTL[locale]);
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
