"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ThemeToggle } from "@/components/controls/theme-toggle";
import { fontHeading } from "@/config/myFont";
import { site_metadata } from "@/config/site_metadata";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { PricingPlansDetails } from "./priceConfig";
import { PricingCard } from "./PricingCard";
import { loadStripe } from "@stripe/stripe-js";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function IndexPage() {
  return (
    <>
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
          Pricing
        </div>
      </div>
      <section className="mt-28 sm:mt-20">
        <div className=" relative flex  w-full items-center justify-center px-0 ">
          <div className="w-full  px-5  lg:p-8  md:mt-0 ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
              <div className="w-full justify-center flex items-center ">
                <Image
                  src={site_metadata.logo}
                  width={70}
                  height={70}
                  className={`rounded-full`}
                  alt={`${site_metadata.name} Logo"`}
                />
              </div>
              <div className="flex flex-col  pb-3 space-y-2 text-center ">
                <h1
                  className={cn(
                    fontHeading.className,
                    "relative z-20  -tracking-tighter  text-2xl md:text-4xl font-medium"
                  )}
                >
                  Premium Plans
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select any plan that suits your need.
                </p>
              </div>

              <div className="w-full flex justify-center">
                <div className=" gap-5 h-full  w-full max-w-7xl flex flex-col items-start justify-center lg:grid  lg:grid-cols-3 ">
                  {Object.values(PricingPlansDetails).map((plan) => (
                    <PricingCard pricingDetails={plan} key={plan.name} />
                  ))}
                </div>
              </div>

              <BottomFooter className="my-20 " noLines />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
