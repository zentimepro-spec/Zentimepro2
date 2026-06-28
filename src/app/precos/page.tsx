import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

const plans = [
  {
    name: "Landing Page Simples",
    price: "R$ 499,00",
    summary: "Presenca digital objetiva para captacao rapida.",
    items: [
      "Taxas de registro de dominio e hospedagem",
      "SEO otimizado",
      "Botao de WhatsApp",
    ],
  },
  {
    name: "Landing Page Completa",
    price: "R$ 799,00",
    summary: "Estrutura mais completa para captar e acompanhar oportunidades.",
    items: [
      "Taxas de registro de dominio e hospedagem",
      "SEO otimizado",
      "Painel CRM para gerenciar seus leads",
      "Botao de WhatsApp",
    ],
  },
  {
    name: "Sistemas Internos para empresas",
    price: "Sob consulta",
    summary: "Projetos sob medida conforme operacao, regras e complexidade.",
    items: [
      "Escopo tecnico personalizado",
      "Analise do fluxo operacional",
      "Planejamento conforme necessidade da empresa",
    ],
  },
];

const maintenanceItems = [
  "Atualizacoes pontuais e alteracoes recorrentes",
  "Ajustes visuais, conteudo e pequenas melhorias",
  "Acompanhamento mensal por R$ 150,00",
];

export const metadata: Metadata = createPageMetadata({
  title: "Precos de landing pages, CRM e sistemas",
  description:
    "Consulte os precos da Zen Time Pro para landing pages, CRM comercial, sistemas internos e manutencao mensal.",
  path: "/precos",
});

export default function PricingPage() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <section className="space-y-6 text-center">
        <Reveal delay={40}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Precificacao</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mx-auto max-w-5xl text-4xl font-semibold text-white sm:text-6xl">
            Valores claros para comecar com mais presenca e estrutura digital.
          </h1>
        </Reveal>
        <Reveal delay={190}>
          <p className="mx-auto max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Escolha o formato que faz sentido para o seu momento. Se o projeto exigir algo mais
            personalizado, montamos o escopo sob consulta.
          </p>
        </Reveal>
      </section>

      <section className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal
            key={plan.name}
            delay={index * 90}
            variant="up"
            as="article"
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:p-7"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{plan.name}</p>
              <p className="text-3xl font-semibold text-white sm:text-4xl">{plan.price}</p>
              <p className="text-sm leading-7 text-slate-300">{plan.summary}</p>
            </div>

            <div className="mt-6 h-px bg-white/10 sm:mt-8" />

            <ul className="mt-6 space-y-4 sm:mt-8">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal delay={40} className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Manutencao mensal</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Continuamos cuidando do projeto depois da entrega.</h2>
            <p className="text-lg font-medium text-white">R$ 150,00 mensais</p>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Ideal para empresas que desejam manter o site atualizado, ajustar informacoes e solicitar alteracoes com mais tranquilidade.
            </p>
          </Reveal>

          <Reveal
            delay={120}
            variant="right"
            className="rounded-[1.8rem] border border-white/10 bg-[#081120]/70 p-5 sm:p-6"
          >
            <ul className="space-y-4">
              {maintenanceItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Reveal>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl sm:mt-16 sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Atendimento comercial</p>
            <h2 className="max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
              Se precisar de um escopo diferente, montamos a proposta conforme sua necessidade.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contato"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:min-w-[220px] sm:w-auto"
            >
              Solicitar proposta
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20da%20pagina%20de%20precos%20e%20quero%20falar%20sobre%20uma%20proposta."
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:min-w-[220px] sm:w-auto"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
