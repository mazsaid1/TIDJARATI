"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import { env } from "@/lib/env";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

const ClerkSignUp = dynamic(
  () => import("@/components/auth/clerk-sign-up").then((m) => m.ClerkSignUp),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="skeleton h-10 w-10 rounded-xl" />
        <p className="text-[13px] text-faint">Chargement de l’inscription…</p>
      </div>
    ),
  },
);

const PERKS = [
  "Plan gratuit permanent, sans carte bancaire",
  "Pages de captation + pixels Meta/TikTok inclus",
  "Assistant IA en français, arabe et darija",
  "Configuration guidée en 4 minutes",
];

export default function SignUpPage() {
  if (env.clerk.configured) return <ClerkSignUp />;
  return <DemoSignUp />;
}

function DemoSignUp() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] bg-[image:var(--gradient-hero)]" />

      <div className="relative grid w-full max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] font-display text-lg font-bold text-white">
              H
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">TIDJARATI</span>
          </Link>
          <h1 className="mt-7 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            The AI Commerce Operating System for{" "}
            <span className="text-gradient">Algeria</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Boutique, commandes COD, logistique, publicité et IA — réunis dans une seule plateforme,
            pensée pour les marchands d’Algérie.
          </p>
          <ul className="mt-7 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14px] text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <Card className="p-7">
          <div className="text-center">
            <h2 className="font-display text-xl font-semibold tracking-tight">Créer mon compte</h2>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">Gratuit — aucune carte requise.</p>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="Noura Amrane" required />
            </div>
            <div>
              <Label htmlFor="email">E-mail professionnel</Label>
              <Input id="email" type="email" placeholder="vous@boutique.dz" required />
            </div>
            <div>
              <Label htmlFor="store">Nom de la boutique</Label>
              <Input id="store" placeholder="Atelier Noura" required />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="8 caractères minimum"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Créer mon compte gratuit
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </form>

          <p className="mt-4 text-center text-[12.5px] text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              Se connecter
            </Link>
          </p>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] text-faint">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            En créant un compte, vous acceptez nos{" "}
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              conditions d’utilisation
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
