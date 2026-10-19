"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "En quoi TIDJARATI est-il différent d’une plateforme e-commerce classique ?",
    a: "TIDJARATI n’est pas qu’une boutique : c’est un système d’exploitation commercial. Nous combinons infrastructure (boutique, pages de captation, paiement COD, transporteurs), une couche IA (contenus, relances, prévisions) et une couche croissance (pixels, CRM, campagnes) dans une seule plateforme pensée pour l’Algérie — avec le paiement à la livraison, l’arabe, le français et les réalités logistiques locales au cœur du produit.",
  },
  {
    q: "Le paiement à la livraison (COD) est-il géré de bout en bout ?",
    a: "Oui. Confirmation téléphonique ou WhatsApp automatisée, scoring de risque anti-fraude (reCAPTCHA v3 + historique client), suivi transporteur (Yalidine, ZR Express, Maystro), rapprochement des encaissements et détection des retours. Vous voyez le taux de confirmation et de livraison par ville, par canal et par transporteur.",
  },
  {
    q: "Puis-je connecter mes propres pixels publicitaires ?",
    a: "Jusqu’à 7 pixels simultanés par page — Meta, TikTok, Google Ads, Snapchat — avec conversions API serveur pour contourner les bloqueurs. TIDJARATI gère la déduplication des événements et l’attribution multi-canal.",
  },
  {
    q: "L’IA fonctionne-t-elle en arabe et en darija ?",
    a: "Oui. L’assistant rédige en français, en arabe standard et en darija algérienne : fiches produit, pages de captation, messages de relance SMS/WhatsApp, méta-données SEO. Le support RTL est natif sur toutes les pages publiques.",
  },
  {
    q: "Comment fonctionne la facturation en Algérie ?",
    a: "Carte CIB et Edahabia via SATIM, carte internationale via Stripe, ou virement bancaire avec facture PDF. Les prix sont affichés en DZD, taxes comprises. Sans carte, vous pouvez démarrer gratuitement.",
  },
  {
    q: "Mes données sont-elles hébergées où ?",
    a: "Vos données applicatives sont chiffrées au repos et en transit, hébergées sur une infrastructure européenne (Paris) avec réplication quotidienne. Vous restez propriétaire de vos données et pouvez les exporter à tout moment (CSV, JSON, API).",
  },
  {
    q: "Puis-je gérer plusieurs boutiques ?",
    a: "Oui, avec le plan Scale : multi-boutiques (toutes en DZD), rôles et permissions par boutique, rapports consolidés et SSO pour les agences.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-sidebar-hover focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none sm:px-6"
            >
              <span className="text-[14.5px] font-medium leading-snug">{item.q}</span>
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border text-faint transition-all duration-300",
                  isOpen && "rotate-45 border-primary/40 bg-primary-soft text-primary",
                )}
                aria-hidden
              >
                <Plus className="h-3.5 w-3.5" />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground sm:px-6">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
