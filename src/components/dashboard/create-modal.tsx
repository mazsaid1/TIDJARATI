"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FilePlus,
  Package,
  UsersRound,
  Megaphone,
  ArrowRight,
  Check,
  Copy,
} from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldHint } from "@/components/ui/input";
import { STORE } from "@/lib/mock/data";

const ACTIONS = [
  {
    icon: FilePlus,
    title: "Page de captation",
    desc: "Un tunnel de vente optimisé pour le COD — 12 sections prêtes à publier.",
    cta: "Créer",
  },
  {
    icon: Package,
    title: "Produit",
    desc: "Catalogue, stock, variantes et synchronisation transporteur.",
    cta: "Ajouter",
  },
  {
    icon: Megaphone,
    title: "Campagne",
    desc: "Pixels Meta/TikTok, audiences et suivi des conversions API.",
    cta: "Lancer",
  },
  {
    icon: UsersRound,
    title: "Inviter un membre",
    desc: "Rôles et permissions granulaires pour votre équipe ou agence.",
    cta: "Inviter",
  },
];

export function CreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = `https://${STORE.domain}/automne-2026`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Que souhaitez-vous créer ?"
      description="Tout est synchronisé en temps réel avec votre boutique et vos transporteurs."
      size="lg"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {ACTIONS.map((a) => (
          <button
            key={a.title}
            onClick={onClose}
            className="group rounded-xl border border-border bg-card/60 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <a.icon className="h-4 w-4" aria-hidden />
            </span>
            <p className="mt-3 text-[14px] font-semibold">{a.title}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{a.desc}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary">
              {a.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4">
        <Label htmlFor="share-link">Lien de partage rapide</Label>
        <div className="flex items-center gap-2">
          <Input id="share-link" value={link} readOnly icon={<Copy className="h-3.5 w-3.5" />} />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigator.clipboard?.writeText(link).catch(() => undefined);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : null}
            {copied ? "Copié" : "Copier"}
          </Button>
        </div>
        <FieldHint>Partageable sur WhatsApp, Instagram et les marketplaces.</FieldHint>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-[12.5px] text-muted-foreground">
          Besoin d’un modèle ?{" "}
          <Link href="/dashboard/marketing" className="font-medium text-primary hover:underline">
            Bibliothèque de templates
          </Link>
        </p>
        <Button variant="ghost" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </Modal>
  );
}
