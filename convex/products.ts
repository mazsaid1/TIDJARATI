import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { resolveOrgId, ensureOrg } from "./orders";

export const list = query({
  args: { clerkOrgId: v.string(), status: v.optional(v.string()) },
  handler: async (ctx, { clerkOrgId, status }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return [];

    const products = await ctx.db
      .query("products")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .order("desc")
      .collect();

    return products
      .filter((p) => (status ? p.status === status : true))
      .map((p) => ({
        id: p._id,
        name: p.name,
        sku: p.sku,
        price: p.price,
        currency: p.currency,
        stock: p.stock,
        lowStockThreshold: p.lowStockThreshold,
        status: p.status,
        category: p.category,
        sales30d: p.sales30d,
        createdAt: p._creationTime,
      }));
  },
});

export const create = mutation({
  args: {
    clerkOrgId: v.string(),
    name: v.string(),
    sku: v.string(),
    price: v.number(),
    stock: v.number(),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let orgId = await resolveOrgId(ctx, args.clerkOrgId);
    if (!orgId) orgId = await ensureOrg(ctx, args.clerkOrgId);

    const slug =
      args.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "produit";

    const existing = await ctx.db
      .query("products")
      .withIndex("by_org_sku", (q) => q.eq("orgId", orgId).eq("sku", args.sku))
      .first();
    if (existing) throw new Error(`La référence ${args.sku} existe déjà.`);

    return ctx.db.insert("products", {
      orgId,
      name: args.name,
      slug,
      sku: args.sku,
      description: args.description,
      price: args.price,
      currency: "DZD",
      stock: args.stock,
      lowStockThreshold: 10,
      status: "draft",
      category: args.category,
      sales30d: 0,
    });
  },
});

export const adjustStock = mutation({
  args: { productId: v.id("products"), delta: v.number() },
  handler: async (ctx, { productId, delta }) => {
    const product = await ctx.db.get(productId);
    if (!product) throw new Error("Produit introuvable.");
    const stock = Math.max(0, product.stock + delta);
    await ctx.db.patch(productId, { stock });

    // Alerte de stock bas
    if (stock <= product.lowStockThreshold && product.stock > product.lowStockThreshold) {
      await ctx.db.insert("notifications", {
        orgId: product.orgId,
        type: "stock",
        title: `Stock bas : ${product.name}`,
        body: `${stock} unité(s) disponible(s) — seuil défini à ${product.lowStockThreshold}.`,
        createdAt: Date.now(),
      });
    }
    return { stock };
  },
});

export const publish = mutation({
  args: { productId: v.id("products"), status: v.union(v.literal("active"), v.literal("draft"), v.literal("archived")) },
  handler: async (ctx, { productId, status }) => {
    await ctx.db.patch(productId, { status });
    return { ok: true };
  },
});
