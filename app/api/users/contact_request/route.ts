import { auth } from "@/auth";
import { db } from "@/database/drizzleClient";
import { contact } from "@/database/schema";
import { APIMessage } from "@/lib/MessagesEnum";

export const POST = async (req: any) => {
  try {
    const session = await auth();

    if (!session || !session?.user?.id) {
      return new Response(APIMessage.LOGIN_tO_CONTINUE_USE);
    }

    const { email, reason, subject, message } = await req.json();

    if (!email || !reason || !subject || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    await db.insert(contact).values({
      email,
      reason,
      subject,
      message,
      userId: session?.user?.id || "Guest User",
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error handling contact submission:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to submit contact request",
      }),
      { status: 500 }
    );
  }
};
