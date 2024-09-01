import { ESubscriptionStatus } from "@/app/(paid-plans)/pricing/priceConfig";
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
    if (!user_id_query || session?.user?.id !== user_id_query) {
      throw new Error("No 'id' query parameter found");
    }

    const documentSubscriptionResponse = await db
      .select({
        stripeCurrentPeriodEnd: subscriptions.stripeCurrentPeriodEnd,
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

    return new Response(
      JSON.stringify({
        subscription_end: documentSubscription?.stripeCurrentPeriodEnd,
      })
    );
  } catch (err) {
    console.log(err, "Asds");
    return new Response(JSON.stringify({ subscription_end: null }));
  }
};
