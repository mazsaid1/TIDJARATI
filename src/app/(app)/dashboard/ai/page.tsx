"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, WandSparkles, ChartBar, Languages, MessageCircleQuestionMark, RotateCcw } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/primitives";
import { cn, formatCurrency } from "@/lib/utils";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  {
    icon: ChartBar,
    label: "Analyser mes ventes du mois",
    prompt: "Quelles sont mes meilleures ventes du mois et que devrais-je pousser en publicité ?",
  },
  {
    icon: WandSparkles,
    label: "Rédiger une page de captation",
    prompt: "Crée le texte d'une page de captation pour un tapis berbère à 7 900 DZD, livraison COD.",
  },
  {
    icon: Languages,
    label: "Traduire en darija",
    prompt: "Traduis la description de ma boutique en arabe algérien pour WhatsApp.",
  },
  {
    icon: MessageCircleQuestionMark,
    label: "Réduire les annulations COD",
    prompt: "Comment réduire mes annulations de commandes COD sur Oran et Sétif ?",
  },
];

const REPLIES: Record<string, string> = {
  default:
    "Voici mon analyse croisée de vos données 30 jours :\n\n1. **Tapis Berbère 120×180** concentre 32 % de votre chiffre d'affaires avec seulement 8 unités de stock. Réapprovisionnez avant vendredi.\n\n2. Votre **ROAS WhatsApp (23,6×)** écrase Meta (4,7×). Je recommande de déplacer 25 % du budget Meta vers des séquences WhatsApp automatiques.\n\n3. Les **annulations COD** se concentrent à Oran (14 %) entre 18 h et 21 h. Une relance téléphonique automatique après 20 min réduirait ce taux d'environ un tiers.\n\nSouhaitez-vous que je prépare ces actions dans le calendrier marketing ?",
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      content:
        "Bonjour Noura 👋 Je suis votre assistant IA TIDJARATI. J'ai analysé vos 1 284 commandes des 30 derniers jours. Que souhaitez-vous améliorer aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { id: `u${Date.now()}`, role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    const t0 = performance.now();

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        { id: `a${Date.now()}`, role: "assistant", content: data.reply ?? REPLIES.default },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: `a${Date.now()}`, role: "assistant", content: REPLIES.default },
      ]);
    } finally {
      setLatency(Math.round(performance.now() - t0));
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Assistant IA</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Analyse vos données, rédige vos pages et automatise vos relances — en français, arabe ou darija.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setMessages([
              {
                id: "m0",
                role: "assistant",
                content: "Nouvelle conversation démarrée. Comment puis-je vous aider ?",
              },
            ])
          }
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Nouvelle conversation
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        {/* Chat */}
        <Card className="flex h-[calc(100dvh-260px)] min-h-[520px] flex-col overflow-hidden">
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
              >
                {m.role === "assistant" ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </span>
                ) : (
                  <Avatar name="Noura Amrane" size="sm" />
                )}
                <div
                  className={cn(
                    "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed",
                    m.role === "assistant"
                      ? "rounded-tl-sm border border-border bg-muted/60 text-foreground"
                      : "rounded-tr-sm bg-[image:var(--gradient-brand)] text-white",
                  )}
                >
                  {m.content.split("\n\n").map((para, i) => (
                    <p key={i} className={cn(i > 0 && "mt-2.5")}>
                      {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") ? (
                          <strong key={j}>{part.slice(2, -2)}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        ),
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] text-white">
                  <Sparkles className="h-4 w-4 animate-pulse" aria-hidden />
                </span>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-muted/60 px-4 py-3.5">
                  <span className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 animate-pulse-dot rounded-full bg-primary"
                        style={{ animationDelay: `${i * 160}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-4"
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Demandez une analyse, un texte, une automatisation…"
                aria-label="Message à l’assistant IA"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-[13.5px] outline-none transition-colors placeholder:text-faint hover:border-border-strong focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/30"
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Envoyer">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11.5px] text-faint">
              <span>Entrée pour envoyer · Maj+Entrée pour un saut de ligne</span>
              {latency && <span className="tabular-nums">Réponse en {(latency / 1000).toFixed(1)} s</span>}
            </div>
          </form>
        </Card>

        {/* Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">Actions suggérées</p>
            <Badge variant="gradient">IA</Badge>
          </div>
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => send(s.prompt)}
              className="group w-full rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <s.icon className="h-4 w-4" aria-hidden />
              </span>
              <p className="mt-2.5 text-[13.5px] font-medium">{s.label}</p>
            </button>
          ))}
          <div className="rounded-xl border border-border bg-muted/40 p-3.5">
            <p className="text-[12px] leading-relaxed text-muted-foreground">
              L’assistant s’appuie sur vos données Convex en temps réel : commandes, stocks, campagnes et
              segments clients. Aucune donnée n’est utilisée pour l’entraînement de modèles tiers.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-border-strong p-3.5">
            <p className="text-[12.5px] font-medium">Coût estimé ce mois</p>
            <p className="mt-1 text-[12px] text-muted-foreground tabular-nums">
              184 requêtes · ≈ {formatCurrency(1240)} inclut dans le plan Growth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
