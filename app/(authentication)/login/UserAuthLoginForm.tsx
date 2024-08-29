"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";

import { TechnicalErrorMessages } from "@/lib/MessagesEnum";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { Icons, LockIcon, MailIcon } from "@/components/icons/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  redirectTo: any;
}

export function UserAuthLoginForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [passError, setPassError] = useState<any>("");

  const [googlLoading, setGooglLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError("");
    setPassError("");
    try {
      event.preventDefault();
      if (!email) {
        setError("Email is required.");
        return;
      }

      if (!password) {
        setPassError("Password is required.");
        return;
      }

      if (password?.length < 8) {
        setPassError("Password should be atleast 8 characters long.");
        return;
      }

      if (true) {
        location.href = redirectTo ? redirectTo : "/";
      } else if (error?.message?.includes("Invalid login credentials")) {
        setPassError("Invalid Email or Password.");
      } else {
        setPassError(TechnicalErrorMessages.GENERAL_ERROR);
      }

      setIsLoading(false);
    } catch (error) {
      if (error?.toString()?.includes("Invalid credentials.")) {
        setPassError("Invalid Email or Password.");
      } else if (error?.toString()?.includes("current user has been blocked")) {
        setPassError(
          <div className="text-xs leading-7 ">
            This Account is Disabled.
            <div className="text-muted-foreground">
              Please go to{" "}
              <Link href="/contact">
                <span className="text-blue-500">Contact Page</span>
              </Link>
              , and send an Account recover request.
            </div>
          </div>
        );
      } else {
        setPassError(TechnicalErrorMessages.GENERAL_ERROR);
      }
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      });
    }
  };

  const signWithGoogle = async () => {
    setGooglLoading(true);
    try {
      if (true) {
        location.href = "data?.url";
      } else {
        throw "No URL";
      }
    } catch (error) {
      toast(TechnicalErrorMessages.GENERAL_ERROR);
    } finally {
      setTimeout(() => {
        setGooglLoading(false);
      }, 5000);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
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
              autoCapitalize="none"
              variant="flat"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="grid gap-1 py-1 pl-1 text-xs font-semibold text-red-600">
            {error}
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
                setPassError("");
              }}
              required
              maxLength={150}
              variant="flat"
              minLength={8}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {passError && (
            <div className="mt-[-3px] pb-2 pl-1 text-xs font-semibold text-red-600">
              {passError}
            </div>
          )}
          {/* <ForgotPassword /> */}

          <Button
            className={
              "  bg-gradient-to-r from-gray-950 to-gray-700 dark:from-gray-50  dark:to-gray-100 text-gray-50 dark:bg-gray-50 dark:text-gray-950 font-medium "
            }
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className="h-5 w-5 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-gray-500 dark:text-gray-400 -tracking-tighter ">
            Or login with
          </span>
        </div>
      </div>
      <Button
        type="button"
        onClick={() => signWithGoogle()}
        disabled={googlLoading}
        variant="flat"
      >
        {googlLoading ? (
          <Icons.spinner className=" h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className=" h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
