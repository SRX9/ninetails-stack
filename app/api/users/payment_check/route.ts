import { ESubscriptionStatus } from "@/app/pricing/priceConfig";
import { auth } from "@/auth";
import { db } from "@/database/drizzleClient";
import { subscriptions } from "@/database/schema";
import { APIMessage } from "@/lib/MessagesEnum";
import { eq, and } from "drizzle-orm";

export const GET = async (req: any) => {
  try {
    const session = await auth();

    if (!session || !session?.user?.id) {
      return new Response(APIMessage.LOGIN_tO_CONTINUE_USE);
    }

    const { searchParams } = new URL(req.url);
    const user_id_query = searchParams.get("id");
    const intent_plan = searchParams.get("plan_id");
    const email_query = searchParams.get("email");

    if (
      !user_id_query ||
      !intent_plan ||
      !email_query ||
      session?.user?.id !== user_id_query ||
      session?.user?.email !== email_query
    ) {
      throw new Error("No 'id' query parameter found");
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
          eq(subscriptions.userId, user_id_query as string),
          eq(subscriptions.status, ESubscriptionStatus.ACTIVE)
        )
      )
      .limit(1);

    let documentSubscription = documentSubscriptionResponse?.[0];

    if (
      documentSubscription?.userId === session?.user?.id &&
      documentSubscription?.userId === user_id_query
    ) {
      return new Response(JSON.stringify({ status: true }));
    } else {
      return new Response(JSON.stringify({ status: false }));
    }
  } catch (err) {
    return new Response(JSON.stringify({ status: false }));
  }
};
