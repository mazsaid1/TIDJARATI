"use client";

import { Check, Languages } from "lucide-react";

import { LOCALE_LABEL, LOCALES, LOCALE_SHORT } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/components/ui/primitives";

import { useI18n } from "./i18n-provider";

/**
 * Language switcher (FR / EN / AR).
 *
 * Compact variant for the marketing nav, dashboard topbar and auth screens;
 * `field` variant for the settings page.
 */
export function LocaleSwitcher({ className, compact = true }: { className?: string; compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <Dropdown
      align="end"
      className="w-44"
      trigger={
        <button
          type="button"
          aria-label={t("Changer de langue")}
          title={t("Changer de langue")}
          className={cn(
            "inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-2.5 text-[13px] font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
            className,
          )}
        >
          <Languages className="h-4 w-4" aria-hidden />
          {compact ? (
            <span className="tabular-nums">{LOCALE_SHORT[locale]}</span>
          ) : (
            <span>{LOCALE_LABEL[locale]}</span>
          )}
        </button>
      }
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            role="menuitemradio"
            aria-checked={active}
            onClick={() => setLocale(code)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-[13px] transition-colors",
              active ? "bg-primary-soft text-primary" : "text-foreground hover:bg-sidebar-hover",
            )}
          >
            <span className="flex-1">{LOCALE_LABEL[code]}</span>
            {active && <Check className="h-3.5 w-3.5" aria-hidden />}
          </button>
        );
      })}
    </Dropdown>
  );
}

/** Full-width `<select>` used in Settings → language. */
export function LocaleSelect({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <select
      value={locale}
      onChange={(event) => setLocale(event.target.value as typeof locale)}
      className={cn(
        "h-10 w-full rounded-xl border border-border bg-card px-3 text-[13.5px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      {LOCALES.map((code) => (
        <option key={code} value={code}>
          {LOCALE_LABEL[code]}
        </option>
      ))}
    </select>
  );
}
