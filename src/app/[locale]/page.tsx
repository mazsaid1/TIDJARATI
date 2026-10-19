import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Layers,
  Rocket,
  Store,
  Truck,
  CreditCard,
  ChartBar,
  Bot,
  Megaphone,
  Users,
  Globe,
  ShieldCheck,
  Zap,
  MapPin,
  Star,
} from "lucide-react";

import { MarketingNav } from "@/components/marketing/nav";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { FAQSection } from "@/components/marketing/faq";
import { PLANS } from "@/lib/mock/data";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";
import { intlLocale, toLocale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";

/* -------------------------------- Sections -------------------------------- */

const PILLARS = [
  {
    icon: Layers,
    label: "Commerce Infrastructure",
    title: "Toute votre opération, unifiée",
    desc: "Boutique, pages de captation, commandes COD, paiement, stocks, transporteurs et facturation — synchronisés en temps réel, sans tableur ni bricolage.",
    points: ["Pages de captation 12 sections", "COD + CIB/Edahabia", "Yalidine · ZR Express · Maystro"],
  },
  {
    icon: Sparkles,
    label: "AI Layer",
    title: "Une IA qui connaît votre catalogue",
    desc: "Rédigez fiches produit, pages et relances en français, arabe ou darija. Obtenez des recommandations actionnables chaque matin, chiffrées en DZD.",
    points: ["Contenus générés en 3 langues", "Recommandations quotidiennes", "Prévisions de rupture de stock"],
  },
  {
    icon: Rocket,
    label: "Growth Layer",
    title: "Acquérez et convertissez plus",
    desc: "Jusqu’à 7 pixels par page avec conversions API serveur, segments CRM automatiques, A/B testing et attribution multi-canal incluse.",
    points: ["7 pixels + Conversions API", "CRM & segments auto", "Attribution multi-canal"],
  },
];

const FEATURES = [
  { icon: Store, title: "Boutique & pages de captation", desc: "Templates conversion-first optimisés mobile, avec preuve sociale, compte à rebours et formulaire COD court." },
  { icon: Truck, title: "Logistique COD", desc: "Confirmation automatique, scoring anti-fraude, suivi transporteur et rapprochement des encaissements." },
  { icon: CreditCard, title: "Paiements locaux & internationaux", desc: "CIB, Edahabia (SATIM), Stripe, virement bancaire — avec factures PDF automatiques." },
  { icon: ChartBar, title: "Analytics temps réel", desc: "Entonnoirs, cohortes, LTV, marge par produit, performance par ville — sans attendre de batch nocturne." },
  { icon: Bot, title: "Assistant IA intégré", desc: "Analyse vos données, rédige vos contenus et prépare vos campagnes depuis une simple conversation." },
  { icon: Megaphone, title: "Pixels & Conversions API", desc: "Meta, TikTok, Google, Snapchat — déduplication automatique et tracking résistant aux bloqueurs." },
  { icon: Users, title: "CRM & segments", desc: "Segments VIP, récents, à risque calculés automatiquement. Relances WhatsApp et e-mail en un clic." },
  { icon: Globe, title: "Multi-langue & RTL natif", desc: "Anglais, français, arabe — RTL natif, prix en DZD sur les 58 wilayas." },
  { icon: ShieldCheck, title: "Sécurité entreprise", desc: "RBAC par rôle, 2FA, reCAPTCHA v3, journal d’audit, SSO (plan Scale) et export de vos données à tout moment." },
];

const INTEGRATIONS = [
  { name: "Yalidine", cat: "Livraison" },
  { name: "ZR Express", cat: "Livraison" },
  { name: "Maystro", cat: "Livraison" },
  { name: "Meta Ads", cat: "Publicité" },
  { name: "TikTok Ads", cat: "Publicité" },
  { name: "Google Ads", cat: "Publicité" },
  { name: "SATIM / CIB", cat: "Paiement" },
  { name: "Stripe", cat: "Paiement" },
  { name: "WhatsApp Business", cat: "Messaging" },
  { name: "Resend", cat: "E-mail" },
  { name: "Clerk", cat: "Auth" },
  { name: "Convex", cat: "Données" },
];

const TESTIMONIALS = [
  {
    quote:
      "On gérait nos commandes COD dans trois tableurs et deux groupes WhatsApp. TIDJARATI a tout unifié : nos taux de livraison sont passés de 68 % à 84 % en deux mois.",
    name: "Yasmine Kaci",
    role: "Fondatrice, Dar Sofa · Alger",
    metric: "+16 pts de livraison",
  },
  {
    quote:
      "L’assistant IA rédige nos fiches produit en darija en trente secondes. Avant, on passait deux jours par collection. Notre catalogue triple chaque trimestre.",
    name: "Amine Belhadj",
    role: "Directeur e-commerce, Medina Home · Oran",
    metric: "×3 la cadence",
  },
  {
    quote:
      "Les pages de captation convertissent à 6,4 % sur mobile, contre 1,8 % sur notre ancien site. Le tracking conversions API a divisé notre CPA par deux.",
    name: "Sara Benali",
    role: "Growth lead, Atlas Cosmetics · Casablanca",
    metric: "CPA ÷ 2",
  },
];

const LOGOS = ["MEDINA HOME", "DAR SOFA", "ATLAS COSMETICS", "NOURA CRAFT", "KASBAH TECH", "SAHARA SPORT"];

/* --------------------------------- Page ----------------------------------- */

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = toLocale((await params).locale);
  const t = getT(locale);

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <MarketingNav />

      <main id="main-content">
        {/* ------------------------------- HERO -------------------------------- */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div aria-hidden className="absolute inset-0 grid-bg" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] bg-[image:var(--gradient-hero)]" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Link
                href="/#features"
                className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1.5 text-[12.5px] font-medium text-primary transition-colors hover:border-primary/60"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-primary" />
                </span>
                {t("Nouveau · Assistant IA en darija et arabe")}
                <ArrowRight className="rtl-flip h-3 w-3" />
              </Link>

              <h1 className="animate-fade-up delay-100 mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
                {t("The Future of Commerce")}
                <br />
                {t("in")} <span className="text-gradient">{t("Algeria")}</span>
              </h1>

              <p className="animate-fade-up delay-200 mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground sm:text-lg">
                {t("Lancez, gérez et développez votre commerce en ligne avec des outils d’IA, des analyses en temps réel et une infrastructure de niveau entreprise. Conçu pour les marchands d’Algérie.")}
              </p>

              <div className="animate-fade-up delay-300 mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/sign-up"
                  className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-6 text-[15px] font-medium text-white shadow-[0_16px_44px_-16px_rgba(124,58,237,0.95)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(124,58,237,1)]"
                >
                  {t("Commencer gratuitement")}
                  <ArrowRight className="rtl-flip h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="glass inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-[15px] font-medium transition-all hover:border-primary/40 hover:shadow-glow"
                >
                  <Zap className="h-4 w-4 text-primary" aria-hidden />
                  {t("Voir la démo produit")}
                </Link>
              </div>

              <p className="animate-fade-up delay-400 mt-5 text-[13px] text-faint">
                {t("Sans carte bancaire · Plan gratuit permanent · Configuration en 4 minutes")}
              </p>
            </div>

            <div className="animate-fade-up delay-400 mt-16 sm:mt-20">
              <DashboardPreview />
            </div>

            {/* Logos */}
            <div className="mt-20">
              <p className="text-center text-[12px] font-medium tracking-[0.18em] text-faint uppercase">
                {t("Plus de 2 400 marchands nous font confiance")}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                {LOGOS.map((l) => (
                  <span
                    key={l}
                    className="font-display text-[13px] font-semibold tracking-[0.14em] text-faint opacity-70 transition-opacity hover:opacity-100"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------ PILLARS ------------------------------ */}
        <section id="features" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary">{t("The AI Commerce Operating System")}</Badge>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("Trois couches. Un seul système d’exploitation.")}
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
                {t("La plupart des marchands empilent des outils. TIDJARATI les unifie : infrastructure, intelligence artificielle et croissance partagent les mêmes données, en temps réel.")}
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {PILLARS.map((p, i) => (
                <article
                  key={p.label}
                  className={cn(
                    "card-premium card-hover relative flex flex-col p-6 sm:p-7",
                    i === 1 && "lg:-translate-y-3 lg:shadow-glow",
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 -top-px h-px bg-[image:var(--gradient-brand)] opacity-40"
                  />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-5 text-[12px] font-semibold tracking-[0.14em] text-primary uppercase">
                    {t(p.label)}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{t(p.title)}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">{t(p.desc)}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                        <Check className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                        {t(pt)}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ FEATURES ----------------------------- */}
        <section className="relative py-20 sm:py-28">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)] opacity-20" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <Badge variant="outline">{t("Fonctionnalités")}</Badge>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t("Tout ce qu’il faut pour vendre en ligne en Algérie")}
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {t("Du premier visiteur à la livraison confirmée — chaque brique est pensée pour le paiement à la livraison, le mobile et les réalités logistiques locales.")}
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  className="group card-premium card-hover flex flex-col p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white">
                    <f.icon className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-[15.5px] font-semibold tracking-tight">{t(f.title)}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t(f.desc)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- INTEGRATIONS --------------------------- */}
        <section id="integrations" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="card-premium relative overflow-hidden p-8 sm:p-12">
              <div
                aria-hidden
                className="absolute -top-24 -end-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px]"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                <div>
                  <Badge variant="primary">{t("Intégrations")}</Badge>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {t("Connecté à tout votre écosystème")}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {t("Transporteurs, publicité, paiement, messagerie — TIDJARATI synchronise automatiquement vos données dans les deux sens. Et une API complète + webhooks pour tout le reste.")}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-[12.5px] font-medium">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                      {t("Livraison 58 wilayas")}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-[12.5px] font-medium">
                      <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
                      {t("PCI-DSS via partenaires")}
                    </span>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {INTEGRATIONS.map((i) => (
                    <li
                      key={i.name}
                      className="group flex flex-col justify-between rounded-xl border border-border bg-card/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
                    >
                      <span className="font-display text-[13.5px] font-semibold">{i.name}</span>
                      <span className="mt-1 text-[11.5px] text-faint">{t(i.cat)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------- PRICING ----------------------------- */}
        <section id="pricing" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">{t("Tarifs")}</Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("Des prix pensés pour l’Algérie")}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                {t("Facturation mensuelle en DZD. Changez ou annulez à tout moment — sans engagement.")}
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
                  <h3 className="font-display text-[16px] font-semibold">{t(plan.name)}</h3>
                  <p className="mt-1.5 min-h-9 text-[13px] leading-snug text-muted-foreground">{t(plan.tagline)}</p>
                  <p className="mt-4 font-display text-3xl font-semibold tracking-tight tabular-nums">
                    {formatNumber(plan.price, intlLocale(locale))}
                    <span className="ms-1 text-[13px] font-normal text-faint">{t("DZD / mois")}</span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] leading-snug">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden />
                        <span className="text-muted-foreground">{t(f)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/sign-up"
                    className={cn(
                      "mt-6 inline-flex h-11 items-center justify-center rounded-xl text-[14px] font-medium transition-all",
                      plan.featured
                        ? "bg-[image:var(--gradient-brand)] text-white shadow-[0_12px_32px_-14px_rgba(124,58,237,0.9)] hover:-translate-y-0.5"
                        : "border border-border-strong hover:border-primary/50 hover:bg-primary-soft",
                    )}
                  >
                    {plan.price === 0 ? t("Créer mon compte") : t("Choisir ce plan")}
                  </Link>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-[13px] text-muted-foreground">
              {t("Tous les plans incluent SSL, sauvegardes quotidiennes et support en français. TVA en sus selon votre régime.")}
            </p>
          </div>
        </section>

        {/* ---------------------------- TESTIMONIALS --------------------------- */}
        <section id="testimonials" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">{t("Témoignages")}</Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("Des marchands qui ont changé d’échelle")}
              </h2>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((item, i) => (
                <figure
                  key={item.name}
                  className={cn(
                    "card-premium card-hover flex flex-col p-6",
                    i === 1 && "lg:shadow-glow",
                  )}
                >
                  <div className="flex items-center gap-1 text-warning" aria-label={t("5 étoiles")}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-muted-foreground">
                    “{t(item.quote)}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:linear-gradient(135deg,#7c3aed,#a78bfa)] text-[12px] font-bold text-white">
                        {item.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold">{item.name}</p>
                        <p className="text-[12px] text-faint">{t(item.role)}</p>
                      </div>
                    </div>
                    <Badge variant="success" className="shrink-0 tabular-nums">
                      {t(item.metric)}
                    </Badge>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------- FAQ -------------------------------- */}
        <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">{t("FAQ")}</Badge>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {t("Questions fréquentes")}
              </h2>
            </div>
            <div className="mt-12">
              <FAQSection />
            </div>
          </div>
        </section>

        {/* --------------------------------- CTA -------------------------------- */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="card-premium relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="absolute inset-x-0 -top-32 h-64 rounded-full bg-[image:var(--gradient-brand)] opacity-25 blur-[100px]"
              />
              <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-[1.1]">
                  {t("The Future of Commerce in")}{" "}
                  <span className="text-gradient">{t("Algeria")}</span>{" "}
                  {t("commence maintenant.")}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  {t("Rejoignez plus de 2 400 marchands qui gèrent leurs ventes, leur logistique et leur croissance depuis TIDJARATI.")}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/sign-up"
                    className="group inline-flex h-12 items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 text-[15px] font-medium text-white shadow-[0_16px_44px_-16px_rgba(124,58,237,0.95)] transition-all hover:-translate-y-0.5"
                  >
                    {t("Créer mon compte gratuit")}
                    <ArrowRight className="rtl-flip h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/support"
                    className="glass inline-flex h-12 items-center rounded-2xl px-7 text-[15px] font-medium transition-all hover:border-primary/40"
                  >
                    {t("Parler à un expert")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------- FOOTER -------------------------------- */}
      <footer className="border-t border-border py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-brand)] font-display text-sm font-bold text-white">
                  T
                </span>
                <span className="font-display text-[15.5px] font-semibold tracking-tight">TIDJARATI</span>
              </div>
              <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
                {t("The AI Commerce Operating System for Algeria. Infrastructure, intelligence et croissance — réunis dans un seul système.")}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="outline">{t("🇩🇿 Algérie")}</Badge>
                <Badge variant="outline">{t("58 wilayas")}</Badge>
              </div>
            </div>

            {[
              {
                title: "Produit",
                links: [
                  { label: "Fonctionnalités", href: "/#features" },
                  { label: "Intégrations", href: "/#integrations" },
                  { label: "Tarifs", href: "/#pricing" },
                  { label: "Démo dashboard", href: "/dashboard" },
                ],
              },
              {
                title: "Ressources",
                links: [
                  { label: "Documentation", href: "/support" },
                  { label: "API & webhooks", href: "/support" },
                  { label: "Centre d’aide", href: "/support" },
                  { label: "Statut", href: "/support" },
                ],
              },
              {
                title: "Légal",
                links: [
                  { label: "Conditions d’utilisation", href: "/privacy-policy" },
                  { label: "Confidentialité", href: "/privacy-policy" },
                  { label: "Cookies", href: "/privacy-policy" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold tracking-[0.14em] text-faint uppercase">
                  {t(col.title)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(l.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-[12.5px] text-faint">
              {t("© 2026 TIDJARATI. Tous droits réservés.")}
            </p>
            <p className="text-[12.5px] text-faint">
              {t("Fait avec")} <span className="text-danger">♥</span>{" "}
              {t("pour les marchands d’Algérie")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
