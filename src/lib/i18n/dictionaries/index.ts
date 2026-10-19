import type { Locale } from "../config";
import type { Dictionary } from "../types";
import { en } from "./en";
import { ar } from "./ar";

/**
 * Dictionaries for every supported locale.
 *
 * `fr` is intentionally empty: French copy is the key, so translation is the
 * identity function and the reference wording can never drift.
 *
 * Fragments are split by product area (`core`, `marketing`, `auth`, `shell`,
 * `dashboard`) to keep them reviewable and conflict-free.
 */
export const DICTIONARIES: Record<Locale, Dictionary> = {
  fr: {},
  en,
  ar,
};
