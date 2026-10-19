import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { MarketingNav } from "@/components/marketing/nav";
import { FAQSection } from "@/components/marketing/faq";
import { PLANS } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";
import { intlLocale, toLocale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const t = getT(locale);
  return {
    title: t("Tarifs"),
    description: t("Des tarifs transparents en DZD. Plan gratuit permanent, sans engagement."),
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const t = getT(locale);

  return (
    <div className="min-h-dvh">
      <MarketingNav />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline">{t("Tarifs")}</Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("Simple, transparent,")} <span className="text-gradient">{t("algérien")}</span>
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            {t("Passez du premier article au millionième dinar sans changer d’outil. Changez de plan à tout moment — le prorata est calculé automatiquement.")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "card-premium relative flex flex-col p-6",
                plan.featured && "border-primary/50 shadow-glow lg:-translate-y-2",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-brand)] px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                  {t("Le plus choisi")}
                </span>
              )}
              <h2 className="font-display text-[16px] font-semibold">{t(plan.name)}</h2>
              <p className="mt-1.5 min-h-9 text-[13px] leading-snug text-muted-foreground">{t(plan.tagline)}</p>
              <p className="mt-4 font-display text-3xl font-semibold tracking-tight tabular-nums">
                {formatNumber(plan.price, intlLocale(locale))}
                <span className="ms-1 text-[13px] font-normal text-faint">{t("DZD / mois")}</span>
              </p>
              <p className="mt-1 text-[12px] text-faint tabular-nums">
                {t("soit {yearly} DZD / an (−20 %)", { yearly: formatNumber(plan.yearly, intlLocale(locale)) })}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] leading-snug">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">{t(f)}</span>
                  </li>
                ))}
                {plan.limits.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-[13px] leading-snug text-faint">
                    <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {t(l)}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className={cn(
                  "mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl text-[14px] font-medium transition-all",
                  plan.featured
                    ? "bg-[image:var(--gradient-brand)] text-white shadow-[0_12px_32px_-14px_rgba(124,58,237,0.9)] hover:-translate-y-0.5"
                    : "border border-border-strong hover:border-primary/50 hover:bg-primary-soft",
                )}
              >
                {plan.price === 0 ? t("Créer mon compte") : t("Choisir ce plan")}
                <ArrowRight className="rtl-flip h-3.5 w-3.5" aria-hidden />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-center font-display text-2xl font-semibold tracking-tight">
            {t("Questions fréquentes sur les tarifs")}
          </h2>
          <div className="mt-8">
            <FAQSection />
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-[12.5px] text-faint sm:px-6">
          <p>{t("© 2026 TIDJARATI. Tous droits réservés.")}</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-foreground">
              {t("Confidentialité")}
            </Link>
            <Link href="/support" className="hover:text-foreground">
              {t("Support")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
