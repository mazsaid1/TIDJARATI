import type { Locale } from "./config";
import { DICTIONARIES } from "./dictionaries";
import type { Dictionary } from "./types";

export type TVars = Record<string, string | number>;

/**
 * Translate a French source key (gettext-style) into the active locale.
 *
 * French copy is the source of truth: the `fr` dictionary is empty, so the key
 * itself is returned and reference wording can never drift. Placeholders use
 * `{name}` and are filled from `vars`.
 */
export function translate(locale: Locale, key: string, vars?: TVars): string {
  const dictionary: Dictionary | undefined = DICTIONARIES[locale];
  const template = dictionary?.[key] ?? key;
  if (!vars) return template;
  return template.replace(/\{\s*(\w+)\s*\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined || value === null ? match : String(value);
  });
}
