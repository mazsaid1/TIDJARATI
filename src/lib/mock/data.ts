/**
 * Demo dataset — mirrors the Convex schema shape exactly.
 * When NEXT_PUBLIC_CONVEX_URL is set the same types are fed by realtime queries.
 */

export type OrderStatus = "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "cod_pending";
export type PlanId = "free" | "starter" | "growth" | "scale";
export type Role = "owner" | "admin" | "manager" | "staff" | "viewer";

export interface Money {
  amount: number;
  currency: "DZD" | "EUR";
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "active" | "draft" | "archived";
  image: string;
  category: string;
  sales30d: number;
}

export interface Order {
  id: string;
  reference: string;
  customer: string;
  city: string;
  items: number;
  total: number;
  status: OrderStatus;
  channel: "landing" | "store" | "instagram" | "whatsapp";
  createdAt: string;
  courier?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  segment: "vip" | "regular" | "new" | "at_risk";
  lastOrderAt: string;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: number;
  hint: string;
}

export const STORE = {
  name: "Atelier Noura",
  plan: "growth" as PlanId,
  domain: "atelier-noura.tidjarati.com",
  country: "Algérie",
  currency: "DZD" as const,
};

export const KPIS: Kpi[] = [
  { id: "revenue", label: "Chiffre d'affaires", value: "4,82 M DZD", delta: 18.4, hint: "30 derniers jours" },
  { id: "orders", label: "Commandes", value: "1 284", delta: 9.7, hint: "dont 312 COD en attente" },
  { id: "conversion", label: "Taux de conversion", value: "3,9 %", delta: 2.1, hint: "visiteurs → commandes" },
  { id: "aov", label: "Panier moyen", value: "3 754 DZD", delta: -1.6, hint: "vs 3 815 le mois dernier" },
];

export const REVENUE_SERIES = [
  { label: "01/10", revenue: 118000, orders: 34, visitors: 4210 },
  { label: "03/10", revenue: 142000, orders: 41, visitors: 4870 },
  { label: "05/10", revenue: 131000, orders: 37, visitors: 4620 },
  { label: "07/10", revenue: 168000, orders: 48, visitors: 5390 },
  { label: "09/10", revenue: 155000, orders: 44, visitors: 5110 },
  { label: "11/10", revenue: 197000, orders: 57, visitors: 6020 },
  { label: "13/10", revenue: 184000, orders: 52, visitors: 5740 },
  { label: "15/10", revenue: 226000, orders: 64, visitors: 6680 },
  { label: "17/10", revenue: 211000, orders: 59, visitors: 6350 },
  { label: "19/10", revenue: 249000, orders: 71, visitors: 7120 },
];

export const CHANNEL_SPLIT = [
  { name: "Pages de captation", value: 46, color: "#7c3aed" },
  { name: "Boutique", value: 24, color: "#a78bfa" },
  { name: "Instagram", value: 17, color: "#60a5fa" },
  { name: "WhatsApp", value: 13, color: "#10b981" },
];

export const AI_INSIGHTS = [
  {
    id: "ai-1",
    tone: "opportunity" as const,
    title: "Relancez les paniers COD abandonnés",
    body: "312 commandes COD n'ont pas été confirmées sous 24 h. Une relance WhatsApp automatisée à J+1 récupère en moyenne 18 % de ce volume.",
    impact: "+ 142 000 DZD / mois",
  },
  {
    id: "ai-2",
    tone: "warning" as const,
    title: "Stock critique sur « Tapis Berbère 120×180 »",
    body: "Rupture estimée dans 3 jours au rythme actuel (ventes +64 % cette semaine).",
    impact: "Réapprovisionner",
  },
  {
    id: "ai-3",
    tone: "info" as const,
    title: "Meilleur créneau d'envoi publicitaire",
    body: "Vos conversions se concentrent entre 20 h et 23 h (UTC+1). Décalez le budget Meta de 3 h pour réduire le CPA de ~11 %.",
    impact: "CPA −11 %",
  },
];

