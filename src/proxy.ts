import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { env } from "@/lib/env";

/**
 * Next.js 16 request proxy (ex-`middleware.ts` — the middleware convention is
 * deprecated and renamed to `proxy`).
 *
 * - With Clerk configured → real `clerkMiddleware` with public marketing routes
 *   and protected dashboard/private API routes (RBAC lives in Convex).
 * - Without keys (demo mode) → pass-through so `npm run dev` works out of the box.
 */

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  if (!env.clerk.configured) {
    return NextResponse.next();
  }

  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");
  const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/private(.*)"]);

  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      const { userId } = await auth();
      if (!userId) {
        const signIn = new URL("/sign-in", req.url);
        signIn.searchParams.set("redirect_url", req.url);
        return NextResponse.redirect(signIn);
      }
    }
  })(request, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
