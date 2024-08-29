"use client";

import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";

export default function useUser() {
  const { data: session, status } = useSession();

  const logOut = async (redirectTo = "/") => {
    try {
      toast.message("Logging Out...");
      await signOut();
    } catch (error) {
      toast.error("Error Logging Out");
    } finally {
      setTimeout(() => {
        location.href = redirectTo ? redirectTo : "/";
      }, 2000);
    }
  };

  return {
    user: session?.user,
    isLoggedIn: status === "authenticated",
    authStatusLoading: status === "loading",
    logOut,
  };
}
