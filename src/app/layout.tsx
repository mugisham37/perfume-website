import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../../prismicio";
import { createClient } from "@/lib/prismic";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";

import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

type SettingsDocument = {
  data: {
    site_title?: string;
    meta_description?: string;
    fallback_og_image?: {
      url: string;
      alt?: string;
    };
    navigation_link: Array<{
      key?: string;
      text?: string;
    }>;
  };
};

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: "./gambarino.woff2",
  display: "swap",
  variable: "--font-gambarino",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);

  return {
    title: settings?.data.site_title || "Côte Royale Paris",
    description:
      settings?.data.meta_description ||
      "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
    openGraph: {
      images: isFilled.image(settings?.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/logo.svg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings").catch(() => null);

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${raleway.variable} ${gambarino.variable} antialiased`}
      >
        <body className="bg-neutral-900 text-white">
          {settings && settings.data.navigation_link && <NavBar settings={settings as unknown as SettingsDocument} />}
          <main className="pt-14 md:pt-16">{children}</main>
          <Footer />
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
