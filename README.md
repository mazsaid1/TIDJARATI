# TIDJARATI — *The AI Commerce Operating System for Algeria*

> Nom de package : `tidjarati` · Nom produit affiché : **TIDJARATI**

SaaS e‑commerce multi‑tenant (Algérie) : landing marketing premium,
dashboard temps réel, assistant IA, gestion COD, marketing et facturation.
Construit avec **Next.js 16 (App Router)** + **TypeScript** + **TailwindCSS v4**, avec
**Clerk**, **Convex**, **Stripe**, **Resend** et **PostHog** activables progressivement.

---

## ⚡️ Démarrage en 30 secondes (mode démo)

```bash
npm install
npm run dev
```

Ouvrez <http://localhost:3000>.

**Aucune clé API n'est requise.** L'application démarre en **mode démo** :
la landing, l'authentification (formulaire local), le dashboard complet
(Overview, Analytics, Commandes, Produits, Clients, Marketing, IA, Abonnement,
Équipe, Notifications, Paramètres) et l'IA répondent avec un jeu de données
déterministe (`src/lib/mock/data.ts`).

---

## 🧱 Stack

| Domaine            | Choix                                                       |
| ------------------ | ----------------------------------------------------------- |
| Framework          | Next.js `16.4.2` (App Router, Turbopack, Cache Components)  |
| Langage            | TypeScript `5`                                              |
| UI                 | TailwindCSS `4`, kit de composants maison (style shadcn)    |
| Icônes / charts    | `lucide-react`, `recharts`                                  |
| Thème              | `next-themes` (clair / sombre / système)                     |
| Authentification   | Clerk `@clerk/nextjs` v7 (optionnel)                        |
| Base de données    | Convex (optionnel)                                          |
| Paiements          | Stripe (optionnel)                                          |
| E‑mail             | Resend (optionnel)                                          |
| Analytics produit  | PostHog (optionnel)                                         |

Palette de marque : primary `#7C3AED`, secondary `#A78BFA`, fond sombre `#0F172A`,
surfaces `#111827`/`#1E293B`, succès `#10B981`, danger `#EF4444`, alerte `#F59E0B`.
Typographies : **Inter** + **Plus Jakarta Sans**.

---

## 📜 Scripts

| Script                  | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Serveur de développement (Turbopack)                     |
| `npm run build`         | Build de production                                      |
| `npm run start`         | Serveur de production (après `build`)                    |
| `npm run lint`          | ESLint (0 erreur attendue)                              |
| `npm run typecheck`     | `tsc --noEmit`                                          |
| `npm run convex:dev`    | Développement Convex (nécessite un déploiement)          |
| `npm run convex:deploy` | Déploiement des fonctions Convex                         |

---

## 🗺️ Routes

**Marketing** : `/` (hero « The Future of Commerce in Algeria », piliers, features,
intégrations, pricing, témoignages, FAQ, CTA), `/pricing`, `/support`, `/privacy-policy`.

**Auth** : `/sign-in`, `/sign-up` (Clerk si configuré, sinon formulaire démo).

**Dashboard** (sidebar flottante repliable + topbar + command palette `⌘K`) :
`/dashboard`, `/dashboard/analytics`, `/dashboard/orders`, `/dashboard/products`,
`/dashboard/customers`, `/dashboard/marketing`, `/dashboard/ai`, `/dashboard/billing`,
`/dashboard/team`, `/dashboard/notifications`, `/dashboard/settings`.

**API** : `POST /api/ai` (endpoint OpenAI‑compatible, repli démo déterministe),
`POST /api/stripe/checkout`, `POST /api/stripe/webhook`.

---

## 🔐 Mode démo & capacités

La source de vérité est **`src/lib/env.ts`**. Chaque capacité est activée dès que
ses variables d'environnement sont présentes :

| Capacité        | Variables activantes                                  | Sans clé → comportement démo          |
| --------------- | ----------------------------------------------------- | ------------------------------------- |
| Clerk (auth)    | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Formulaire local → `/dashboard`     |
| Convex (données)| `NEXT_PUBLIC_CONVEX_URL` (+ `CONVEX_DEPLOY_KEY`)      | Données mock locales                  |
| Stripe (paiement)| `STRIPE_SECRET_KEY` (+ webhook, prix)                 | Checkout simulé, message d'aide       |
| IA              | `OPENAI_API_KEY` (+ `OPENAI_BASE_URL`, `OPENAI_MODEL`) | Réponses déterministes                |
| E‑mail (Resend) | `RESEND_API_KEY`                                      | Envois désactivés                     |
| PostHog         | `NEXT_PUBLIC_POSTHOG_KEY` (+ host)                    | Télémétrie désactivée                 |

Copiez les clés depuis **`.env.example`** vers `.env.local`. `src/proxy.ts`
(ex‑`middleware.ts` en Next 16) protège `/dashboard(.*)` et `/api/private(.*)`
uniquement lorsque Clerk est configuré.

---

## 🧩 Backend Convex

`convex/` contient un schéma multi‑tenant prêt à l'emploi
(`orgs`, `members`, `products`, `customers`, `orders`, `events`, `campaigns`,
`pixels`, `aiArtifacts`, `notifications`) et ses fonctions (`orders.ts`,
`products.ts`, `orgs.ts`).

> ⚠️ Les types générés (`convex/_generated/*`) nécessitent un déploiement :
> `npx convex dev` (avec `CONVEX_DEPLOYMENT`) puis `npx convex codegen`.
> En attendant, `convex/` est exclu du `tsconfig` racine et possède son propre
> `convex/tsconfig.json`.

---

## ▲ Déploiement (Vercel)

1. Importez le dépôt sur Vercel — la détection Next.js est automatique.
2. Ajoutez les variables d'environnement souhaitées (facultatif — le mode démo
   fonctionne sans).
3. Si vous utilisez Convex, déployez les fonctions (`npx convex deploy`) et
   renseignez `NEXT_PUBLIC_CONVEX_URL`.

---

## 📝 Notes

- **Polices** : `next/font/google` (Inter, Plus Jakarta Sans) nécessite un accès
  réseau **au moment du build** ; les fichiers sont ensuite mis en cache dans `.next`.
- **Sécurité npm** : `npm audit` remonte 5 vulnérabilités *high* **uniquement
  dev**, transitives via `eslint-config-next → fast-glob → micromatch → braces`.
  Aucun impact à l'exécution ; le correctif automatique (`npm audit fix --force`)
  rétrograderait `eslint-config-next` en 14.x.

---

© 2026 TIDJARATI. Tous droits réservés.
