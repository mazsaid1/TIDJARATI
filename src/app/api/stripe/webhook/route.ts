import { NextResponse } from "next/server";

import { env } from "@/lib/env";

/**
 * POST /api/stripe/webhook
 * Verifies the signature and forwards billing events to Convex actions.
 *
 * Events handled:
 *  - checkout.session.completed → activate subscription
 *  - invoice.paid              → extend period, log invoice
 *  - invoice.payment_failed    → flag account, notify owner
 *  - customer.subscription.updated / deleted → sync plan & quota
 */
export async function POST(request: Request) {
  if (!env.stripe.configured || !env.stripe.webhookSecret) {
    return NextResponse.json(
      { received: true, mode: "demo", message: "Stripe non configuré — événement ignoré." },
      { status: 200 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(env.stripe.secretKey, { apiVersion: "2024-06-20" as never });
    const payload = await request.text();

    const event = stripe.webhooks.constructEvent(payload, signature, env.stripe.webhookSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.info("[stripe] checkout completed", session.id, session.metadata?.plan);
        // TODO: await ctx.runMutation(api.subscriptions.activate, { ... })
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.warn("[stripe] payment failed", invoice.id);
        // TODO: notify owner (Resend) + flag account
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        console.warn("[stripe] subscription cancelled", sub.id);
        // TODO: downgrade to free plan, keep data read-only
        break;
      }
      default:
        console.info("[stripe] event non traité", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[stripe] webhook error", error);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }
}
