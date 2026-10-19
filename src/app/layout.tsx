import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { AppProviders } from "@/components/providers";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://tidjarati.com"),
  title: {
    default: "TIDJARATI — The AI Commerce Operating System for Algeria",
    template: "%s · TIDJARATI",
  },
  description:
    "Launch, manage, and scale your online business with AI-powered tools, realtime analytics, and enterprise-grade infrastructure. Built for merchants in Algeria.",
  keywords: [
    "eCommerce SaaS",
    "Algeria commerce",
    "AI commerce",
    "online store builder",
    "COD order management",
    "Algeria eCommerce",
    "multi-tenant SaaS",
  ],
  openGraph: {
    type: "website",
    siteName: "TIDJARATI",
    title: "TIDJARATI — The AI Commerce Operating System for Algeria",
    description:
      "Storefront, orders, delivery, payments and an AI layer — one operating system for modern merchants.",
    locale: "fr_DZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "TIDJARATI — The AI Commerce Operating System for Algeria",
  },
  robots: { index: true, follow: true },
  category: "software",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} min-h-dvh antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Aller au contenu principal
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
