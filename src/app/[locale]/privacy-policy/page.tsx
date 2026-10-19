import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { MarketingNav } from "@/components/marketing/nav";
import { Badge } from "@/components/ui/badge";
import { toLocale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getT(locale);
  return {
    title: t("Confidentialité & CGU"),
    description: t("Politique de confidentialité, conditions d’utilisation et gestion des cookies de la plateforme TIDJARATI."),
  };
}

const SECTIONS = [
  {
    title: "1. Données que nous collectons",
    body: "Nous collectons les données nécessaires au fonctionnement de votre compte : identité (nom, e-mail, téléphone), données de votre boutique (catalogue, commandes, clients, campagnes) et données techniques (journal d’audit, adresse IP à des fins de sécurité). Nous n’utilisons jamais vos données commerciales pour entraîner des modèles tiers.",
  },
  {
    title: "2. Finalités du traitement",
    body: "Vos données sont traitées pour : fournir le service (tenue de la boutique, commandes, livraison, facturation), sécuriser votre compte (2FA, détection de fraude), vous envoyer des communications transactionnelles (confirmations, alertes de stock) et, uniquement avec votre consentement, des communications marketing.",
  },
  {
    title: "3. Sous-traitants & localisation",
    body: "Nous nous appuyons sur : Clerk (authentification), Convex (base de données temps réel), Stripe (paiement), Resend (e-mail transactionnel) et nos partenaires de livraison (Yalidine, ZR Express, Maystro). Les données applicatives sont hébergées dans l’Union européenne (Paris) avec réplication quotidienne.",
  },
  {
    title: "4. Durée de conservation",
    body: "Les données de compte sont conservées pendant toute la durée de votre abonnement puis 12 mois après la résiliation, sauf demande d’effacement anticipée. Les factures sont conservées 10 ans conformément à la réglementation comptable algérienne.",
  },
  {
    title: "5. Vos droits",
    body: "Vous disposez d’un droit d’accès, de rectification, d’export et d’effacement de vos données. L’export complet (CSV, JSON) est disponible depuis Paramètres → Boutique. Toute demande peut être adressée à privacy@tidjarati.com et traitée sous 30 jours.",
  },
  {
    title: "6. Cookies",
    body: "Nous utilisons des cookies strictement nécessaires (session, préférences de thème) et, avec votre consentement préalable, des cookies de mesure d’audience et de publicité (pixels Meta, TikTok, Google). Le bandeau de consentement permet de refuser ou de modifier vos choix à tout moment.",
  },
  {
    title: "7. Sécurité",
    body: "Chiffrement TLS en transit et AES-256 au repos, accès restreint par rôle (RBAC), journal d’audit horodaté, sauvegardes quotidiennes chiffrées et tests d’intrusion réguliers. En cas d’incident affectant vos données, vous serez informé sans délai tardif.",
  },
  {
    title: "8. Conditions d’utilisation",
    body: "En utilisant TIDJARATI, vous vous engagez à vendre des produits légaux, à honorer vos conditions de livraison et de retour, et à ne pas utiliser la plateforme pour du spam ou du tracking non consenti. Les plans payants sont sans engagement, résiliables à tout moment avec effet à la fin du cycle en cours.",
  },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const t = getT(locale);

  return (
    <div className="min-h-dvh">
      <MarketingNav />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <div className="text-center">
          <Badge variant="outline">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            {t("Légal")}
          </Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("Confidentialité &")} <span className="text-gradient">{t("conditions")}</span>
          </h1>
          <p className="mt-4 text-[14px] text-muted-foreground">
            {t("Dernière mise à jour : 19 octobre 2026 · Version 1.0")}
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {SECTIONS.map((s) => (
            <section key={s.title} className="card-premium p-6">
              <h2 className="font-display text-[16px] font-semibold tracking-tight">{t(s.title)}</h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{t(s.body)}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-border-strong p-6 text-center">
          <p className="text-[13.5px] text-muted-foreground">
            {t("Une question sur vos données ? Écrivez à")}{" "}
            <a href="mailto:privacy@tidjarati.com" className="font-medium text-primary hover:underline">
              privacy@tidjarati.com
            </a>
          </p>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 text-[12.5px] text-faint sm:px-6">
          <p>{t("© 2026 TIDJARATI. Tous droits réservés.")}</p>
          <div className="flex gap-5">
            <Link href="/support" className="hover:text-foreground">
              {t("Support")}
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              {t("Tarifs")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
