"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

import { PaymentMessage } from "@/lib/MessagesEnum";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import useUser from "@/hooks/use-user";
import { fontHeading } from "@/config/myFont";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { ThemeToggle } from "@/components/controls/theme-toggle";

export default function IndexPage() {
  const { user, authStatusLoading } = useUser();
  const router = useRouter();

  const searchParams = useSearchParams();
  const user_id_query = searchParams?.get("user_id");
  const payment_success = JSON.parse(searchParams?.get("success") || "false");
  const payment_plan = searchParams?.get("intent_plan");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const checkPaymentRecord = async () => {
    try {
      const paymentCheckResponse = await fetch(
        `/api/users/payment_check?id=${user?.id}&plan_id=${payment_plan}&email=${user?.email}`,
        {
          method: "GET",
        }
      );

      let paymentCheckResponseData = await paymentCheckResponse.json();
      if (paymentCheckResponseData.status) {
        setSuccess(true);
      } else {
        setError(PaymentMessage.FAILED_PROCESS);
      }
      setLoading(false);
    } catch (error) {
      setError(PaymentMessage.FAILED_PROCESS);
    }
  };

  const loopFetchPaymentTrack = () => {
    if (user?.id) {
      if (!user_id_query || !payment_plan || user_id_query !== user?.id) {
        router.push("/");
      } else {
        if (payment_success) {
          checkPaymentRecord();
        } else {
          setError(PaymentMessage.SUCCESS_FAILED_PROCESS);
          setLoading(false);
        }
      }
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    let intervalId: any;
    let count = 0;
    if (!authStatusLoading && user?.id) {
      const fetchData = () => {
        if (!success && !error && count < 30) {
          loopFetchPaymentTrack();
        } else {
          clearInterval(intervalId);
          setLoading(false);
        }
        count++;
      };
      intervalId = setInterval(fetchData, 1500);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [user?.id, success, error, authStatusLoading]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <section className="container mt-16 sm:mt-[20vh] grid items-center gap-6 pb-8 pt-6 md:py-10">
        <nav className="absolute right-2  hidden sm:flex  top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
          <ThemeToggle />
        </nav>
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            className={cn(
              fontHeading.className,
              "header-heading flex flex-col items-center justify-center gap-5  text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
            Payment Status
          </h1>
          <div className=" flex w-full max-w-[750px] flex-col items-center justify-center gap-3 rounded-md  p-10 text-lg text-muted-foreground">
            {success ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-16 w-16 text-green-500 "
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            ) : error ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-badge-alert h-16 w-16 text-red-500  "
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            ) : (
              !loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-16 w-16 text-orange-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                  />
                </svg>
              )
            )}
            {loading && !success && !error ? (
              <div className="mt-4 flex flex-col items-center justify-center gap-5">
                <Loader className="h-12 w-12 animate-spin " />
                <div className="pt-6 text-center text-sm sm:text-base">
                  Thanks for subscribing to Premium Plan! Please wait a few
                  seconds while we confirm your purchase and check your
                  subscription status.
                </div>
              </div>
            ) : success ? (
              <>
                <div className="pt-5 text-center text-sm sm:text-base">
                  Thanks for your purchase! Your Premium subscription is active.
                </div>
                <Link href="/" passHref className="pt-3">
                  <Button radius="full" size="md" variant="flat">
                    Start Using Premium
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="pt-5 text-center text-sm sm:text-base">
                  {error}{" "}
                  {error === PaymentMessage.SUCCESS_FAILED_PROCESS && (
                    <Link
                      href="/pricing"
                      passHref
                      className="font-semibold text-blue-500  "
                    >
                      Pricing Page
                    </Link>
                  )}
                </div>
                <div className="pt-5 text-center text-sm sm:text-base">
                  You can contact us, if you need further help via{" "}
                  <Link
                    href="/contact"
                    passHref
                    className="font-semibold text-blue-500  "
                  >
                    Contact Us
                  </Link>{" "}
                  Page.
                </div>
              </>
            )}
          </div>
        </div>
        <BottomFooter className="pt-5" />
      </section>
    </>
  );
}
