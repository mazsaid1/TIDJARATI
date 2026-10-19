import { v } from "convex/values";
import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

/**
 * Shared tenancy helpers. In demo mode, Clerk userId is absent and we resolve
 * the single local org (created lazily by `ensureOrg`).
 */

const ORDER_SEQ = 9842; // déterministe pour la démo

export async function resolveOrgId(ctx: QueryCtx | MutationCtx, clerkOrgId: string) {
  const org = await ctx.db
    .query("orgs")
    .withIndex("by_clerk_org", (q) => q.eq("clerkOrgId", clerkOrgId))
    .first();
  return org?._id ?? null;
}

export async function ensureOrg(ctx: MutationCtx, clerkOrgId: string, name = "Ma boutique") {
  const existing = await ctx.db
    .query("orgs")
    .withIndex("by_clerk_org", (q) => q.eq("clerkOrgId", clerkOrgId))
    .first();
  if (existing) return existing._id;

  return ctx.db.insert("orgs", {
    clerkOrgId,
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    plan: "growth",
    country: "Algérie",
    currency: "DZD",
    defaultLocale: "fr",
    quotaOrdersMonthly: 10_000,
    createdAt: Date.now(),
  });
}

/* --------------------------------- Orders --------------------------------- */

export const list = query({
  args: {
    clerkOrgId: v.string(),
    status: v.optional(
      v.union(
        v.literal("cod_pending"),
        v.literal("processing"),
        v.literal("shipped"),
        v.literal("delivered"),
        v.literal("paid"),
        v.literal("cancelled"),
      ),
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { clerkOrgId, status, limit }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return [];

    let q = ctx.db
      .query("orders")
      .withIndex("by_org", (s) => s.eq("orgId", orgId))
      .order("desc");

    if (status) {
      q = ctx.db
        .query("orders")
        .withIndex("by_org_status", (s) => s.eq("orgId", orgId).eq("status", status))
        .order("desc");
    }

    return (await q.take(limit ?? 50)).map((o) => ({
      id: o._id,
      reference: o.reference,
      total: o.total,
      currency: o.currency,
      status: o.status,
      channel: o.channel,
      city: o.city,
      courier: o.courier,
      items: o.items.length,
      createdAt: o.createdAt,
    }));
  },
});

export const create = mutation({
  args: {
    clerkOrgId: v.string(),
    customerPhone: v.string(),
    customerName: v.string(),
    city: v.optional(v.string()),
    items: v.array(
      v.object({ productId: v.id("products"), quantity: v.number() }),
    ),
    channel: v.union(
      v.literal("landing"),
      v.literal("store"),
      v.literal("instagram"),
      v.literal("whatsapp"),
    ),
  },
  handler: async (ctx, args) => {
    const orgId = await resolveOrgId(ctx, args.clerkOrgId);
    if (!orgId) throw new Error("Organisation introuvable.");

    // Upsert customer by phone
    let customer = await ctx.db
      .query("customers")
      .withIndex("by_org_phone", (q) => q.eq("orgId", orgId).eq("phone", args.customerPhone))
      .first();

    if (!customer) {
      const customerId = await ctx.db.insert("customers", {
        orgId,
        name: args.customerName,
        phone: args.customerPhone,
        city: args.city,
        segment: "new",
        totalOrders: 0,
        totalSpent: 0,
      });
      customer = await ctx.db.get(customerId);
    }

    if (!customer) throw new Error("Client introuvable.");

    // Resolve items & decrement stock
    let total = 0;
    const lineItems: Array<{
      productId: Id<"products">;
      name: string;
      quantity: number;
      unitPrice: number;
    }> = [];
    for (const item of args.items) {
      const product = await ctx.db.get(item.productId);
      if (!product) throw new Error("Produit introuvable.");
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuffisant pour « ${product.name} ».`);
      }
      await ctx.db.patch(product._id, {
        stock: product.stock - item.quantity,
        sales30d: product.sales30d + item.quantity,
      });
      total += product.price * item.quantity;
      lineItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    const existing = await ctx.db
      .query("orders")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();

    const orderId = await ctx.db.insert("orders", {
      orgId,
      reference: `#HN-${ORDER_SEQ + existing.length}`,
      customerId: customer._id,
      items: lineItems,
      total,
      currency: "DZD",
      status: "cod_pending",
      channel: args.channel,
      city: args.city,
      confirmationAttempts: 0,
      createdAt: Date.now(),
    });

    await ctx.db.patch(customer._id, {
      totalOrders: customer.totalOrders + 1,
      totalSpent: customer.totalSpent + total,
      lastOrderAt: Date.now(),
      segment: customer.totalOrders + 1 >= 8 ? "vip" : "regular",
    });

    await ctx.db.insert("notifications", {
      orgId,
      type: "orders",
      title: "Nouvelle commande COD à confirmer",
      body: `${args.customerName} — ${total.toLocaleString("fr-FR")} DZD · ${args.city ?? "Algérie"}`,
      createdAt: Date.now(),
    });

    return { orderId, total };
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("cod_pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("paid"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, { orderId, status }) => {
    const order = await ctx.db.get(orderId);
    if (!order) throw new Error("Commande introuvable.");

    const patch: Record<string, number | string> = { status };
    if (status === "paid" || status === "delivered") patch.deliveredAt = Date.now();
    if (status !== "cod_pending") patch.confirmedAt = Date.now();

    await ctx.db.patch(orderId, patch);

    // Annulation → remettre le stock
    if (status === "cancelled") {
      for (const item of order.items) {
        const product = await ctx.db.get(item.productId);
        if (product) {
          await ctx.db.patch(product._id, {
            stock: product.stock + item.quantity,
            sales30d: Math.max(0, product.sales30d - item.quantity),
          });
        }
      }
    }

    return { ok: true };
  },
});

/* -------------------------------- Analytics ------------------------------- */

export const stats = query({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return null;

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();

    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((s, o) => s + o.total, 0);

    const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    }, {});

    const products = await ctx.db
      .query("products")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();

    const lowStock = products.filter((p) => p.stock <= p.lowStockThreshold);

    return {
      orders: orders.length,
      revenue,
      currency: "DZD",
      averageOrderValue: orders.length ? Math.round(revenue / orders.length) : 0,
      byStatus,
      products: products.length,
      lowStock: lowStock.map((p) => ({ id: p._id, name: p.name, stock: p.stock })),
    };
  },
});
