import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import { site_metadata } from "@/config/site_metadata";

interface IProps {
  className?: string;
  fullLengthDivider?: boolean;
  noLines?: boolean;
}

export function BottomFooter({
  className,
  fullLengthDivider,
  noLines,
}: IProps) {
  return (
    <div
      className={cn(
        className,
        "flex w-full flex-col items-center justify-center space-x-4 px-5 pb-5"
      )}
    >
      <div className="mx-auto text-center  md:max-w-[58rem]">
        {!noLines ? (
          <Separator
            className={cn(fullLengthDivider ? "w-full" : "max-w-[300px]")}
          />
        ) : (
          <></>
        )}
        <div className="flex w-full flex-wrap items-center justify-center gap-2 pt-5 text-xs font-medium text-gray-600 dark:text-gray-400">
          <Link href={"/terms"} scroll={true}>
            Terms
          </Link>
          •
          <Link href={"/contact"} scroll={true}>
            Contact
          </Link>{" "}
          •
          <Link href={"/about"} scroll={true}>
            About
          </Link>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4 ">
          <a
            target={"_blank"}
            className="mx-1.5 text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
            href="https://twitter.com/s_r_x_9"
            rel="noreferrer"
          >
            <svg
              className="h-10 w-10 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
            </svg>
          </a>

          <a
            target={"_blank"}
            className="mx-1.5 text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400"
            href="https://github.com/srx9"
            rel="noreferrer"
          >
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                fill="currentColor"
              />
              <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" fill="currentColor" />
              <path
                d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <p className="mt-3 text-xs leading-7 text-gray-500  ">
          © 2024 {site_metadata.name}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
