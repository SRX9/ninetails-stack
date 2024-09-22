import { timestamp, pgTable, text, serial } from "drizzle-orm/pg-core";

export const subscriptions = pgTable("subscriptions", {
  userId: text("user_id").notNull(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
    mode: "date",
  }),
  status: text("status"),
});

export type InsertSubscription = typeof subscriptions.$inferInsert;
export type SelectSubscription = typeof subscriptions.$inferSelect;

export const contact = pgTable("contact", {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  email: text("email"),
  userId: text("user_id"),
  reason: text("reason"),
  subject: text("subject"),
  message: text("message"),
});

export type InsertContact = typeof contact.$inferInsert;
export type SelectContact = typeof contact.$inferSelect;
