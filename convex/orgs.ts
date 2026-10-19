import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { resolveOrgId, ensureOrg } from "./orders";

/** Org profile + plan. */
export const current = query({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return null;
    const org = await ctx.db.get(orgId);
    if (!org) return null;
    return {
      id: org._id,
      name: org.name,
      slug: org.slug,
      plan: org.plan,
      country: org.country,
      currency: org.currency,
      defaultLocale: org.defaultLocale,
      domain: org.domain,
      quotaOrdersMonthly: org.quotaOrdersMonthly,
      trialEndsAt: org.trialEndsAt,
    };
  },
});

export const bootstrap = mutation({
  args: { clerkOrgId: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, { clerkOrgId, name }) => {
    return ensureOrg(ctx, clerkOrgId, name ?? "Ma boutique");
  },
});

export const updatePlan = mutation({
  args: {
    clerkOrgId: v.string(),
    plan: v.union(v.literal("free"), v.literal("starter"), v.literal("growth"), v.literal("scale")),
  },
  handler: async (ctx, { clerkOrgId, plan }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) throw new Error("Organisation introuvable.");
    const quotas = { free: 100, starter: 1_000, growth: 10_000, scale: 1_000_000 };
    await ctx.db.patch(orgId, { plan, quotaOrdersMonthly: quotas[plan] });
    return { ok: true, plan };
  },
});

/* -------------------------------- Members --------------------------------- */

export const members = query({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return [];
    const rows = await ctx.db
      .query("members")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();
    return rows.map((m) => ({
      id: m._id,
      name: m.name,
      email: m.email,
      role: m.role,
      status: m.status,
      lastActiveAt: m.lastActiveAt,
    }));
  },
});

export const invite = mutation({
  args: { clerkOrgId: v.string(), email: v.string(), role: v.string(), invitedBy: v.string() },
  handler: async (ctx, { clerkOrgId, email, role, invitedBy }) => {
    let orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) orgId = await ensureOrg(ctx, clerkOrgId);

    const existing = await ctx.db
      .query("members")
      .withIndex("by_org_email", (q) => q.eq("orgId", orgId).eq("email", email))
      .first();
    if (existing) throw new Error("Ce membre fait déjà partie de l’équipe.");

    const VALID_ROLES = ["owner", "admin", "manager", "staff", "viewer"] as const;
    const safeRole = VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])
      ? (role as (typeof VALID_ROLES)[number])
      : "viewer";

    await ctx.db.insert("members", {
      orgId,
      clerkUserId: `pending:${email}`,
      email,
      name: email.split("@")[0],
      role: safeRole,
      status: "invited",
      invitedBy,
    });

    await ctx.db.insert("notifications", {
      orgId,
      type: "team",
      title: "Invitation envoyée",
      body: `${email} a été invité(e) en tant que ${safeRole}.`,
      createdAt: Date.now(),
    });

    return { ok: true };
  },
});

/* ------------------------------ Notifications ----------------------------- */

export const notifications = query({
  args: { clerkOrgId: v.string(), unreadOnly: v.optional(v.boolean()) },
  handler: async (ctx, { clerkOrgId, unreadOnly }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return [];
    const rows = await ctx.db
      .query("notifications")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .order("desc")
      .take(50);
    return rows
      .filter((n) => (unreadOnly ? !n.readAt : true))
      .map((n) => ({
        id: n._id,
        type: n.type,
        title: n.title,
        body: n.body,
        readAt: n.readAt,
        createdAt: n.createdAt,
      }));
  },
});

export const markRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, { notificationId }) => {
    await ctx.db.patch(notificationId, { readAt: Date.now() });
    return { ok: true };
  },
});

export const markAllRead = mutation({
  args: { clerkOrgId: v.string() },
  handler: async (ctx, { clerkOrgId }) => {
    const orgId = await resolveOrgId(ctx, clerkOrgId);
    if (!orgId) return { ok: false };
    const rows = await ctx.db
      .query("notifications")
      .withIndex("by_org", (q) => q.eq("orgId", orgId))
      .collect();
    for (const n of rows) {
      if (!n.readAt) await ctx.db.patch(n._id, { readAt: Date.now() });
    }
    return { ok: true, updated: rows.length };
  },
});
