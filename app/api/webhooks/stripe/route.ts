import { headers } from "next/headers";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { subscriptions, users } from "@/database/schema";
import { db } from "@/database/drizzleClient";
import { ESubscriptionStatus, PricingPlans } from "@/app/pricing/priceConfig";
import { stripe } from "@/lib/stripeClient";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.user_id;
  const intentPlan = session.metadata?.intent_plan;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Check if the subscription entry already exists
    const existingSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId as string))
      .limit(1);

    if (existingSubscription.length === 0) {
      // Insert a new subscription entry if it doesn't exist
      await db.insert(subscriptions).values({
        userId: userId as string,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        status: ESubscriptionStatus.ACTIVE,
      });
    } else {
      // Update the existing subscription entry if it exists
      await db
        .update(subscriptions)
        .set({
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          status: ESubscriptionStatus.ACTIVE,
        })
        .where(eq(subscriptions.userId, userId as string));
    }

    // Update Active Plan for User
    await db
      .update(users)
      .set({
        active_plan: intentPlan,
      })
      .where(eq(users.id, userId as string));
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db
      .update(subscriptions)
      .set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

    // Update Active Plan for User
    await db
      .update(users)
      .set({
        active_plan: intentPlan,
      })
      .where(eq(users.id, userId as string));
  }

  if (event.type === "customer.subscription.updated") {
    const subscriptionUpdated = event.data.object as Stripe.Subscription;
    await db
      .update(subscriptions)
      .set({
        stripeCurrentPeriodEnd: new Date(
          subscriptionUpdated.current_period_end * 1000
        ),
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionUpdated.id));
  }
  if (event.type === "customer.subscription.deleted") {
    const subscriptionDeleted = event.data.object as Stripe.Subscription;

    const subscriptionUpdate = await db
      .update(subscriptions)
      .set({
        status: ESubscriptionStatus.CANCELED,
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionDeleted.id))
      .returning({ userId: subscriptions.userId });

    // Update Active Plan for User back to Hobby (Update logic if you want to end premium access of user at the end of the month instead of immediately)
    const userId = subscriptionUpdate[0]?.userId;

    if (userId) {
      await db
        .update(users)
        .set({
          active_plan: PricingPlans.HOBBY,
        })
        .where(eq(users.id, userId));
    } else {
      console.error("User ID not found for the subscription being deleted.");
    }
  }

  return new Response(null, { status: 200 });
}
