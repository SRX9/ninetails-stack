"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { fontHeading } from "@/config/myFont";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { ThemeToggle } from "@/components/controls/theme-toggle";

export default function Page() {
  return (
    <>
      <nav className="absolute hidden md:flex right-2 top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
        <ThemeToggle />
      </nav>
      <section className="container mt-10 flex items-center justify-center gap-6 pb-20 pt-20 ">
        <div className="flex flex-col items-center justify-center gap-2 text-default-600 ">
          <h1
            className={cn(
              fontHeading.className,
              "header-heading  text-center text-5xl leading-[1.1]",
              "text-transparent bg-clip-text bg-gradient-to-tr font-extrabold -tracking-tight",
              "  from-gray-500 to-slate-900  ",
              "dark:bg-gradient-to-br dark:from-gray-100 dark:to-slate-700"
            )}
          >
            Terms of Service
          </h1>
          <p className="max-w-[750px] text-center text-sm  text-default-500">
            By using our service, you agree to our Terms of Service
          </p>
          <div className="max-w-[800px] pt-10">
            <h2 className="mt-10 scroll-m-20 border-b border-default-200 pb-3 text-lg font-semibold tracking-tight transition-colors first:mt-0">
              Acceptance of Terms
            </h2>
            <p className="text-sm leading-7 [&:not(:first-child)]:mt-4">
              (Edit the Terms of Service as per your requirements....)
            </p>{" "}
          </div>
          <BottomFooter className="py-20" />
        </div>
      </section>
    </>
  );
}
