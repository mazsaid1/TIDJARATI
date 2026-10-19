import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { env } from "@/lib/env";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE_KEY,
  LOCALE_HEADER_KEY,
  LOCALES,
  localeFromAcceptLanguage,
  type Locale,
} from "@/lib/i18n/config";

/**
 * Next.js 16 request proxy (ex-`middleware.ts` — the middleware convention is
 * deprecated and renamed to `proxy`).
 *
 * Internationalization
 * --------------------
 * Every page lives under `app/[locale]/`, but visitors never see the locale in
 * the URL: a request for `/pricing` is *rewritten* to `/fr/pricing` (the active
 * locale). That keeps clean, shareable URLs while still letting the server
 * render the correct language, `<html lang>` and `dir="rtl"` — no flash, no
 * hydration mismatch. Requests that already carry a locale prefix
 * (`/ar/pricing`) are honoured and remembered in a cookie.
 *
 * Authentication
 * --------------
 * - With Clerk configured → real `clerkMiddleware` with public marketing routes
 *   and protected dashboard/private API routes (RBAC lives in Convex).
 * - Without keys (demo mode) → pass-through so `npm run dev` works out of the box.
 */

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function resolveLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE_KEY)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

function localeFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return isLocale(segment) ? segment : null;
}

function hasLocalePrefix(pathname: string) {
  return LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

function persistLocale(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE_KEY, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Route handlers (and Next internals) are locale-agnostic.
  const isApi = pathname.startsWith("/api");
  const explicitLocale = localeFromPath(pathname);
  const locale = explicitLocale ?? (isApi ? DEFAULT_LOCALE : resolveLocale(request));

  // Only rewrite when the visitor did not ask for a specific locale.
  const localized = isApi || hasLocalePrefix(pathname);
  let rewriteUrl: URL | null = null;
  if (!localized) {
    rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  }

  const next = () => {
    // Expose the resolved locale to server components outside `[locale]`
    // (notably `app/global-not-found.tsx`, which cannot read route params).
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER_KEY, locale);
    const response = rewriteUrl
      ? NextResponse.rewrite(rewriteUrl, { request: { headers } })
      : NextResponse.next({ request: { headers } });
    return persistLocale(response, locale);
  };

  if (!env.clerk.configured) {
    return next();
  }

  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");
  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/api/private(.*)",
    "/(fr|en|ar)/dashboard(.*)",
    "/(fr|en|ar)/api/private(.*)",
  ]);

  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      const { userId } = await auth();
      if (!userId) {
        const signIn = new URL(`/${locale}/sign-in`, req.url);
        signIn.searchParams.set("redirect_url", req.url);
        return NextResponse.redirect(signIn);
      }
    }
    return next();
  })(request, event);
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)",
  ],
};
