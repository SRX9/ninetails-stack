"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { SideBarLinks } from "./menu";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Icons } from "../icons/icons";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { avatar, name, email, isLoggedIn, authStatusLoading, logOut } =
    useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let intervalId: any;
    let count = 0;
    intervalId = setInterval(() => {
      if (count > 5) {
        const loader: any = document.getElementById("loaderMain");
        if (loader) {
          loader.style.display = "none";
          clearInterval(intervalId);
        }
      }
      if (typeof window !== "undefined") {
        const loader = document.getElementById("loaderMain");
        if (loader) {
          loader.style.display = "none";
          clearInterval(intervalId);
        }
      }
      count++;
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div id="loaderMain">
        <img src="/apple-touch-icon.png" width={75} height={75} />
      </div>
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row  w-full flex-1 mx-auto  overflow-hidden",
          "h-[100dvh]"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="justify-center flex gap-2 flex-col">
              <div className="flex flex-col gap-3  justify-center items-center">
                {SideBarLinks.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className=" flex flex-col gap-3 justify-center items-center ">
              {isLoggedIn && !authStatusLoading && (
                <SidebarLink
                  link={{
                    label: "Logout",
                    click: logOut,
                    icon: (
                      <Icons.logout className="text-neutral-700 dark:text-neutral-200  flex-shrink-0" />
                    ),
                  }}
                />
              )}
              <SidebarLink
                link={{
                  label: name ? name : "Login",
                  href: email ? "/profile" : "/login",
                  icon: avatar ? (
                    <Image
                      src={avatar}
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
              "p-2 md:p-5 rounded-tl-2xl   flex flex-col gap-2 flex-1 w-full h-[100dvh]",
              "relative  overflow-auto scrollbar-none scrollbar-track-gray-100  scrollbar-thumb-gray-300 dark:scrollbar-track-gray-900 dark:scrollbar-thumb-gray-800 sm:scrollbar-thin "
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
