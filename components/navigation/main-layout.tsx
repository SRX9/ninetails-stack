"use client";

import { site_metadata } from "@/config/site_metadata";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { SideBarLinks } from "./menu";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Icons } from "../icons/icons";
import { fontHeading } from "@/config/myFont";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  w-full flex-1 mx-auto  overflow-hidden",
        "h-[100dvh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 gap-1 overflow-y-auto overflow-x-hidden">
            <Link
              href="/"
              className={cn(
                "font-normal flex flex-col gap-5 space-x-2 items-center text-sm text-black relative z-20",
                open ? "py-10 " : "py-3"
              )}
            >
              <Image
                src={site_metadata.logo}
                width={70}
                height={70}
                className={`rounded-full`}
                alt={`${site_metadata.name} Logo"`}
              />
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    fontHeading.className,
                    "font-semibold text-xl max-w-3xl break-words -tracking-tighter  text-black dark:text-white whitespace-pre"
                  )}
                >
                  {site_metadata.name}
                </motion.span>
              )}
            </Link>
            <div className="flex flex-col gap-3">
              {SideBarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className=" flex flex-col gap-2 ">
            <SidebarLink
              link={{
                label: user?.name ? `Profile ` : "Login",
                href: user?.id ? "/profile" : "/login",
                icon: user?.image ? (
                  <Image
                    src={user?.image}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ) : (
                  <Icons.login className="text-neutral-700 dark:text-neutral-200  flex-shrink-0" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex flex-1">
        <div
          className={cn(
            "p-2 md:p-5 rounded-tl-2xl   flex flex-col gap-2 flex-1 w-full h-full",
            "relative  overflow-auto scrollbar-none scrollbar-track-gray-100  scrollbar-thumb-gray-300 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800 sm:scrollbar-thin "
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
