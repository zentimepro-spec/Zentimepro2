import type { Metadata } from "next";

import { ImmersiveHome } from "./components/ImmersiveHome";
import "./immersive.css";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sites profissionais, landing pages, CRM e sistemas digitais",
  description:
    "A Zen Time Pro desenvolve sites profissionais, landing pages, CRM, automações e sistemas web para empresas. Explore nossos projetos e planeje sua experiência digital.",
  path: "/",
});

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Criação de sites, landing pages, CRM e sistemas web",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "BR",
    url: absoluteUrl("/"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <ImmersiveHome />
    </>
  );
}
