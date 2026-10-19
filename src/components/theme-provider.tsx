"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { DEFAULT_THEME, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

export type { Theme };
export type ResolvedTheme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

type Snapshot = { theme: Theme; system: ResolvedTheme };

type ThemeContextValue = {
  /** `undefined` until the client has read `localStorage` (keeps hydration deterministic). */
  theme: Theme | undefined;
  resolvedTheme: ResolvedTheme | undefined;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Lightweight replacement for `next-themes`.
 *
 * `next-themes@0.4` renders its boot script as a `<script>` inside a Client
 * Component, which React 19 rejects with “Encountered a script tag while
 * rendering React component”. Here the boot script is emitted once by the
 * server layout (`src/app/[locale]/layout.tsx`) and this provider only keeps
 * React state in sync with `localStorage` + `prefers-color-scheme`.
 */
const listeners = new Set<() => void>();

/** Cached so `useSyncExternalStore` gets a stable reference between notifications. */
let cachedSnapshot: Snapshot | null = null;

function notify() {
  cachedSnapshot = null;
  for (const listener of listeners) listener();
}

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* storage unavailable (private mode, blocked cookies) */
  }
  return DEFAULT_THEME;
}

function readSystemTheme(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  const media = window.matchMedia(DARK_QUERY);
  const onSystemChange = () => notify();
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) notify();
  };

  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Snapshot {
  cachedSnapshot ??= { theme: readTheme(), system: readSystemTheme() };
  return cachedSnapshot;
}

/** `null` on the server: the inline script owns the first paint. */
function getServerSnapshot(): Snapshot | null {
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const theme = snapshot?.theme;
  const resolvedTheme = snapshot
    ? snapshot.theme === "system"
      ? snapshot.system
      : snapshot.theme
    : undefined;

  useEffect(() => {
    if (!resolvedTheme) return;
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    notify();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
