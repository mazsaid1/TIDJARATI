import { NextResponse } from "next/server";

import { env } from "@/lib/env";

type Message = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `Tu es l'assistant IA de TIDJARATI, le système d'exploitation commerce IA pour l'Algérie.
Tu aides les marchands algériens à : analyser leurs ventes, rédiger des pages de
captation optimisées conversion, relancer les commandes COD, et piloter leurs campagnes publicitaires.
Réponds en français, de façon concise et opérationnelle. Utilise des chiffres et des actions concrètes.
Quand tu proposes une action, indique l'impact estimé (DZD, % ou heures gagnées).`;

const DEMO_REPLY = `Voici mon analyse croisée de vos données 30 jours :

1. **Tapis Berbère 120×180** concentre 32 % de votre chiffre d'affaires avec seulement 8 unités de stock. Réapprovisionnez avant vendredi pour éviter une rupture qui coûterait ≈ 180 000 DZD.

2. Votre **ROAS WhatsApp (23,6×)** écrase Meta (4,7×). Je recommande de déplacer 25 % du budget Meta vers des séquences WhatsApp automatiques — impact estimé : **+ 95 000 DZD / mois**.

3. Les **annulations COD** se concentrent à Oran (14 %) entre 18 h et 21 h. Une relance téléphonique automatique après 20 min réduirait ce taux d'environ un tiers.

Souhaitez-vous que je prépare ces trois actions dans votre calendrier marketing ?`;

export async function POST(request: Request) {
  let messages: Message[] = [];
  try {
    const body = (await request.json()) as { messages?: Message[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "Aucun message fourni." }, { status: 400 });
  }

  // Demo mode — deterministic high-quality reply, no key required.
  if (!env.openai.configured) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({
      reply: DEMO_REPLY,
      model: "tidjarati-demo",
      source: "demo",
    });
  }

  try {
    const res = await fetch(`${env.openai.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: env.openai.model,
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-12),
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[ai] provider error", res.status, detail.slice(0, 400));
      return NextResponse.json({ reply: DEMO_REPLY, source: "fallback" }, { status: 200 });
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: reply || DEMO_REPLY,
      model: env.openai.model,
      source: "openai",
    });
  } catch (error) {
    console.error("[ai] request failed", error);
    return NextResponse.json({ reply: DEMO_REPLY, source: "fallback" }, { status: 200 });
  }
}
