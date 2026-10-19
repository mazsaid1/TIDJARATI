"use client";

import { useState } from "react";
import { Store, Globe, Bell, Shield, Palette, Check } from "lucide-react";

import { STORE } from "@/lib/mock/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, FieldHint, Select } from "@/components/ui/input";
import { Switch, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  { name: "Yalidine", desc: "Livraison partout en Algérie — suivi automatique des colis.", status: "connected" },
  { name: "ZR Express", desc: "Expéditions express Alger / Oran / Constantine.", status: "connected" },
  { name: "Maystro Delivery", desc: "Livraison du dernier kilomètre + paiement à la livraison.", status: "connected" },
  { name: "WhatsApp Business", desc: "Confirmations et relances de commandes automatiques.", status: "available" },
  { name: "CIB / Edahabia", desc: "Paiement par carte bancaire algérienne via SATIM.", status: "available" },
  { name: "Google Analytics 4", desc: "Double suivi de conversion et audiences remarketing.", status: "available" },
];

export default function SettingsPage() {
  const [notif, setNotif] = useState({ orders: true, insights: true, stock: true, billing: true, marketing: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Paramètres</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Boutique, apparence, notifications et intégrations.
          </p>
        </div>
        <Button>Enregistrer les modifications</Button>
      </div>

      <Tabs defaultValue="store">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="store">Boutique</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="mt-5">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-4 w-4 text-primary" aria-hidden />
                Informations de la boutique
              </CardTitle>
              <CardDescription>Ces informations apparaissent sur vos pages de captation et factures.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="s-name">Nom de la boutique</Label>
                <Input id="s-name" defaultValue={STORE.name} />
              </div>
              <div>
                <Label htmlFor="s-domain">Domaine</Label>
                <Input id="s-domain" defaultValue={STORE.domain} icon={<Globe className="h-4 w-4" />} />
                <FieldHint>CNAME configuré · certificat SSL actif</FieldHint>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="s-country">Pays</Label>
                  <Select id="s-country" defaultValue="dz">
                    <option value="dz">Algérie</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="s-currency">Devise</Label>
                  <Select id="s-currency" defaultValue="DZD">
                    <option value="DZD">DZD — Dinar algérien</option>
                    <option value="EUR">EUR — Euro</option>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="s-lang">Langue par défaut</Label>
                <Select id="s-lang" defaultValue="fr">
                  <option value="fr">Français</option>
                  <option value="ar">العربية (Arabe)</option>
                  <option value="en">English</option>
                </Select>
                <FieldHint>Le support RTL est activé automatiquement pour l’arabe et la darija.</FieldHint>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-5">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" aria-hidden />
                Apparence
              </CardTitle>
              <CardDescription>Thème de l’interface et identité visuelle.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">Thème</p>
                  <p className="text-[13px] text-muted-foreground">
                    Sombre, clair ou selon votre système.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Badge variant="outline">Défaut : sombre</Badge>
                </div>
              </div>
              <div>
                <Label>Couleur d’accent</Label>
                <div className="flex flex-wrap gap-2.5">
                  {["#7c3aed", "#a78bfa", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c, i) => (
                    <button
                      key={c}
                      aria-label={`Couleur ${c}`}
                      className={cn(
                        "h-9 w-9 rounded-xl transition-transform hover:scale-110",
                        i === 0 && "ring-2 ring-ring ring-offset-2 ring-offset-background",
                      )}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <FieldHint>Palette TIDJARATI — violet primaire #7C3AED, secondaire #A78BFA.</FieldHint>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" aria-hidden />
                Préférences de notification
              </CardTitle>
              <CardDescription>Choisissez les événements qui déclenchent une alerte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Switch
                checked={notif.orders}
                onChange={(v) => setNotif((n) => ({ ...n, orders: v }))}
                label="Nouvelles commandes"
                description="Alerte immédiate à chaque commande confirmée."
              />
              <Switch
                checked={notif.insights}
                onChange={(v) => setNotif((n) => ({ ...n, insights: v }))}
                label="Recommandations IA"
                description="Une fois par jour, un résumé des opportunités détectées."
              />
              <Switch
                checked={notif.stock}
                onChange={(v) => setNotif((n) => ({ ...n, stock: v }))}
                label="Alertes de stock"
                description="Notification quand un produit passe sous le seuil."
              />
              <Switch
                checked={notif.billing}
                onChange={(v) => setNotif((n) => ({ ...n, billing: v }))}
                label="Facturation"
                description="Échecs de paiement, renouvellements et dépassements de quota."
              />
              <Switch
                checked={notif.marketing}
                onChange={(v) => setNotif((n) => ({ ...n, marketing: v }))}
                label="Marketing & nouveautés"
                description="Nouveaux templates, intégrations et conseils de croissance."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {INTEGRATIONS.map((i) => (
              <Card key={i.name} className="flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-primary-soft font-display text-sm font-bold text-primary">
                  {i.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold">{i.name}</p>
                    <Badge variant={i.status === "connected" ? "success" : "neutral"} dot>
                      {i.status === "connected" ? "Connecté" : "Disponible"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{i.desc}</p>
                  <Button
                    size="sm"
                    variant={i.status === "connected" ? "ghost" : "secondary"}
                    className="mt-3"
                  >
                    {i.status === "connected" ? "Configurer" : "Connecter"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-5">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" aria-hidden />
                Sécurité
              </CardTitle>
              <CardDescription>
                Authentification gérée par Clerk · sessions sécurisées · RBAC par rôle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">Double authentification (2FA)</p>
                  <p className="text-[13px] text-muted-foreground">Recommandée pour les comptes admin.</p>
                </div>
                <Badge variant="success">
                  <Check className="h-3 w-3" /> Active
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <p className="text-sm font-medium">reCAPTCHA v3</p>
                  <p className="text-[13px] text-muted-foreground">
                    Protection anti-fraude sur les formulaires COD — score minimal 0.5.
                  </p>
                </div>
                <Badge variant="success">
                  <Check className="h-3 w-3" /> Actif
                </Badge>
              </div>
              <div className="rounded-xl border border-dashed border-border-strong p-4">
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Journal d’audit disponible sur le plan <span className="font-semibold text-foreground">Scale</span> :
                  chaque connexion, export et modification de rôle est horodaté et exportable.
                </p>
                <Button variant="secondary" size="sm" className="mt-3">
                  Passer au plan Scale
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integrations import re-used */}
      <p className="sr-only">{INTEGRATIONS.length} intégrations disponibles</p>
      <p className="sr-only">{INTEGRATIONS.map((i) => i.name).join(", ")}</p>
    </div>
  );
}