export const ORDERS: Order[] = [
  { id: "o1", reference: "#HN-9841", customer: "Amina Belkacem", city: "Alger", items: 3, total: 12700, status: "cod_pending", channel: "landing", createdAt: "2026-10-19T09:12:00Z", courier: "Yalidine" },
  { id: "o2", reference: "#HN-9840", customer: "Yacine Haddad", city: "Oran", items: 1, total: 4200, status: "paid", channel: "store", createdAt: "2026-10-19T08:47:00Z" },
  { id: "o3", reference: "#HN-9839", customer: "Sarah Meziane", city: "Constantine", items: 2, total: 8900, status: "processing", channel: "instagram", createdAt: "2026-10-19T08:02:00Z", courier: "ZR Express" },
  { id: "o4", reference: "#HN-9838", customer: "Karim Bouzid", city: "Annaba", items: 5, total: 23400, status: "shipped", channel: "landing", createdAt: "2026-10-18T21:35:00Z", courier: "Yalidine" },
  { id: "o5", reference: "#HN-9837", customer: "Lina Cherif", city: "Blida", items: 1, total: 3500, status: "delivered", channel: "whatsapp", createdAt: "2026-10-18T19:14:00Z", courier: "Maystro" },
  { id: "o6", reference: "#HN-9836", customer: "Sofiane Amrani", city: "Tizi Ouzou", items: 2, total: 7600, status: "cancelled", channel: "store", createdAt: "2026-10-18T17:50:00Z" },
  { id: "o7", reference: "#HN-9835", customer: "Nesrine Ouali", city: "Sétif", items: 4, total: 18250, status: "delivered", channel: "landing", createdAt: "2026-10-18T15:22:00Z", courier: "Yalidine" },
  { id: "o8", reference: "#HN-9834", customer: "Mohamed Tahar", city: "Batna", items: 2, total: 6400, status: "cod_pending", channel: "instagram", createdAt: "2026-10-18T13:05:00Z", courier: "ZR Express" },
  { id: "o9", reference: "#HN-9833", customer: "Imane Sadki", city: "Oran", items: 6, total: 31900, status: "paid", channel: "store", createdAt: "2026-10-18T11:41:00Z" },
  { id: "o10", reference: "#HN-9832", customer: "Riad Kaci", city: "Béjaïa", items: 1, total: 2900, status: "delivered", channel: "whatsapp", createdAt: "2026-10-18T10:16:00Z", courier: "Maystro" },
];

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Tapis Berbère 120×180", sku: "TAP-120-BER", price: 7900, stock: 8, status: "active", image: "/static/products/tapis.svg", category: "Maison", sales30d: 412 },
  { id: "p2", name: "Lanterne en laiton", sku: "LAN-LAT-01", price: 3400, stock: 146, status: "active", image: "/static/products/lanterne.svg", category: "Décoration", sales30d: 288 },
  { id: "p3", name: "Coffret café arabica 250 g", sku: "CAF-ARB-250", price: 2200, stock: 320, status: "active", image: "/static/products/cafe.svg", category: "Épicerie", sales30d: 517 },
  { id: "p4", name: "Coussin tissé main", sku: "COU-TIS-45", price: 1850, stock: 0, status: "active", image: "/static/products/coussin.svg", category: "Maison", sales30d: 173 },
  { id: "p5", name: "Bracelet argent gravé", sku: "BRA-ARG-07", price: 4600, stock: 62, status: "draft", image: "/static/products/bracelet.svg", category: "Bijoux", sales30d: 0 },
  { id: "p6", name: "Set de thé verre doré", sku: "THE-VER-12", price: 5900, stock: 94, status: "active", image: "/static/products/the.svg", category: "Décoration", sales30d: 231 },
];

export const CUSTOMERS: Customer[] = [
  { id: "c1", name: "Amina Belkacem", email: "amina.b@mail.dz", phone: "+213 555 12 44 08", orders: 14, spent: 184300, segment: "vip", lastOrderAt: "2026-10-19T09:12:00Z" },
  { id: "c2", name: "Yacine Haddad", email: "y.haddad@mail.dz", phone: "+213 661 08 77 31", orders: 3, spent: 21400, segment: "regular", lastOrderAt: "2026-10-19T08:47:00Z" },
  { id: "c3", name: "Sarah Meziane", email: "s.meziane@mail.dz", phone: "+213 770 55 19 62", orders: 8, spent: 96700, segment: "vip", lastOrderAt: "2026-10-19T08:02:00Z" },
  { id: "c4", name: "Karim Bouzid", email: "karim.bouzid@mail.dz", phone: "+213 550 41 23 90", orders: 1, spent: 23400, segment: "new", lastOrderAt: "2026-10-18T21:35:00Z" },
  { id: "c5", name: "Lina Cherif", email: "lina.cherif@mail.dz", phone: "+213 698 77 02 14", orders: 6, spent: 58200, segment: "regular", lastOrderAt: "2026-10-18T19:14:00Z" },
  { id: "c6", name: "Sofiane Amrani", email: "s.amrani@mail.dz", phone: "+213 542 66 31 77", orders: 2, spent: 15100, segment: "at_risk", lastOrderAt: "2026-10-18T17:50:00Z" },
  { id: "c7", name: "Nesrine Ouali", email: "nesrine.o@mail.dz", phone: "+213 783 20 55 46", orders: 11, spent: 142600, segment: "vip", lastOrderAt: "2026-10-18T15:22:00Z" },
];

