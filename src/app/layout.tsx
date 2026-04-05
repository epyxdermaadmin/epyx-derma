import type { Metadata } from "next";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { brand, jsonLdHospital } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} | Advanced Dermatology Hospital`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "dermatology hospital",
    "skin clinic",
    "aesthetic dermatology",
    "clinical dermatology",
    "hair scalp treatment",
    "laser dermatology",
  ],
  applicationName: brand.name,
  openGraph: {
    title: `${brand.name} | Advanced Dermatology Hospital`,
    description: brand.description,
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
    url: brand.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Advanced Dermatology Hospital`,
    description: brand.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="epyxderma-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHospital) }}
        />
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
