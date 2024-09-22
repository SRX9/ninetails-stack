import { NextResponse } from "next/server";
import { ESubscriptionStatus } from "@/app/(paid-plans)/pricing/priceConfig";
import { db } from "@/database/drizzleClient";
import { subscriptions } from "@/database/schema";
import { APIMessage } from "@/lib/MessagesEnum";
import { eq, and } from "drizzle-orm";
import { getAPISession } from "@/lib/supaUtils";

export async function GET(request: Request) {
  try {
    const session = await getAPISession();

    if (!session) {
      return NextResponse.json(
        { error: APIMessage.LOGIN_tO_CONTINUE_USE },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const user_id_query = searchParams.get("id");
    if (!user_id_query || session.user.id !== user_id_query) {
      throw new Error("Invalid user ID");
    }

    const documentSubscriptionResponse = await db
      .select({
        stripeCurrentPeriodEnd: subscriptions.stripeCurrentPeriodEnd,
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

    return NextResponse.json({
      subscription_end: documentSubscription?.stripeCurrentPeriodEnd,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ subscription_end: null });
  }
}