export const ACTIVITY = [
  { id: "a1", actor: "IA TIDJARATI", action: "a relancé 42 paniers COD abandonnés par WhatsApp", at: "2026-10-19T09:30:00Z", tone: "primary" as const },
  { id: "a2", actor: "Amina Belkacem", action: "a passé la commande #HN-9841 — 12 700 DZD", at: "2026-10-19T09:12:00Z", tone: "success" as const },
  { id: "a3", actor: "Système", action: "a synchronisé 18 commandes avec Yalidine", at: "2026-10-19T08:55:00Z", tone: "info" as const },
  { id: "a4", actor: "Sofiane", action: "a publié la page de captation « Automne 2026 »", at: "2026-10-18T20:40:00Z", tone: "primary" as const },
  { id: "a5", actor: "Système", action: "a signalé 3 tentatives de fraude bloquées par reCAPTCHA", at: "2026-10-18T18:05:00Z", tone: "warning" as const },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "12 nouvelles commandes COD à confirmer", body: "Les appels de confirmation dépassent 15 min d'attente.", at: "2026-10-19T09:20:00Z", type: "orders" as const, unread: true },
  { id: "n2", title: "Objectif mensuel atteint à 82 %", body: "Il reste 11 jours pour dépasser 5,8 M DZD.", at: "2026-10-19T07:00:00Z", type: "insight" as const, unread: true },
  { id: "n3", title: "Paiement échoué — abonnement Growth", body: "La carte se terminant par 4242 a été refusée.", at: "2026-10-18T22:12:00Z", type: "billing" as const, unread: true },
  { id: "n4", title: "Stock bas : Coussin tissé main", body: "0 unité disponible, 173 ventes sur 30 jours.", at: "2026-10-18T16:45:00Z", type: "stock" as const, unread: false },
  { id: "n5", title: "Sofiane a rejoint l'équipe", body: "Rôle attribué : Gestionnaire de commandes.", at: "2026-10-17T11:30:00Z", type: "team" as const, unread: false },
];

export const TEAM = [
  { id: "t1", name: "Noura Amrane", email: "noura@atelier-noura.dz", role: "owner" as Role, status: "active", lastActive: "2026-10-19T09:31:00Z" },
  { id: "t2", name: "Sofiane Kaci", email: "sofiane@atelier-noura.dz", role: "manager" as Role, status: "active", lastActive: "2026-10-18T20:41:00Z" },
  { id: "t3", name: "Yasmine Larbi", email: "yasmine@atelier-noura.dz", role: "staff" as Role, status: "active", lastActive: "2026-10-18T14:02:00Z" },
  { id: "t4", name: "Rémi Dubois", email: "remi@partner-agency.fr", role: "viewer" as Role, status: "invited", lastActive: "2026-10-16T09:00:00Z" },
];

export const PLANS: {
  id: PlanId;
  name: string;
  price: number;
  yearly: number;
  tagline: string;
  features: string[];
  limits: string[];
  featured?: boolean;
}[] = [
  {
    id: "free",
    name: "Découverte",
    price: 0,
    yearly: 0,
    tagline: "Pour valider votre première idée.",
    features: ["Boutique + pages de captation", "100 commandes / mois", "Pixels Meta & TikTok", "Support communauté"],
    limits: ["1 utilisateur", "Logo TIDJARATI affiché"],
  },
  {
    id: "starter",
    name: "Starter",
    price: 1490,
    yearly: 14304,
    tagline: "Pour structurer vos premières ventes.",
    features: ["1 000 commandes / mois", "3 pages de captation", "Confirmation SMS", "Analytics temps réel"],
    limits: ["2 utilisateurs"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 2990,
    yearly: 28704,
    tagline: "Pour scaler l'acquisition et les opérations.",
    features: [
      "10 000 commandes / mois",
      "Pages de captation illimitées",
      "IA : textes, SEO, relances",
      "Conversions API + 7 pixels",
      "Connexion transporteurs",
      "CRM & segments",
    ],
    limits: ["5 utilisateurs"],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: 5990,
    yearly: 57504,
    tagline: "Pour les marques multi-boutiques.",
    features: [
      "Commandes illimitées",
      "Multi-boutiques & multi-pays",
      "Rôles et permissions avancés",
      "API & webhooks",
      "SSO & journal d'audit",
      "Customer Success dédié",
    ],
    limits: ["Utilisateurs illimités"],
  },
];

export const FUNNEL = [
  { step: "Visiteurs", value: 71200, percent: 100 },
  { step: "Vues produit", value: 31400, percent: 44 },
  { step: "Paniers", value: 8900, percent: 12.5 },
  { step: "Commandes confirmées", value: 2780, percent: 3.9 },
];
