"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Snippet } from "@nextui-org/react";
import { fontHeading } from "@/config/myFont";
import { ThemeToggle } from "@/components/controls/theme-toggle";
import { Icons } from "@/components/icons/icons";
import { BottomFooter } from "@/components/ui/BottomFooter";

export default function Page() {
  return (
    <motion.article
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <nav className="absolute hidden md:flex right-2 top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
        <ThemeToggle />
      </nav>
      <section className=" mt-5 sm:mt-10 px-6 max-w-3xl mx-auto prose dark:prose-invert ">
        <div
          className={cn(
            fontHeading.className,
            "relative z-20  -tracking-tighter text-3xl md:text-5xl max-w-[70vw] break-words font-medium"
          )}
        >
          Ninetails Documentation
        </div>
        <div className=" text-default-500 pt-2 text-base font-medium ">
          Ninetails SaaS Starter Kit for AI, IndieHacking or Startups MVP.
        </div>
        <blockquote className="mt-6 border-l-2 pl-6 italic">
          5 Steps to Earning your first Dollars on the Internet
        </blockquote>
        <div
          className={cn(
            fontHeading.className,
            "relative z-20 mt-10 sm:mt-14 -tracking-tighter text-2xl font-medium"
          )}
        >
          Get Started
        </div>
        <div className=" text-default-500  text-base font-medium ">
          Few things to help you get started that can help and know what you are
          dealing with.
        </div>
        <div className="pt-3">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Project uses Next.js 14 (App Router), Tailwind CSS, Neon
            PostgresSQL, Drizzle ORM, Stripe, Vercel AI SDK, Auth.js, Resend
            Emails, PostHog Analytics, Shadcn UI, Acerternity UI, Magic UI and
            more.
          </p>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {'"'}No Unit Testing before Reaching 100k Monthly active users or
            10k Paid Users{'"'}
          </blockquote>
          <h3 className="mt-16 scroll-m-20 text-2xl font-semibold tracking-tight">
            1. Setup Codebase
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6  ">
            Clone the Ninetails GitHub Repository from here{" "}
            <a href="https://github.com/SRX9/ninetails-stack" target="_blank">
              Ninetails GitHub.
            </a>
          </p>
          <p>Run Following Commands to install all required packagers.</p>
          <Snippet className="w-full h-14 text-lg  ">npm i</Snippet>
          <h3 className="mt-16 scroll-m-20 text-2xl font-semibold tracking-tight">
            2. Configure Environment Variables
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Go to <kbd>env.local</kbd> and fill in all the mentioned environment
            variables. To Just get started, Below are the few platforms you will
            need to create account on to get some of the Variables values.
          </p>
          <ul className="my-6 md:ml-6  list-disc [&>li]:mt-2">
            <li>
              <a
                href="https://neon.tech?ref=ninetails-stack.dev"
                target="_blank"
              >
                Neon DB
              </a>
              : PostgreSQL Database
            </li>
            <li>
              <a
                href="https://stripe.com?ref=ninetails-stack.dev"
                target="_blank"
              >
                Stripe
              </a>
              : Payments Gateway
            </li>
            <li>
              Keys for Google Auth, GitHub Auth and any you want for your Auth.
            </li>
            <li>(If required) Resend: Email Delivery</li>{" "}
            <li>PostHog: Website Analytics</li>
          </ul>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            3. Setup Tables in Database
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We are using Drizzle ORM to work with database. Go to{" "}
            <kbd>database/schema.ts</kbd> file to find all the tables schema we
            are using. You can add tables schema as you like. Make sure to not
            delete existing property of tables like users, accounts, sessions,
            verification_token as they are required for our Auth.js library.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Now go to terminal and run following commands.
          </p>
          <Snippet className="w-full  h-14 text-lg  ">
            npx drizzle-kit generate
          </Snippet>
          <Snippet className="w-full mt-5 h-14 text-lg  ">
            npx drizzle-kit migrate
          </Snippet>
          <h3 className="mt-14 scroll-m-20 text-2xl font-semibold tracking-tight">
            4. Create Subscription Product on Stripe
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            We are using Stripe for Payments collections of our paid plans. Go
            to Stripe, Set it up (if you don{"'"}t know there are few simple
            video tutorials on youtube you can find).
          </p>{" "}
          <ul className="my-6  md:ml-6  list-disc [&>li]:mt-2">
            <li>
              {" "}
              Create a Recurring Product, Get its Price ID and past it in .env
              file as mentioned before
            </li>{" "}
            <li>Go to Developers {"->"} Webhooks in stripe</li>
            <li>
              Setup Stripe WebHook with these events selected:{" "}
              <ul className="my-6  md:ml-6   list-disc [&>li]:mt-2">
                <li>checkout.session.completed</li>
                <li>invoice.payment_succeeded</li>
                <li>customer.subscription.updated</li>
                <li>customer.subscription.deleted</li>
              </ul>
            </li>
            <li>
              Set Webhook Endpoint URL as
              <Snippet className="w-full mt-5 h-14 text-lg  ">
                https://your-website-domain.com/api/webhooks/stripe
              </Snippet>
            </li>
          </ul>
          <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
          <h3 className="mt-14 scroll-m-20 text-2xl font-semibold tracking-tight">
            5. Deployment
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Deployment is very easy for Next.js App. Most commonly and easy to
            use platform you can use is{" "}
            <a
              href="https://vercel.com?ref=ninetails-stack.dev"
              target="_blank"
            >
              Vercel
            </a>
          </p>
          <h3 className="mt-16 scroll-m-20 text-2xl font-semibold tracking-tight">
            6. Have a Question?
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            If you have any questions you can reach out to below mentioned
            Handles.
          </p>
          <ul className="my-6  md:ml-6  list-disc [&>li]:mt-2">
            <li>
              <a
                href="https://twitter.com/s_r_x_9"
                target="_blank"
                className="flex justify-start items-center gap-2 "
              >
                <Icons.twitter className="size-4" /> SRX9 Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/SRX9"
                target="_blank"
                className="flex justify-start items-center gap-2 "
              >
                <Icons.gitHub className="size-4" /> GitHub Profile
              </a>
            </li>
          </ul>
          <h3 className="mt-16 scroll-m-20 text-2xl font-semibold tracking-tight">
            7. Want to show Support?
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            If this starter template helped you and you want to show some
            support. Here are few ways.
          </p>
          <ul className="my-6  md:ml-6  list-disc [&>li]:mt-2">
            <li>
              <a
                href="https://github.com/SRX9/ninetails-stack"
                target="_blank"
                className="flex justify-start items-center gap-2 "
              >
                Star <Icons.sun className="size-4" /> on GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/s_r_x_9"
                target="_blank"
                className="flex justify-start items-center gap-2 "
              >
                Follow on <Icons.twitter className="size-4" /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/SRX9"
                target="_blank"
                className="flex justify-start items-center gap-2 "
              >
                Follow on <Icons.gitHub className="size-4" /> GitHub
              </a>
            </li>
            <li>
              <div className="flex items-center gap-2 justify-start">
                <iframe
                  src="https://github.com/sponsors/SRX9/button"
                  title="Sponsor SRX9"
                  height="32"
                  width="114"
                  style={{ border: 0, borderRadius: "6px" }}
                ></iframe>{" "}
                Sponsor on Github
              </div>
            </li>
          </ul>
        </div>
      </section>
      <BottomFooter className="mb-40 mt-20" />
    </motion.article>
  );
}
