"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import { env } from "@/lib/env";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

const ClerkSignUp = dynamic(
  () => import("@/components/auth/clerk-sign-up").then((m) => m.ClerkSignUp),
  {
    ssr: false,
    loading: () => <AuthSkeleton />,
  },
);

function AuthSkeleton() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="skeleton h-10 w-10 rounded-xl" />
      <p className="text-[13px] text-faint">{t("Chargement de l’inscription…")}</p>
    </div>
  );
}

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
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] bg-[image:var(--gradient-hero)]" />

      <div className="absolute end-4 top-4 z-10">
        <LocaleSwitcher />
      </div>

      <div className="relative grid w-full max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] font-display text-lg font-bold text-white">
              H
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">TIDJARATI</span>
          </Link>
          <h1 className="mt-7 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("The AI Commerce Operating System for")}{" "}
            <span className="text-gradient">{t("Algeria")}</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {t(
              "Boutique, commandes COD, logistique, publicité et IA — réunis dans une seule plateforme, pensée pour les marchands d’Algérie.",
            )}
          </p>
          <ul className="mt-7 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14px] text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                {t(p)}
              </li>
            ))}
          </ul>
        </div>

        <Card className="p-7">
          <div className="text-center">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              {t("Créer mon compte")}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              {t("Gratuit — aucune carte requise.")}
            </p>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/dashboard");
            }}
          >
            <div>
              <Label htmlFor="name">{t("Nom complet")}</Label>
              <Input id="name" placeholder="Noura Amrane" required />
            </div>
            <div>
              <Label htmlFor="email">{t("E-mail professionnel")}</Label>
              <Input id="email" type="email" placeholder="vous@boutique.dz" required />
            </div>
            <div>
              <Label htmlFor="store">{t("Nom de la boutique")}</Label>
              <Input id="store" placeholder="Atelier Noura" required />
            </div>
            <div>
              <Label htmlFor="password">{t("Mot de passe")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("8 caractères minimum")}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              {t("Créer mon compte gratuit")}
              <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
            </Button>
          </form>

          <p className="mt-4 text-center text-[12.5px] text-muted-foreground">
            {t("Déjà un compte ?")}{" "}
            <Link href="/sign-in" className="font-medium text-primary hover:underline">
              {t("Se connecter")}
            </Link>
          </p>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] text-faint">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            {t("En créant un compte, vous acceptez nos")}{" "}
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              {t("conditions d’utilisation")}
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
