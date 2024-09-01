"use client";

import { ThemeToggle } from "@/components/controls/theme-toggle";
import { Icons } from "@/components/icons/icons";
import { BottomFooter } from "@/components/ui/BottomFooter";
import { Cover } from "@/components/ui/cover";
import { FlipWords } from "@/components/ui/flip-words";
import { Separator } from "@/components/ui/separator";
import { stackList } from "@/config/constants";
import { fontHeading } from "@/config/myFont";
import { site_metadata } from "@/config/site_metadata";
import { cn } from "@/lib/utils";
import {
  Image,
  Card,
  CardBody,
  CardFooter,
  Button,
  Link,
} from "@nextui-org/react";
import NextImage from "next/image";

export default function Home() {
  return (
    <>
      <nav className="absolute right-2  hidden sm:flex  top-3  items-center gap-2 md:gap-3 md:right-4 md:top-4">
        <ThemeToggle />
      </nav>
      <div className="w-full max-w-8xl flex justify-start items-center gap-4 flex-col pt-20 sm:pt-28 px-10 ">
        <Image
          src={site_metadata.megaLogo}
          width={500}
          height={500}
          className={`rounded-full size-64 object-cover `}
          alt={`${site_metadata.name} Logo"`}
        />
        <h2
          className={cn(
            fontHeading.className,
            "text-4xl md:text-4xl lg:text-6xl leading-loose font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
          )}
        >
          Build. Ship. Earn.
        </h2>
        <h1
          className={cn(
            fontHeading.className,
            "text-4xl md:text-2xl lg:text-4xl leading-loose font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white -mt-14 md:mt-0 "
          )}
        >
          with Ninetails SaaS Stack
          <br /> at <Cover>Light Speed</Cover>
        </h1>
        <div className=" text-default-500 pt-5 text-lg font-medium max-w-3xl text-center">
          <b className=" text-default-700 ">
            Earn your first Dollars on the Internet
          </b>{" "}
          with NineTails Stack Template, An Open-Source easy-to-use SaaS starter
          kit designed for indie hackers, startups, and MVPs to quickly get
          starter, build & launch ideas and earn their first dollar online.
        </div>
        <div className=" max-w-3xl mt-40">
          <div
            className={cn(
              fontHeading.className,
              "text-3xl pb-8 w-full text-center font-semibold  -tracking-tighter"
            )}
          >
            Built with 9 Best DX, Easy to use, Luxurious Technologies
          </div>
          <div className="flex flex-wrap justify-center items-start gap-5 ">
            {stackList.map((item, index) => (
              <Card shadow="sm" key={index} className=" w-[150px] ">
                <CardBody className="overflow-visible p-0">
                  <Image
                    as={NextImage}
                    shadow="sm"
                    width={150}
                    height={150}
                    alt={item.title}
                    className=" object-cover h-[50px] w-full"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small ">
                  <b>{item.title}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="pt-36">
          <div
            className={cn(
              fontHeading.className,
              "text-6xl pb-5 w-full max-w-3xl text-center font-semibold  -tracking-tighter"
            )}
          >
            Build & Ship Today!
          </div>
          <Button
            as={Link}
            variant="flat"
            href="/documentation"
            radius="full"
            size="lg"
            fullWidth
          >
            Get Started
          </Button>
        </div>
        <div className="pt-28">
          <div className="prose dark:prose-invert md:border rounded-lg md:p-10 md:px-16 bg-background ">
            <h3 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
              Want to show Support?
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              If this starter template helped you and you want to show some
              support. Here are few ways.
            </p>
            <ul className="my-6 list-disc [&>li]:mt-2">
              <li>
                <a
                  href="https://github.com/SRX9/ninetails-stack"
                  target="_blank"
                  className="flex justify-start items-center gap-2 "
                >
                  <Icons.sun className="size-4" /> Star GitHub Repository
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
          </div>{" "}
          <BottomFooter className="my-20" noLines />
        </div>
      </div>
    </>
  );
}
