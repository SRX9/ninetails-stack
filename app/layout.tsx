import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import ThemeLocal from "@/components/ui/ThemeLocal";
import NextTopLoader from "nextjs-toploader";
import MainLayout from "@/components/navigation/main-layout";
import { site_metadata } from "@/config/site_metadata";
import loaderMain from "@/assets/loaderMain";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: site_metadata.name,
    template: `%s - ${site_metadata.name}`,
  },
  description: site_metadata.description,
  keywords: [
    "Ninetails Stack",
    "Ninetails SaaS Starter",
    "Ninetails SaaS Template",
    "Ninetails SaaS Starter template",
    "Ninetails Starter Kit",
    "Ninetails Stack template",
    "Ninetails Stack AI ",
  ],
  authors: [
    {
      name: "AyeSoul",
      url: site_metadata.url,
    },
  ],
  creator: "AyeSoul",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site_metadata.url,
    title: site_metadata.name,
    description: site_metadata.description,
    siteName: site_metadata.name,
    images: [
      {
        url: site_metadata.ogImage,
        width: 1200,
        height: 630,
        alt: site_metadata.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site_metadata.name,
    description: site_metadata.description,
    images: [site_metadata.ogImage],
    creator: site_metadata.twitterHandle,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${site_metadata.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#000000"></meta>
        <meta
          data-rh="true"
          name="robots"
          content="index,follow,max-image-preview:large"
        />
        <style>{loaderMain}</style>
      </head>
      <body
        id="main-div"
        className={cn(
          "min-h-screen overflow-hidden bg-background antialiased",
          fontSans.className
        )}
      >
        <NextUIProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader
                color="linear-gradient(to right, #fc466b, #3f5efb)"
                initialPosition={0.08}
                crawlSpeed={500}
                height={5}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={500}
              />
              <MainLayout>{children}</MainLayout>
              <ThemeLocal />
            </ThemeProvider>
          </SessionProvider>
        </NextUIProvider>
        <Toaster />
      </body>
    </html>
  );
}
