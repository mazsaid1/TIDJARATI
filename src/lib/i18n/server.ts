import type { Locale } from "./config";
import { translate, type TVars } from "./translate";

export type Translator = (key: string, vars?: TVars) => string;

/**
 * Server-side translator factory.
 *
 * Server Components receive the locale from the `[locale]` route segment
 * (`await params`), so no request-time API (`cookies()`/`headers()`) is needed —
 * routes stay statically prerendered per locale.
 */
export function getT(locale: Locale): Translator {
  return (key, vars) => translate(locale, key, vars);
}
