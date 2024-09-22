import { NextResponse } from "next/server";
import { db } from "@/database/drizzleClient";
import { contact } from "@/database/schema";
import { APIMessage } from "@/lib/MessagesEnum";
import { getAPISession } from "@/lib/supaUtils";

export const POST = async (req: Request) => {
  try {
    // Initialize Supabase client
    const session = await getAPISession();

    if (!session) {
      return NextResponse.json(
        { error: APIMessage.LOGIN_tO_CONTINUE_USE },
        { status: 401 }
      );
    }

    const { email, reason, subject, message } = await req.json();

    if (!email || !reason || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.insert(contact).values({
      email,
      reason,
      subject,
      message,
      userId: session.user.id || "Guest User",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error handling contact submission:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit contact request",
      },
      { status: 500 }
    );
  }
};
