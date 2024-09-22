import { NextResponse } from "next/server";
import { APIMessage, IErrorMessages } from "@/lib/MessagesEnum";
import { AppHost } from "@/config/site_metadata";
import {
  getProductIdBasedOnPlan,
  PricingPlans,
} from "@/app/(paid-plans)/pricing/priceConfig";
import { stripe } from "@/lib/stripeClient";
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
    const user_query_id = searchParams.get("id");
    const intent_plan = searchParams.get("plan_id");
    const email_query = searchParams.get("email");

    if (
      !user_query_id ||
      !intent_plan ||
      !email_query ||
      session.user.id !== user_query_id ||
      session.user.email !== email_query
    ) {
      throw new Error("Invalid query parameters");
    }

    const sessionStripe = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: getProductIdBasedOnPlan(intent_plan as PricingPlans),
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user_query_id,
        intent_plan,
      },
      mode: "subscription",
      customer_email: email_query,
      success_url: `${AppHost}/payment-status?success=true&user_id=${user_query_id}&intent_plan=${intent_plan}`,
      cancel_url: `${AppHost}/payment-status?canceled=true&user_id=${user_query_id}&intent_plan=${intent_plan}`,
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (err) {
    return NextResponse.json(
      { error: IErrorMessages.TECHNICAL_ERROR },
      { status: 500 }
    );
  }
};
