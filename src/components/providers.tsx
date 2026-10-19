"use client";

import { type ReactNode, useMemo } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { env } from "@/lib/env";
import type { Locale } from "@/lib/i18n/config";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { ThemeProvider } from "@/components/theme-provider";

function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </ThemeProvider>
  );
}

function WithConvex({ children }: { children: ReactNode }) {
  const convex = useMemo(() => new ConvexReactClient(env.convex.url), []);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

function WithClerkAndConvex({ children }: { children: ReactNode }) {
  const convex = useMemo(() => new ConvexReactClient(env.convex.url), []);
  return (
    <ClerkProvider publishableKey={env.clerk.publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

/**
 * Capability-aware provider stack.
 * - No keys  → demo mode (local mock data, dark/light theme only).
 * - Clerk    → real sessions, RBAC, org/team support.
 * - Convex   → realtime typed backend.
 *
 * The active locale always comes from the `[locale]` route segment, so the
 * server-rendered HTML already matches the visitor's language (no flash).
 */
export function AppProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  if (env.clerk.configured && env.convex.configured) {
    return (
      <Shell locale={locale}>
        <WithClerkAndConvex>{children}</WithClerkAndConvex>
      </Shell>
    );
  }

  if (env.clerk.configured) {
    return (
      <Shell locale={locale}>
        <ClerkProvider publishableKey={env.clerk.publishableKey}>{children}</ClerkProvider>
      </Shell>
    );
  }

  if (env.convex.configured) {
    return (
      <Shell locale={locale}>
        <WithConvex>{children}</WithConvex>
      </Shell>
    );
  }

  return <Shell locale={locale}>{children}</Shell>;
}
