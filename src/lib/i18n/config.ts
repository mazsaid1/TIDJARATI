/**
 * Locale configuration for TIDJARATI.
 *
 * Languages: French (default), English, Arabic (RTL).
 * The locale lives in the `[locale]` route segment; `proxy.ts` keeps user-facing
 * URLs clean (`/pricing`) by rewriting them to the active locale (`/fr/pricing`).
 */

export const LOCALES = ["fr", "en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** Cookie + localStorage key holding the visitor's language choice. */
export const LOCALE_STORAGE_KEY = "tidjarati-locale";
export const LOCALE_COOKIE_KEY = "tidjarati-locale";

/**
 * Request header set by `proxy.ts` with the resolved locale. Used by
 * routing-level UI that cannot read the `[locale]` route param (global 404).
 */
export const LOCALE_HEADER_KEY = "x-tidjarati-locale";

export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
};

/** BCP-47 tags used for `Intl` formatting (prices stay in DZD). */
export const LOCALE_INTL: Record<Locale, string> = {
  fr: "fr-DZ",
  en: "en-DZ",
  ar: "ar-DZ",
};

/** Native label shown in the language switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

/** Short code shown on the compact switcher button. */
export const LOCALE_SHORT: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "ع",
};

/** `<html>` language + region hint for SEO. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  fr: "fr-DZ",
  en: "en-DZ",
  ar: "ar-DZ",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Normalise an arbitrary route param into a supported locale. */
export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** `Intl` tag for the given locale (prices are always DZD). */
export function intlLocale(locale: Locale): string {
  return LOCALE_INTL[locale] ?? LOCALE_INTL[DEFAULT_LOCALE];
}

/**
 * Resolve a locale from an `Accept-Language` header value.
 * Falls back to `DEFAULT_LOCALE` when nothing matches.
 */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;
  const candidates = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);
  for (const candidate of candidates) {
    const primary = candidate.split("-")[0];
    if (isLocale(primary)) return primary;
    if (primary === "ar") return "ar";
  }
  return DEFAULT_LOCALE;
}
