"use client";

import { Suspense, useEffect, useMemo } from "react";
import Head from "next/head";
import { Button } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import { fontHeading } from "@/config/myFont";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { PricingPlans } from "@/app/(paid-plans)/pricing/priceConfig";
import { Icons } from "@/components/icons/icons";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import NinetailsChat from "./PremiumChat";
import { ThemeToggle } from "@/components/controls/theme-toggle";

export default function IndexPage() {
  const router = useRouter();
  const { isLoggedIn, user, active_plan, authStatusLoading } = useUser();

  const { isPlanActive } = useMemo(() => {
    return {
      isPlanActive: active_plan === PricingPlans.PRO,
      activePlan: active_plan,
    };
  }, [active_plan]);

  useEffect(() => {
    if (!authStatusLoading) {
      if (!isLoggedIn) {
        router.push("/login");
      } else if (!isPlanActive) {
        router.push("/pricing");
      }
    }
  }, [isLoggedIn, authStatusLoading, isPlanActive]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Suspense>
        <nav className="absolute right-2  hidden sm:flex  top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
          <ThemeToggle />
        </nav>
        <div className="absolute left-5 top-5 md:left-6 md:top-6 ">
          <div
            className={cn(
              fontHeading.className,
              "relative z-20 flex -tracking-tighter items-center text-2xl md:text-3xl font-medium"
            )}
          >
            Notes Taker
          </div>
        </div>
        <section className="px-2 flex justify-start flex-col items-start gap-6 mt-20 py-8 md:py-10">
          <>
            {authStatusLoading ? (
              <div className=" flex justify-center w-full px-5 pt-5 pb-3 ">
                <SkeletonLoader />
              </div>
            ) : isPlanActive ? (
              <>
                <div
                  className={cn(
                    fontHeading.className,
                    " -tracking-tighter text-2xl m-auto flex justify-center  w-[fit-content] "
                  )}
                >
                  Ninetails Premium Chat
                </div>
                <div className=" m-auto flex justify-center  w-[fit-content] ">
                  <NinetailsChat />
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex flex-col justify-center items-center ">
                  <div
                    className={cn(
                      " py-4 pb-8 max-w-[400px] text-center px-5 -tracking-tight  text-gray-600 dark:text-gray-400 "
                    )}
                  >
                    Please Upgrade to Pro Plan to use Ninetails Notes Taker.
                  </div>
                  <Button
                    type="button"
                    radius="full"
                    href="/pricing"
                    as={Link}
                    variant="flat"
                  >
                    <Icons.Cash className=" w-4 h-4  text-default-800 pointer-events-none flex-shrink-0" />
                    Explore Pricing Plans
                  </Button>
                </div>
              </>
            )}
          </>
          <BottomFooter className="mb-20 mt-10" noLines />
        </section>
      </Suspense>
    </>
  );
}
