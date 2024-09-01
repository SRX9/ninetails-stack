import { AppHost, site_metadata } from "@/config/site_metadata";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: site_metadata.terms.name,
    template: `%s - ${site_metadata.terms.name}`,
  },
  description: site_metadata.terms.description,
  keywords: site_metadata.terms.keywords,
  openGraph: {
    url: `${AppHost}/terms`,
    title: site_metadata.terms.name,
    description: site_metadata.terms.description,
    siteName: site_metadata.name,
    images: [
      {
        url: site_metadata.ogImage,
        width: 1200,
        height: 630,
        alt: site_metadata.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    title: site_metadata.terms.name,
    description: site_metadata.terms.description,
    card: "summary_large_image",
    images: [site_metadata.ogImage],
    creator: site_metadata.twitterHandle,
  },
};

export default function Layout({ children }: LayoutProps) {
  return children;
}
