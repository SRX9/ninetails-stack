import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./supabaseServer";
import { createClient as CreateAdminClient } from "@supabase/supabase-js";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const getAPISession = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

const supabaseAdmin = CreateAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const adminAuthClient = supabaseAdmin.auth.admin;
