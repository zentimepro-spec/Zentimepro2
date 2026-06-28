import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sistema de agenda para profissionais",
  description:
    "Sistema de agenda para profissionais e empresas que precisam organizar atendimento, horarios, fluxo operacional e rotina comercial.",
  path: "/servicos/sistema-de-agenda-para-profissionais",
});

const features = [
  "Organizacao de horarios e compromissos",
  "Visao mais clara da rotina de atendimento",
  "Estrutura digital personalizada para o seu processo",
  "Base para evoluir operacao com mais controle",
];

const faqItems = [
  {
    question: "Para quem serve um sistema de agenda para profissionais?",
    answer:
      "Serve para profissionais e empresas que dependem de horarios, atendimentos ou organizacao recorrente da rotina e precisam sair de controles manuais.",
  },
  {
    question: "O sistema de agenda pode ser personalizado?",
    answer:
      "Sim. O desenvolvimento considera o fluxo real do negocio, as etapas do atendimento e a forma como a agenda precisa ser gerenciada.",
  },
  {
    question: "Sistema de agenda e o mesmo que CRM?",
    answer:
      "Nao necessariamente. O CRM organiza relacionamento comercial e leads. O sistema de agenda foca operacao, horarios e rotina de atendimento, embora ambos possam conversar entre si.",
  },
];

export default function SistemaDeAgendaParaProfissionaisPage() {
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
    serviceType: "Sistema de agenda para profissionais",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: absoluteUrl("/servicos/sistema-de-agenda-para-profissionais"),
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
          Sistema de agenda para profissionais que precisam de mais organizacao.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Desenvolvemos sistema de agenda para profissionais e empresas que precisam organizar
          horarios, atendimentos, compromissos e fluxo operacional com mais clareza.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Contexto de busca</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              Muitas empresas e profissionais procuram no Google por sistema de agenda para
              profissionais, agenda online personalizada ou software de agendamento para atendimento.
            </p>
            <p className="leading-8">
              Esta pagina ajuda o site a cobrir melhor esse tipo de intencao, ligando necessidade
              operacional a uma solucao digital sob medida.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">O que pode compor o sistema</p>
          <div className="mt-6 grid gap-3">
            {features.map((item) => (
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
          <h2 className="text-3xl font-semibold text-white">FAQ sobre sistema de agenda</h2>
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
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
        >
          Solicitar sistema de agenda
        </Link>
        <Link
          href="/servicos/sistemas-web"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver sistemas web
        </Link>
      </section>
    </main>
  );
}
