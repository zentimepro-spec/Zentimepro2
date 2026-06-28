import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "CRM comercial para gerenciar leads",
  description:
    "CRM comercial para organizar leads, acompanhar status, registrar notas e melhorar o processo de atendimento e vendas.",
  path: "/servicos/crm-comercial",
});

const sections = [
  "Organizacao do pipeline comercial",
  "Historico de interacoes e contexto do lead",
  "Atualizacao de status e acompanhamento do processo",
  "Painel para leitura mais clara da operacao",
];

const coreConcepts = [
  {
    title: "O que e CRM?",
    description:
      "CRM e a estrutura que ajuda a centralizar contatos, registrar historico, organizar etapas e dar visibilidade para o processo comercial.",
    importance:
      "Sem CRM, a operacao tende a depender demais de memoria, conversas dispersas e controles improvisados, o que aumenta perda de oportunidade.",
  },
  {
    title: "O que sao leads?",
    description:
      "Leads sao os contatos que demonstraram interesse no seu servico ou produto e entraram no funil por formulario, WhatsApp, campanha ou indicacao.",
    importance:
      "Todo lead precisa de contexto, prioridade e acompanhamento. Quando isso nao acontece, o negocio responde tarde e vende menos do que poderia.",
  },
];

const faqItems = [
  {
    question: "Para que serve um CRM comercial?",
    answer:
      "Um CRM comercial ajuda a empresa a organizar leads, registrar historico, acompanhar etapas e ter mais clareza sobre o andamento das oportunidades.",
  },
  {
    question: "O CRM comercial pode ser usado com leads do site?",
    answer:
      "Sim. O CRM pode centralizar os contatos recebidos pelo site e facilitar a triagem, atualizacao e acompanhamento do processo comercial.",
  },
  {
    question: "CRM comercial serve apenas para grandes empresas?",
    answer:
      "Nao. Empresas menores e equipes enxutas costumam ganhar bastante organizacao e previsibilidade quando deixam de depender de controles manuais.",
  },
];

export default function CrmComercialServicePage() {
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
    serviceType: "CRM comercial para empresas",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: absoluteUrl("/servicos/crm-comercial"),
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
          CRM comercial para gerenciar leads com mais controle e clareza.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Estruturamos CRM comercial para empresas que precisam acompanhar leads, registrar
          informacoes, entender o funil e reduzir improviso no atendimento.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Para quem faz sentido</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              O CRM comercial ajuda empresas e profissionais que recebem contatos pelo site, WhatsApp
              ou campanhas e precisam organizar melhor a operacao para nao perder oportunidades.
            </p>
            <p className="leading-8">
              Em vez de anotar tudo manualmente, a equipe trabalha com mais visibilidade, historico e
              consistencia no acompanhamento.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Componentes comuns</p>
          <div className="mt-6 grid gap-3">
            {sections.map((item) => (
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
        <div className="w-full rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Base comercial</p>
            <h2 className="text-3xl font-semibold text-white">CRM e leads: o que sao e por que isso importa</h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-300">
              Muitas empresas ate recebem contatos, mas ainda nao possuem uma estrutura para entender quem entrou, em que etapa esta e qual deve ser a proxima acao.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {coreConcepts.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.8rem] border border-white/10 bg-[#081120]/72 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                <div className="mt-5 rounded-[1.2rem] border border-cyan-400/12 bg-cyan-500/8 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Importancia</p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{item.importance}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Perguntas frequentes</p>
            <h2 className="text-3xl font-semibold text-white">FAQ sobre CRM comercial</h2>
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
          Solicitar CRM comercial
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver portfolio
        </Link>
        <Link
          href="/servicos/landing-pages"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver landing pages
        </Link>
      </section>
    </main>
  );
}
