"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { PricingPlans } from "@/app/(paid-plans)/pricing/priceConfig";
import { createClient } from "@/lib/supabaseClient";

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const logOut = async (redirectTo = "/") => {
    try {
      toast.message("Logging Out...");
      await supabase.auth.signOut();
    } catch (error) {
      toast.error("Error Logging Out");
    } finally {
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 2000);
    }
  };

  return {
    user,
    active_plan: user?.user_metadata?.active_plan || PricingPlans.HOBBY,
    email: user?.identities?.[0]?.identity_data?.email,
    avatar: user?.user_metadata?.avatar_url || "/02.png",
    name: user?.identities?.[0]?.identity_data?.name,
    isLoggedIn: !!user,
    authStatusLoading: loading,
    logOut,
  };
}
