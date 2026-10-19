import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin, Clock, FileText, Shield, Zap } from "lucide-react";

import { MarketingNav } from "@/components/marketing/nav";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Support",
  description: "Centre d’aide TIDJARATI — documentation, contact et ressources développeurs.",
};

const DOCS = [
  {
    icon: Zap,
    title: "Démarrage rapide",
    desc: "Créez votre boutique, importez votre catalogue et publiez votre première page de captation en 4 minutes.",
  },
  {
    icon: FileText,
    title: "API & webhooks",
    desc: "REST + webhooks signés pour synchroniser commandes, stocks et clients avec vos outils internes.",
  },
  {
    icon: Shield,
    title: "Sécurité & conformité",
    desc: "RBAC, 2FA, reCAPTCHA v3, chiffrement au repos et en transit, journal d’audit exportable.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-dvh">
      <MarketingNav />
      <main id="main-content" className="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <div className="text-center">
          <Badge variant="primary">Support</Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Comment pouvons-nous <span className="text-gradient">vous aider</span> ?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
            Équipe basée en Algérie, support en français, arabe et anglais. Réponse moyenne en moins
            de 2 heures ouvrées.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Phone, label: "Téléphone / WhatsApp", value: "0782 91 22 55", href: "tel:+213782912255" },
            { icon: Mail, label: "E-mail", value: "support@tidjarati.com", href: "mailto:support@tidjarati.com" },
            { icon: MessageCircle, label: "Chat in-app", value: "Lun–Sam · 9 h–19 h", href: "#docs" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="card-premium card-hover flex flex-col items-center gap-3 p-6 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary">
                <c.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-[12.5px] text-muted-foreground">{c.label}</p>
                <p className="mt-0.5 font-display text-[15px] font-semibold">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div id="docs" className="mt-16 grid gap-4 sm:grid-cols-3 scroll-mt-28">
          {DOCS.map((d) => (
            <Card key={d.title} className="card-hover">
              <CardHeader>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary">
                  <d.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <CardTitle className="mt-3">{d.title}</CardTitle>
                <CardDescription>{d.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard" className="text-[13px] font-medium text-primary hover:underline">
                  Consulter →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Informations pratiques</CardTitle>
            <CardDescription>Siège et horaires de l’équipe TIDJARATI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-[13.5px] font-medium">Bureaux</p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    Hydra, Alger — Algérie
                    <br />
                    Oran — Algérie (bureau régional)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-[13.5px] font-medium">Horaires support</p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    Lundi – Vendredi : 9 h – 19 h (UTC+1)
                    <br />
                    Samedi : 9 h – 14 h · Dimanche : fermé
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 text-[12.5px] text-faint sm:px-6">
          <p>© 2026 TIDJARATI . Tous droits réservés.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Confidentialité
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Tarifs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
