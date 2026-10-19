import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

import { AppProviders } from "@/components/providers";
import { LOCALES, LOCALE_DIR, LOCALE_HTML_LANG, toLocale } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import { THEME_BOOT_SCRIPT } from "@/lib/theme";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

/** Arabic needs a proper Arabic type family — Inter/Jakarta have no Arabic glyphs. */
const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

/** Per-language SEO copy. */
const SEO = {
  fr: {
    title: "TIDJARATI — Le système d’exploitation du commerce en Algérie",
    description:
      "Lancez, gérez et développez votre commerce en ligne avec l’IA, des analyses en temps réel et une infrastructure de niveau entreprise. Paiement à la livraison et 58 wilayas.",
  },
  en: {
    title: "TIDJARATI — The AI Commerce Operating System for Algeria",
    description:
      "Launch, manage, and scale your online business with AI-powered tools, realtime analytics, and enterprise-grade infrastructure. Built for merchants in Algeria.",
  },
  ar: {
    title: "تِجاراتي — نظام تشغيل التجارة بالذكاء الاصطناعي في الجزائر",
    description:
      "أطلق متجرك الإلكتروني وأدِرْه وطوّره بأدوات مدعومة بالذكاء الاصطناعي وتحليلات فورية وبنية تحتية بمستوى المؤسسات. الدفع عند الاستلام و58 ولاية.",
  },
} as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const seo = SEO[locale];

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://tidjarati.com"),
    title: { default: seo.title, template: "%s · TIDJARATI" },
    description: seo.description,
    keywords: [
      "eCommerce SaaS",
      "Algeria commerce",
      "AI commerce",
      "online store builder",
      "COD order management",
      "Algeria eCommerce",
      "multi-tenant SaaS",
      "DZD",
      "wilayas",
    ],
    openGraph: {
      type: "website",
      siteName: "TIDJARATI",
      title: seo.title,
      description: seo.description,
      locale: LOCALE_HTML_LANG[locale].replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
    },
    robots: { index: true, follow: true },
    category: "software",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);
  const t = getT(locale);

  return (
    <html
      lang={LOCALE_HTML_LANG[locale]}
      dir={LOCALE_DIR[locale]}
      data-locale={locale}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${jakarta.variable} ${arabic.variable} min-h-dvh antialiased`}
      >
        {/*
          No-flash theme boot: applied before the first paint, on the server
          layout (a script rendered inside a Client Component would never run —
          React 19 rejects it). Keeps `class="dark"` in sync with the same
          `localStorage` key the ThemeProvider uses.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }}
          suppressHydrationWarning
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          {t("Aller au contenu principal")}
        </a>
        <AppProviders locale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}
