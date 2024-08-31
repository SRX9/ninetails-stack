"use client";

import * as React from "react";
import { useState } from "react";

import { TechnicalErrorMessages } from "@/lib/MessagesEnum";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { Icons } from "@/components/icons/icons";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  redirectTo?: any;
  isLoading: boolean;
  setIsLoading: any;
}

type SocialSignInTokens = "google" | "github";

export function UserAuthForm({
  className,
  redirectTo,
  isLoading,
  setIsLoading,
  ...props
}: UserAuthFormProps) {
  const [loader, setLoader] = useState<SocialSignInTokens | false>(false);

  const handleSocialSignIn = async (type: SocialSignInTokens) => {
    setLoader(type);
    try {
      await signIn(type);
    } catch (err) {
      toast.message(TechnicalErrorMessages.GENERAL_ERROR);
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
        {loader !== "google" && <Icons.google className=" h-4 w-4" />}
        Google
      </Button>
      <Button
        type="button"
        onClick={() => handleSocialSignIn("github")}
        isLoading={loader === "github"}
        disabled={!!loader}
        variant="flat"
      >
        {loader !== "github" && <Icons.gitHub className=" h-4 w-4" />}
        GitHub
      </Button>
    </div>
  );
}

/*




  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openVerifyEmail, setOpenEmailVerify] = useState<boolean>(false);

  
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", { email, password });
    } catch (err) {
      toast.message(TechnicalErrorMessages.GENERAL_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

      <form onSubmit={handleEmailSignIn}>
        <div className="grid gap-2">
          <div className="mt-3 grid gap-1">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              maxLength={150}
              autoFocus
              name="email"
              autoCapitalize="none"
              variant="flat"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            <div className="grid gap-1 py-1 pl-1 text-xs font-semibold text-red-600">
              {error}
            </div>
          </div>
          <div className="mb-3 grid gap-1">
            <Input
              type="password"
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
              maxLength={150}
              name="password"
              variant="flat"
              minLength={8}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button
            className={
              "  bg-gradient-to-r from-gray-950 to-gray-700 dark:from-gray-50  dark:to-gray-100 text-gray-50 dark:bg-gray-50 dark:text-gray-950 font-medium "
            }
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className="h-5 w-5 animate-spin" />}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-gray-500 dark:text-gray-400 -tracking-tighter ">
            Or continue with
          </span>
        </div>
      </div>
*/
