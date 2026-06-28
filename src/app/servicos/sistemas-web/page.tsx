import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sistemas web para empresas",
  description:
    "Sistemas web personalizados para empresas que precisam organizar agenda, operacao interna, dashboards e processos digitais.",
  path: "/servicos/sistemas-web",
});

const examples = [
  "Sistema de agenda para operacao e atendimento",
  "Controle de ponto e acompanhamento interno",
  "Dashboards e areas administrativas",
  "Fluxos especificos conforme regra do negocio",
];

const faqItems = [
  {
    question: "O que e um sistema web para empresa?",
    answer:
      "E uma aplicacao desenvolvida para resolver uma rotina especifica do negocio, como agenda, controle interno, dashboards ou fluxos operacionais.",
  },
  {
    question: "Vale a pena desenvolver um sistema web sob medida?",
    answer:
      "Faz sentido quando a empresa percebe que processos manuais, planilhas ou ferramentas genericas ja nao sustentam bem a operacao.",
  },
  {
    question: "Quais tipos de sistema a Zen Time Pro desenvolve?",
    answer:
      "Sistemas de agenda, controle interno, dashboards, operacoes comerciais e outras estruturas digitais personalizadas conforme a necessidade.",
  },
];

export default function SistemasWebServicePage() {
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
    serviceType: "Sistemas web para empresas",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: absoluteUrl("/servicos/sistemas-web"),
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
          Sistemas web para empresas que precisam estruturar a operacao.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Desenvolvemos sistemas web sob medida para empresas que precisam organizar agenda, processos,
          acompanhamento interno e rotinas especificas com mais eficiencia.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Abordagem</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              Um sistema web faz sentido quando a empresa ja percebe que planilhas, mensagens soltas e
              controles manuais estao limitando a operacao.
            </p>
            <p className="leading-8">
              O desenvolvimento parte da necessidade real do negocio, respeitando fluxo, prioridades,
              acesso e rotina de quem vai usar a ferramenta.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Exemplos de uso</p>
          <div className="mt-6 grid gap-3">
            {examples.map((item) => (
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

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Perguntas frequentes</p>
            <h2 className="text-3xl font-semibold text-white">FAQ sobre sistemas web</h2>
          </div>
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-[1.4rem] border border-white/10 bg-[#081120]/65 p-5">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
        >
          Solicitar sistema web
        </Link>
        <Link
          href="/precos"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Entender formatos
        </Link>
        <Link
          href="/servicos/crm-comercial"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver CRM comercial
        </Link>
      </section>
    </main>
  );
}
