import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Criacao de sites em Sao Paulo",
  description:
    "Criacao de sites em Sao Paulo para empresas que querem mais presenca digital, contato comercial e apresentacao profissional.",
  path: "/servicos/criacao-de-sites-em-sao-paulo",
});

const localSignals = [
  "Atendimento para empresas e profissionais em Sao Paulo",
  "Sites institucionais e landing pages com foco comercial",
  "Estrutura para WhatsApp, captacao e apresentacao de servicos",
  "Projeto com base tecnica, SEO inicial e publicacao profissional",
];

const localFaq = [
  {
    question: "Voces fazem criacao de sites em Sao Paulo?",
    answer:
      "Sim. A Zen Time Pro atende empresas e profissionais em Sao Paulo com criacao de sites, landing pages, CRM e sistemas web.",
  },
  {
    question: "Qual tipo de site faz mais sentido para empresas em Sao Paulo?",
    answer:
      "Depende do objetivo. Para captacao rapida, uma landing page pode funcionar melhor. Para apresentacao institucional mais completa, um site com mais estrutura pode ser o ideal.",
  },
  {
    question: "O site pode ser integrado ao WhatsApp?",
    answer:
      "Sim. Em muitos projetos o contato via WhatsApp e um dos canais principais de conversao, por isso pode entrar como parte da estrutura.",
  },
];

export default function CriacaoDeSitesEmSaoPauloPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaq.map((item) => ({
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
    serviceType: "Criacao de sites em Sao Paulo",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: "Sao Paulo",
    },
    url: absoluteUrl("/servicos/criacao-de-sites-em-sao-paulo"),
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
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Busca local</p>
        <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">
          Criacao de sites em Sao Paulo para empresas que querem vender melhor.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Desenvolvemos sites e landing pages para empresas em Sao Paulo que precisam de uma
          apresentacao mais profissional, mais clareza comercial e um caminho direto para contato.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Por que essa pagina existe
          </p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              Empresas costumam procurar no Google por termos como criacao de sites em Sao Paulo,
              desenvolvimento de landing page e site profissional para empresa. Esta pagina ajuda a
              alinhar o conteudo do site a essa intencao de busca.
            </p>
            <p className="leading-8">
              O objetivo nao e repetir palavras-chave artificialmente, mas organizar uma pagina clara
              para quem realmente esta buscando esse tipo de servico.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            O que sua empresa recebe
          </p>
          <div className="mt-6 grid gap-3">
            {localSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4 text-sm leading-7 text-slate-200"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Perguntas frequentes</p>
          <h2 className="text-3xl font-semibold text-white">
            FAQ sobre criacao de sites em Sao Paulo
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          {localFaq.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.4rem] border border-white/10 bg-[#081120]/65 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
        >
          Solicitar proposta
        </Link>
        <Link
          href="/servicos"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver outros servicos
        </Link>
      </section>
    </main>
  );
}
