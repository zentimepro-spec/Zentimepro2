import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/servicos"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/servicos/landing-pages"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/servicos/crm-comercial"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/servicos/sistemas-web"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/servicos/criacao-de-sites-em-sao-paulo"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/servicos/landing-page-com-whatsapp"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: absoluteUrl("/servicos/sistema-de-agenda-para-profissionais"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.84,
    },
    {
      url: absoluteUrl("/portfolio"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/precos"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/sobre"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contato"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
  ];
}
