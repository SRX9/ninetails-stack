"use client";

import { Suspense, useEffect } from "react";
import Head from "next/head";
import { Tabs, Tab, Card, CardBody, Skeleton, Button } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { LucideLogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/use-user";
import { fontHeading } from "@/config/myFont";
import { greetMessage } from "@/lib/dateUtils";
import AccountSection from "./AccountSection";
import PremiumManage from "./PremiumManage";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { ThemeToggle } from "@/components/controls/theme-toggle";

export default function IndexPage() {
  const router = useRouter();
  const { isLoggedIn, user, authStatusLoading } = useUser();

  useEffect(() => {
    if (!isLoggedIn && !authStatusLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, authStatusLoading]);

  const name = user?.name;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Suspense>
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
            Profile
          </div>
        </Link>
        <section className="px-2 flex justify-start flex-col items-start gap-6 mt-20 py-8 md:py-10">
          <>
            <div className=" flex justify-center w-full  ">
              <h4
                className={cn(
                  fontHeading.className,
                  "text-xl md:text-2xl ",
                  " font-extrabold -tracking-tight",
                  " max-w-[350px] md:max-w-[550px] line line-clamp-2 text-center "
                )}
              >
                {greetMessage()}, {name}
              </h4>
            </div>
            {authStatusLoading ? (
              <div className=" flex justify-center w-full px-5 pt-5 pb-3 ">
                <div className=" max-w-[500px] w-full flex flex-col gap-8 justify-center items-center ">
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-full rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
              </div>
            ) : user?.id ? (
              <div className=" w-full flex justify-center ">
                <div className="flex w-full flex-col max-w-[800px] justify-center">
                  <Tabs aria-label="Options" className=" flex justify-center ">
                    <Tab key="Account" title="Account">
                      <Card>
                        <CardBody className="px-4 ">
                          <AccountSection />
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="Billing" title="Billing">
                      <Card>
                        <CardBody className="px-4 ">
                          <PremiumManage />
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full flex flex-col justify-center items-center ">
                  <div
                    className={cn(
                      " py-4 pb-8 max-w-[400px] text-center px-5 -tracking-tight  text-gray-600 dark:text-gray-400 "
                    )}
                  >
                    Log in to access your Profile, Account Settings and more..
                  </div>
                  <Button
                    type="button"
                    radius="full"
                    href="/login"
                    as={Link}
                    variant="flat"
                  >
                    <LucideLogIn className=" w-4 h-4  text-default-800 pointer-events-none flex-shrink-0" />
                    Login
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
