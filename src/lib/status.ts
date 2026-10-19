import {
  CircleDashed,
  Truck,
  PackageCheck,
  CircleCheckBig,
  CircleX,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { OrderStatus, Role } from "@/lib/mock/data";

type Meta = { label: string; tone: "neutral" | "primary" | "success" | "warning" | "danger" | "info"; icon: LucideIcon };

export const ORDER_STATUS: Record<OrderStatus, Meta> = {
  cod_pending: { label: "COD à confirmer", tone: "warning", icon: Smartphone },
  processing: { label: "En préparation", tone: "info", icon: CircleDashed },
  shipped: { label: "Expédiée", tone: "primary", icon: Truck },
  delivered: { label: "Livrée", tone: "success", icon: PackageCheck },
  paid: { label: "Payée", tone: "success", icon: CircleCheckBig },
  cancelled: { label: "Annulée", tone: "danger", icon: CircleX },
};

export const ROLE_LABEL: Record<Role, string> = {
  owner: "Propriétaire",
  admin: "Administrateur",
  manager: "Gestionnaire",
  staff: "Agent commandes",
  viewer: "Lecteur",
};

export const ROLE_SCOPE: Record<Role, string[]> = {
  owner: ["Accès total", "Facturation", "Équipe", "API"],
  admin: ["Accès total", "Équipe", "API"],
  manager: ["Commandes", "Produits", "Marketing", "Clients"],
  staff: ["Commandes", "Clients"],
  viewer: ["Lecture seule"],
};

export const CUSTOMER_SEGMENT: Record<string, { label: string; tone: Meta["tone"] }> = {
  vip: { label: "VIP", tone: "primary" },
  regular: { label: "Régulier", tone: "info" },
  new: { label: "Nouveau", tone: "success" },
  at_risk: { label: "À risque", tone: "warning" },
};

export const CHANNEL_LABEL: Record<string, string> = {
  landing: "Page de captation",
  store: "Boutique",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
};
