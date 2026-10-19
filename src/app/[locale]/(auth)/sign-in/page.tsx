"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { env } from "@/lib/env";
import { useI18n } from "@/components/i18n/i18n-provider";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

// Clerk is only loaded when a publishable key is present — keeps demo mode lean.
const ClerkSignIn = dynamic(
  () => import("@/components/auth/clerk-sign-in").then((m) => m.ClerkSignIn),
  { ssr: false, loading: () => <AuthSkeleton /> },
);

function AuthSkeleton() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="skeleton h-10 w-10 rounded-xl" />
      <p className="text-[13px] text-faint">{t("Chargement de l’authentification…")}</p>
    </div>
  );
}

/**
 * Sign-in page.
 * - Clerk configured → real Clerk <SignIn />.
 * - Demo mode → local credential form that routes to /dashboard.
 */
export default function SignInPage() {
  if (env.clerk.configured) return <ClerkSignIn />;
  return <DemoSignIn />;
}

function DemoSignIn() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] bg-[image:var(--gradient-hero)]" />

      <div className="absolute end-4 top-4 z-10">
        <LocaleSwitcher />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] font-display text-lg font-bold text-white shadow-[0_8px_28px_-10px_rgba(124,58,237,0.9)]">
            H
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">TIDJARATI</span>
        </Link>

        <Card className="p-7">
          <div className="text-center">
            <h1 className="font-display text-xl font-semibold tracking-tight">
              {t("Bon retour parmi nous")}
            </h1>
            <p className="mt-1.5 text-[13.5px] text-muted-foreground">
              {t("Connectez-vous pour accéder à votre tableau de bord.")}
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
              <Label htmlFor="email">{t("E-mail professionnel")}</Label>
              <Input id="email" type="email" defaultValue="noura@atelier-noura.dz" required />
            </div>
            <div>
              <Label htmlFor="password">{t("Mot de passe")}</Label>
              <Input id="password" type="password" defaultValue="demo-password" required />
            </div>
            <Button type="submit" size="lg" className="w-full">
              {t("Se connecter")}
              <ArrowRight className="rtl-flip h-4 w-4" aria-hidden />
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-[12.5px]">
            <Link href="/sign-up" className="font-medium text-primary hover:underline">
              {t("Créer un compte")}
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground">
              {t("Mot de passe oublié ?")}
            </Link>
          </div>
        </Card>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> {t("Chiffrement TLS")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> {t("Mode démonstration actif")}
          </span>
        </div>

        <p className="mt-4 text-center text-[11.5px] leading-relaxed text-faint">
          {t("Ajoutez")}{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          </code>{" "}
          {t("pour activer l’authentification réelle.")}
        </p>
      </div>
    </div>
  );
}
