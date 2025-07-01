import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

// Note: Gambarino font will need to be added as a custom font
// For now, we'll use a fallback display font
const displayFont = Raleway({
  variable: "--font-gambarino",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Côte Royale Paris - Luxury Fragrances",
  description: "Discover our collection of premium fragrances crafted with the finest ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
