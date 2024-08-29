"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useUser from "@/hooks/use-user";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import { ThemeToggle } from "@/components/controls/theme-toggle";
import { fontHeading } from "@/config/myFont";
import { site_metadata } from "@/config/site_metadata";
import { UserAuthForm } from "./UserAuthForm";
import { MenuMain } from "@/components/ui/MenuMain";

export default function IndexPage({ searchParams }: any) {
  const router = useRouter();
  const { isLoggedIn, authStatusLoading } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn && !authStatusLoading) {
      router.push("/");
    }
  }, [isLoggedIn, authStatusLoading]);

  return (
    <>
      <section>
        <div className=" relative flex h-[100dvh] w-full items-center justify-center px-0 ">
          <nav className="absolute right-2 top-3 flex items-center gap-2 md:gap-3 md:right-4 md:top-4">
            <ThemeToggle />
            <MenuMain />
          </nav>
          <Link
            href="/"
            passHref
            className="absolute left-5 top-5 md:left-6 md:top-6 "
          >
            <div
              className={cn(
                fontHeading.className,
                "relative z-20 flex -tracking-tighter items-center text-2xl md:text-3xl font-medium"
              )}
            >
              Login
            </div>
          </Link>
          <div className="w-full  px-5  lg:p-8  md:mt-0 ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="w-full justify-center flex items-center ">
                <Image
                  src={site_metadata.logo}
                  width={70}
                  height={70}
                  className={`rounded-full`}
                  alt={`${site_metadata.name} Logo"`}
                />
              </div>
              <div className="flex flex-col space-y-2 text-center ">
                <h1
                  className={cn(
                    fontHeading.className,
                    "relative z-20  -tracking-tighter  text-xl md:text-2xl font-medium"
                  )}
                >
                  {site_metadata.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select any Option to Login
                </p>
              </div>

              {authStatusLoading ? (
                <div className="p-5 w-full justify-center flex ">
                  <Spinner color="default" size="lg" labelColor="foreground" />
                </div>
              ) : (
                <UserAuthForm
                  redirectTo={searchParams?.to}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
              <p className="px-8 text-center text-sm text-gray-500 dark:text-gray-400  pb-[10vh] ">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className=" hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
