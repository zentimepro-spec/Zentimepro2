import type { Metadata } from "next";

export const siteConfig = {
  name: "Zen Time Pro",
  shortName: "Zen Time Pro",
  description:
    "Zen Time Pro entrega sites, landing pages, CRM, sistemas web e infraestrutura digital para empresas que valorizam tempo e resultados.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/portfolio-showcase.png",
  email: "zentimepro@gmail.com",
  phone: "+55 (11) 99165-0950",
  whatsappPhone: "5511991650950",
  locale: "pt_BR",
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1536,
          height: 1024,
          alt: `${siteConfig.name} portfolio showcase`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
}
