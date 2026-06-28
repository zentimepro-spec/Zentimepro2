import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Landing page com WhatsApp",
  description:
    "Landing page com WhatsApp para empresas e profissionais que precisam captar contatos de forma rapida, simples e profissional.",
  path: "/servicos/landing-page-com-whatsapp",
});

const highlights = [
  "Botao de WhatsApp em destaque para contato imediato",
  "Estrutura enxuta para apresentacao e conversao",
  "SEO inicial para indexacao basica no Google",
  "Layout responsivo para mobile e desktop",
];

const faqItems = [
  {
    question: "Por que criar uma landing page com WhatsApp?",
    answer:
      "Porque reduz atrito no contato. O visitante entende a oferta e consegue chamar sua empresa imediatamente sem etapas desnecessarias.",
  },
  {
    question: "Landing page com WhatsApp funciona para trafego pago?",
    answer:
      "Sim. E um formato muito usado em campanhas quando o objetivo principal e gerar contato rapido e conversao direta.",
  },
  {
    question: "A pagina pode ter SEO mesmo sendo simples?",
    answer:
      "Sim. Mesmo em uma estrutura enxuta, e possivel aplicar boas praticas de SEO tecnico, titulos, descricoes e organizacao semantica.",
  },
];

export default function LandingPageComWhatsappPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Landing page com WhatsApp",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: absoluteUrl("/servicos/landing-page-com-whatsapp"),
    areaServed: "BR",
  };

  return (
    <main className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Servico especializado</p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">
          Landing page com WhatsApp para captar contatos de forma mais rapida.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Criamos landing pages com WhatsApp para empresas, profissionais e servicos que precisam
          transformar acesso em conversa comercial com o menor atrito possivel.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Quando esse formato funciona melhor</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              A landing page com WhatsApp funciona muito bem para servicos locais, especialistas,
              campanhas pontuais e negocios que dependem de resposta rapida para converter.
            </p>
            <p className="leading-8">
              Ela concentra a mensagem em uma pagina so, reduz a dispersao e facilita a passagem do
              visitante para uma conversa direta.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">O que entra no projeto</p>
          <div className="mt-6 grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4 text-sm leading-7 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Perguntas frequentes</p>
          <h2 className="text-3xl font-semibold text-white">FAQ sobre landing page com WhatsApp</h2>
        </div>
        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-white/10 bg-[#081120]/65 p-5">
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/precos"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
        >
          Ver precos
        </Link>
        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Solicitar landing page
        </Link>
      </section>
    </main>
  );
}
