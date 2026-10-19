import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * TIDJARATI — Convex schema
 * Multi-tenant: every record carries an orgId (Clerk organization or user id).
 */
export default defineSchema({
  /* --------------------------------- Orgs --------------------------------- */
  orgs: defineTable({
    clerkOrgId: v.string(), // "org_..." or "user_..." in solo mode
    name: v.string(),
    slug: v.string(),
    plan: v.union(v.literal("free"), v.literal("starter"), v.literal("growth"), v.literal("scale")),
    country: v.string(),
    currency: v.union(v.literal("DZD"), v.literal("EUR")),
    defaultLocale: v.union(v.literal("fr"), v.literal("ar"), v.literal("en")),
    domain: v.optional(v.string()),
    quotaOrdersMonthly: v.number(),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    trialEndsAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_clerk_org", ["clerkOrgId"])
    .index("by_slug", ["slug"]),

  /* -------------------------------- Members -------------------------------- */
  members: defineTable({
    orgId: v.id("orgs"),
    clerkUserId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("manager"),
      v.literal("staff"),
      v.literal("viewer"),
    ),
    status: v.union(v.literal("active"), v.literal("invited"), v.literal("suspended")),
    invitedBy: v.optional(v.string()),
    lastActiveAt: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .index("by_user", ["clerkUserId"])
    .index("by_org_email", ["orgId", "email"]),

  /* -------------------------------- Products ------------------------------- */
  products: defineTable({
    orgId: v.id("orgs"),
    name: v.string(),
    slug: v.string(),
    sku: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    currency: v.string(),
    stock: v.number(),
    lowStockThreshold: v.number(),
    status: v.union(v.literal("active"), v.literal("draft"), v.literal("archived")),
    category: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    sales30d: v.number(),
    aiGenerated: v.optional(v.boolean()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_status", ["orgId", "status"])
    .index("by_org_sku", ["orgId", "sku"]),

  /* -------------------------------- Customers ------------------------------ */
  customers: defineTable({
    orgId: v.id("orgs"),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    segment: v.union(v.literal("vip"), v.literal("regular"), v.literal("new"), v.literal("at_risk")),
    totalOrders: v.number(),
    totalSpent: v.number(),
    notes: v.optional(v.string()),
    lastOrderAt: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_phone", ["orgId", "phone"])
    .index("by_org_segment", ["orgId", "segment"]),

  /* --------------------------------- Orders -------------------------------- */
  orders: defineTable({
    orgId: v.id("orgs"),
    reference: v.string(),
    customerId: v.id("customers"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
      }),
    ),
    total: v.number(),
    currency: v.string(),
    status: v.union(
      v.literal("cod_pending"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("paid"),
      v.literal("cancelled"),
    ),
    channel: v.union(
      v.literal("landing"),
      v.literal("store"),
      v.literal("instagram"),
      v.literal("whatsapp"),
    ),
    city: v.optional(v.string()),
    courier: v.optional(v.string()),
    trackingNumber: v.optional(v.string()),
    confirmationAttempts: v.number(),
    confirmedAt: v.optional(v.number()),
    deliveredAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_status", ["orgId", "status"])
    .index("by_org_customer", ["orgId", "customerId"])
    .index("by_reference", ["reference"]),

  /* --------------------------- Landing page views -------------------------- */
  events: defineTable({
    orgId: v.id("orgs"),
    type: v.union(
      v.literal("page_view"),
      v.literal("product_view"),
      v.literal("add_to_cart"),
      v.literal("checkout_start"),
      v.literal("order_created"),
      v.literal("lead_captured"),
    ),
    pageId: v.optional(v.string()),
    productId: v.optional(v.string()),
    visitorId: v.string(),
    channel: v.optional(v.string()),
    city: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_type", ["orgId", "type"])
    .index("by_org_created", ["orgId", "createdAt"]),

  /* ------------------------------- Campaigns ------------------------------- */
  campaigns: defineTable({
    orgId: v.id("orgs"),
    name: v.string(),
    channel: v.union(v.literal("meta"), v.literal("tiktok"), v.literal("whatsapp"), v.literal("google")),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("ended")),
    spend: v.number(),
    revenue: v.number(),
    impressions: v.number(),
    clicks: v.number(),
    startsAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_status", ["orgId", "status"]),

  /* --------------------------------- Pixels -------------------------------- */
  pixels: defineTable({
    orgId: v.id("orgs"),
    provider: v.union(v.literal("meta"), v.literal("tiktok"), v.literal("google"), v.literal("snapchat")),
    pixelId: v.string(),
    label: v.string(),
    conversionsApi: v.boolean(),
    events30d: v.number(),
    status: v.union(v.literal("connected"), v.literal("disconnected")),
  }).index("by_org", ["orgId"]),

  /* ------------------------------ AI artifacts ----------------------------- */
  aiArtifacts: defineTable({
    orgId: v.id("orgs"),
    kind: v.union(
      v.literal("product_copy"),
      v.literal("landing_copy"),
      v.literal("relance_message"),
      v.literal("seo_meta"),
      v.literal("insight"),
    ),
    prompt: v.string(),
    output: v.string(),
    model: v.string(),
    tokens: v.optional(v.number()),
  })
    .index("by_org", ["orgId"])
    .index("by_org_kind", ["orgId", "kind"]),

  /* ------------------------------ Notifications ---------------------------- */
  notifications: defineTable({
    orgId: v.id("orgs"),
    type: v.union(
      v.literal("orders"),
      v.literal("insight"),
      v.literal("billing"),
      v.literal("stock"),
      v.literal("team"),
    ),
    title: v.string(),
    body: v.string(),
    readAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_org_unread", ["orgId", "readAt"]),
});
