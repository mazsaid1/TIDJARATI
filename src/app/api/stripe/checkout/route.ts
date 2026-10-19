import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { PLANS } from "@/lib/mock/data";

/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout session for a given plan.
 * Falls back to a mock confirmation payload in demo mode (no key required).
 */
export async function POST(request: Request) {
  let planId: string = "growth";
  try {
    const body = (await request.json()) as { plan?: string };
    if (body.plan) planId = body.plan;
  } catch {
    /* body optionnel */
  }

  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Plan inconnu." }, { status: 404 });
  }

  if (!env.stripe.configured) {
    return NextResponse.json({
      mode: "demo",
      plan: plan.id,
      amount: plan.price,
      currency: "DZD",
      url: null,
      message: "Ajoutez STRIPE_SECRET_KEY pour activer le paiement réel.",
    });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(env.stripe.secretKey, { apiVersion: "2024-06-20" as never });

    const priceKey = plan.id as keyof typeof env.stripe.priceIds;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: env.stripe.priceIds[priceKey]
        ? [{ price: env.stripe.priceIds[priceKey], quantity: 1 }]
        : undefined,
      currency: "dzd",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/billing?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/billing?status=cancelled`,
      metadata: { plan: plan.id },
    });

    return NextResponse.json({ mode: "stripe", url: session.url, id: session.id });
  } catch (error) {
    console.error("[stripe] checkout error", error);
    return NextResponse.json(
      { error: "Impossible de créer la session de paiement." },
      { status: 500 },
    );
  }
}
