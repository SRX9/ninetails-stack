import { NextResponse } from "next/server";
import { ESubscriptionStatus } from "@/app/(paid-plans)/pricing/priceConfig";
import { db } from "@/database/drizzleClient";
import { subscriptions } from "@/database/schema";
import { APIMessage } from "@/lib/MessagesEnum";
import { eq, and } from "drizzle-orm";
import { getAPISession } from "@/lib/supaUtils";

export const GET = async (req: Request) => {
  try {
    const session = await getAPISession();

    if (!session) {
      return NextResponse.json(
        { error: APIMessage.LOGIN_tO_CONTINUE_USE },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const user_id_query = searchParams.get("id");
    const intent_plan = searchParams.get("plan_id");
    const email_query = searchParams.get("email");

    if (
      !user_id_query ||
      !intent_plan ||
      !email_query ||
      session.user.id !== user_id_query ||
      session.user.email !== email_query
    ) {
      throw new Error("Invalid query parameters");
    }

    const documentSubscriptionResponse = await db
      .select({
        stripeSubscriptionId: subscriptions.stripeSubscriptionId,
        userId: subscriptions.userId,
        stripeCurrentPeriodEnd: subscriptions.stripeCurrentPeriodEnd,
        stripePriceId: subscriptions.stripePriceId,
      })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, user_id_query),
          eq(subscriptions.status, ESubscriptionStatus.ACTIVE)
        )
      )
      .limit(1);

    let documentSubscription = documentSubscriptionResponse?.[0];

    if (
      documentSubscription?.userId === session.user.id &&
      documentSubscription?.userId === user_id_query
    ) {
      return NextResponse.json({ status: true });
    } else {
      return NextResponse.json({ status: false });
    }
  } catch (err) {
    return NextResponse.json({ status: false });
  }
};
