"use client";

import * as React from "react";
import { useState } from "react";
import { TechnicalErrorMessages } from "@/lib/MessagesEnum";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { Icons } from "@/components/icons/icons";
import { createClient } from "@/lib/supabaseClient";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  redirectTo?: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type SocialSignInProviders = "google" | "github";

export function UserAuthForm({
  className,
  redirectTo = "/",
  isLoading,
  setIsLoading,
  ...props
}: UserAuthFormProps) {
  const [loader, setLoader] = useState<SocialSignInProviders | false>(false);
  const supabase = createClient();

  const handleSocialSignIn = async (provider: SocialSignInProviders) => {
    setLoader(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}${redirectTo}`,
        },
      });
      if (error) throw error;
    } catch (err) {
      toast.error(TechnicalErrorMessages.GENERAL_ERROR);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        type="button"
        onClick={() => handleSocialSignIn("google")}
        disabled={!!loader}
        variant="flat"
        isLoading={loader === "google"}
      >
        {loader !== "google" && <Icons.google className="h-4 w-4" />}
        Google
      </Button>
      <Button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        isLoading={loader === "github"}
        disabled={!!loader}
        variant="flat"
      >
        {loader !== "github" && <Icons.gitHub className="h-4 w-4" />}
        GitHub
      </Button>
    </div>
  );
}
