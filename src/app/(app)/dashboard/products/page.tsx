"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Package, TriangleAlert, Sparkles } from "lucide-react";

import { PRODUCTS } from "@/lib/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { Label, FieldHint } from "@/components/ui/input";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const rows = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Produits</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Catalogue, stocks et prix — synchronisés avec vos pages de captation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setAiOpen(true)}>
            <Sparkles className="h-4 w-4" aria-hidden />
            Générer une fiche avec l’IA
          </Button>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden />
            Ajouter un produit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Produits actifs", value: String(PRODUCTS.filter((p) => p.status === "active").length) },
          { label: "Ventes 30 jours", value: formatNumber(PRODUCTS.reduce((s, p) => s + p.sales30d, 0)) },
          {
            label: "Alertes de stock",
            value: String(PRODUCTS.filter((p) => p.stock < 20).length),
            alert: true,
          },
        ].map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-[13px] text-muted-foreground">{s.label}</p>
            <p
              className={`mt-2 font-display text-2xl font-semibold tabular-nums ${s.alert ? "text-warning" : ""}`}
            >
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une référence, une catégorie…"
            icon={<Search className="h-4 w-4" />}
            className="max-w-md"
            aria-label="Rechercher un produit"
          />
        </div>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Aucun produit trouvé"
              description="Essayez un autre terme de recherche ou ajoutez un nouveau produit à votre catalogue."
              className="border-none"
            />
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
              {rows.map((p) => (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-[image:linear-gradient(140deg,rgba(124,58,237,0.16),rgba(167,139,250,0.06))] text-primary">
                      <Package className="h-6 w-6" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-[14px] font-semibold">{p.name}</h3>
                        <Badge variant={p.status === "active" ? "success" : p.status === "draft" ? "neutral" : "danger"}>
                          {p.status === "active" ? "Actif" : p.status === "draft" ? "Brouillon" : "Archivé"}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-[12px] text-faint">
                        {p.sku} · {p.category}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="font-display text-lg font-semibold tabular-nums">
                        {formatCurrency(p.price)}
                      </p>
                      <p className="text-[12px] text-faint tabular-nums">{p.sales30d} ventes / 30 j</p>
                    </div>
                    <Badge variant={p.stock === 0 ? "danger" : p.stock < 20 ? "warning" : "neutral"}>
                      {p.stock === 0 ? (
                        <span className="inline-flex items-center gap-1">
                          <TriangleAlert className="h-3 w-3" /> Rupture
                        </span>
                      ) : (
                        `${p.stock} en stock`
                      )}
                    </Badge>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-[image:var(--gradient-brand)]"
                      style={{ width: `${Math.min(100, (p.stock / 350) * 100)}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Ajouter un produit"
        description="Le produit sera disponible immédiatement sur vos pages de captation."
        footer={
          <>
            <Button variant="ghost" onClick={() => setCreateOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setCreateOpen(false)}>Enregistrer le produit</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="p-name">Nom du produit</Label>
            <Input id="p-name" placeholder="ex. Tapis Berbère 120×180" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="p-price">Prix (DZD)</Label>
              <Input id="p-price" type="number" placeholder="7900" />
            </div>
            <div>
              <Label htmlFor="p-stock">Stock initial</Label>
              <Input id="p-stock" type="number" placeholder="100" />
            </div>
          </div>
          <div>
            <Label htmlFor="p-cat">Catégorie</Label>
            <Input id="p-cat" placeholder="Maison, Décoration, Bijoux…" />
            <FieldHint>Utilisée pour les filtres automatiques de vos pages.</FieldHint>
          </div>
        </div>
      </Modal>

      <Modal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        title="Fiche produit générée par l’IA"
        description="Titre, description et argumentaire SEO optimisés pour le marché nord-africain."
        footer={
          <>
            <Button variant="ghost" onClick={() => setAiOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => setAiOpen(false)}>Insérer dans la fiche</Button>
          </>
        }
      >
        <div className="space-y-3">
          {[
            { label: "Titre optimisé", value: "Tapis Berbère Authentique 120×180 — Laine Naturelle, Fait Main" },
            {
              label: "Description",
              value:
                "Tissé à la main dans les montagnes de Kabylie, ce tapis berbère en laine naturelle apporte chaleur et caractère à votre intérieur. Motifs géométriques traditionnels, teintures végétales, dimensions 120×180 cm. Livraison partout en Algérie, paiement à la livraison.",
            },
            { label: "Mots-clés SEO", value: "tapis berbère, tapis algérien, laine naturelle, décoration maison" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border border-border bg-muted/40 p-3.5">
              <p className="text-[11.5px] font-semibold tracking-wider text-faint uppercase">{f.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed">{f.value}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
