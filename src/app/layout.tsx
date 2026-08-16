import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Zen Time Pro | Sites, CRM e Sistemas Web",
    template: "%s | Zen Time Pro",
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon-brand.png",
    shortcut: "/favicon-brand.png",
    apple: "/favicon-brand.png",
  },
  openGraph: {
    title: "Zen Time Pro | Sites, CRM e Sistemas Web",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1536,
        height: 1024,
        alt: "Zen Time Pro portfolio showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zen Time Pro | Sites, CRM e Sistemas Web",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: absoluteUrl("/favicon-brand.png"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    inLanguage: "pt-BR",
  };

  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#0f172a] font-sans text-slate-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SiteHeader />
        <div className="min-h-[calc(100dvh-6rem)] min-h-[calc(100vh-6rem)]">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
