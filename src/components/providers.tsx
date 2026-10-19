"use client";

import { type ReactNode, useMemo } from "react";
import { ThemeProvider } from "next-themes";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { env } from "@/lib/env";

function Shell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="tidjarati-theme"
    >
      {children}
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
 */
export function AppProviders({ children }: { children: ReactNode }) {
  if (env.clerk.configured && env.convex.configured) {
    return (
      <Shell>
        <WithClerkAndConvex>{children}</WithClerkAndConvex>
      </Shell>
    );
  }

  if (env.clerk.configured) {
    return (
      <Shell>
        <ClerkProvider publishableKey={env.clerk.publishableKey}>{children}</ClerkProvider>
      </Shell>
    );
  }

  if (env.convex.configured) {
    return (
      <Shell>
        <WithConvex>{children}</WithConvex>
      </Shell>
    );
  }

  return <Shell>{children}</Shell>;
}
