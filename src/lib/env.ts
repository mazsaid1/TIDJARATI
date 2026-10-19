/**
 * Capability detection.
 *
 * The app runs in "demo mode" out of the box (no keys required) so `npm run dev`
 * works immediately. Adding Clerk / Convex / Stripe / OpenAI keys flips the
 * corresponding capability on without touching component code.
 */

const truthy = (value: string | undefined) => Boolean(value && value.trim().length > 0);

export const env = {
  clerk: {
    configured: truthy(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY),
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
    secretKey: process.env.CLERK_SECRET_KEY ?? "",
  },
  convex: {
    configured: truthy(process.env.NEXT_PUBLIC_CONVEX_URL),
    url: process.env.NEXT_PUBLIC_CONVEX_URL ?? "",
  },
  stripe: {
    configured: truthy(process.env.STRIPE_SECRET_KEY),
    secretKey: process.env.STRIPE_SECRET_KEY ?? "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
    priceIds: {
      starter: process.env.STRIPE_PRICE_STARTER ?? "",
      growth: process.env.STRIPE_PRICE_GROWTH ?? "",
      scale: process.env.STRIPE_PRICE_SCALE ?? "",
    },
  },
  openai: {
    configured: truthy(process.env.OPENAI_API_KEY),
    apiKey: process.env.OPENAI_API_KEY ?? "",
    baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  },
  resend: {
    configured: truthy(process.env.RESEND_API_KEY),
    apiKey: process.env.RESEND_API_KEY ?? "",
  },
} as const;

/** True when no third-party service is configured → pure local demo experience. */
export const isDemoMode = !env.clerk.configured && !env.convex.configured;

export type Capabilities = {
  auth: "clerk" | "demo";
  data: "convex" | "mock";
  billing: "stripe" | "mock";
  ai: "openai" | "mock";
  email: "resend" | "mock";
};

export function capabilities(): Capabilities {
  return {
    auth: env.clerk.configured ? "clerk" : "demo",
    data: env.convex.configured ? "convex" : "mock",
    billing: env.stripe.configured ? "stripe" : "mock",
    ai: env.openai.configured ? "openai" : "mock",
    email: env.resend.configured ? "resend" : "mock",
  };
}
