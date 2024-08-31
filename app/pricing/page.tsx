"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useUser from "@/hooks/use-user";
import Image from "next/image";
import { ThemeToggle } from "@/components/controls/theme-toggle";
import { fontHeading } from "@/config/myFont";
import { site_metadata } from "@/config/site_metadata";
import { MenuMain } from "@/components/ui/MenuMain";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { IPricingPlanDetails, PricingPlansDetails } from "./priceConfig";
import { PricingCard } from "./PricingCard";

export default function IndexPage() {
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
              Pricing
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
                  Premium Plans
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select any plan that suits your need.
                </p>
              </div>

              <div>
                {Object.values(PricingPlansDetails).map(
                  (plan: IPricingPlanDetails) => (
                    <PricingCard pricingDetails={plan} key={`${plan.name}`} />
                  )
                )}
              </div>

              <BottomFooter className="my-20 " />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
