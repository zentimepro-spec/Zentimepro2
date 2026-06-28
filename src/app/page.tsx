import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

const heroSignals = [
  {
    label: "Sites e landing pages",
    title: "Presenca forte",
    description: "Design, clareza comercial e resposta rapida para gerar confianca.",
  },
  {
    label: "CRM comercial",
    title: "Leads organizados",
    description: "Pipeline, historico e processo visivel para vender com mais consistencia.",
  },
  {
    label: "Sistemas sob medida",
    title: "Operacao estruturada",
    description: "Agenda, fluxos internos e rotinas digitais pensadas para o seu negocio.",
  },
];

const proofCards = [
  ["Operacao integrada", "Do site ao acompanhamento do lead, tudo conversa entre si."],
  ["Imagem profissional", "Experiencia visual forte para transmitir autoridade desde o primeiro acesso."],
  ["Decisao com dados", "Dashboard comercial e leitura clara do funil para agir mais rapido."],
];

const processSteps = [
  "Mapeamos objetivos, posicionamento e gargalos comerciais.",
  "Desenhamos estrutura, narrativa e experiencia com foco em conversao.",
  "Implementamos site, CRM e sistema conforme a necessidade real do projeto.",
  "Ajustamos a operacao com visibilidade, melhoria continua e acompanhamento.",
];

const pricingCards = [
  [
    "Landing Page Simples",
    "R$ 499,00",
    "SEO otimizado, botao de WhatsApp e custos de dominio e hospedagem.",
  ],
  [
    "Landing Page Completa",
    "R$ 799,00",
    "SEO otimizado, botao de WhatsApp, dominio e hospedagem e painel CRM para leads.",
  ],
  [
    "Sistemas Internos",
    "Sob consulta",
    "Projetos personalizados conforme fluxo, regras e necessidade operacional.",
  ],
  [
    "Manutencao Mensal",
    "R$ 150,00 / mes",
    "Ajustes, alteracoes e acompanhamento recorrente apos a entrega.",
  ],
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Criacao de sites, landing pages, CRM e sistemas web",
  description:
    "Criacao de sites, landing pages, CRM comercial e sistemas web para empresas que querem fortalecer a presenca digital e organizar a operacao em Sao Paulo e no Brasil.",
  path: "/",
});

export default function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Criacao de sites, CRM e sistemas web",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "BR",
    url: absoluteUrl("/"),
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#0b1220] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <div className="absolute inset-0 animated-bg" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-4 py-10 sm:px-6 sm:py-14 lg:gap-18 lg:px-10">
        <section className="grid gap-8 pt-2 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-10 lg:pt-6">
          <div className="space-y-7">
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-4 py-2 text-[11px] font-semibold uppercase leading-5 tracking-[0.24em] text-cyan-300 shadow-[0_12px_35px_rgba(8,145,178,0.16)] sm:max-w-fit sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.28em]">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
              Solucoes digitais com estrutura comercial real
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-[2.5rem] font-semibold leading-[0.98] text-white sm:text-5xl xl:text-[4.1rem]">
                Presenca premium para vender melhor e operar com muito mais controle.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                A Zen Time Pro cria sites, CRM e sistemas para empresas que querem crescer com
                imagem forte, velocidade de atendimento e uma operacao comercial profissional em
                Sao Paulo e em todo o Brasil.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/contato"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_55px_rgba(37,99,235,0.35)] sm:w-auto"
              >
                Solicitar diagnostico
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20solicitar%20um%20orcamento."
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-slate-100 sm:w-auto"
              >
                Falar no WhatsApp
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroSignals.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[1.45rem] border border-white/8 bg-[#081120]/68 px-5 py-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual-shell">
            <div className="hero-visual-card">
              <div className="hero-visual-topbar">
                <div className="hero-visual-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Zen Time Pro Platform</p>
              </div>

              <div className="hero-visual-image-wrap">
                <Image
                  src="/hero-image-1.png"
                  alt="Ecossistema digital da Zen Time Pro"
                  width={1460}
                  height={1217}
                  priority
                  className="hero-visual-image"
                />
              </div>

              <div className="grid gap-3 border-t border-white/8 px-4 py-4 sm:grid-cols-2 sm:px-5">
                <div className="rounded-[1.15rem] border border-white/10 bg-[#081120]/76 px-4 py-4">
                  <p className="hero-floating-label">Entrega completa</p>
                  <strong className="mt-3 block text-[1rem] leading-6 text-white">
                    Site + CRM + sistema
                  </strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-300">
                    Estrutura unificada para captar, atender e operar com mais consistencia.
                  </span>
                </div>

                <div className="rounded-[1.15rem] border border-white/10 bg-[#081120]/76 px-4 py-4">
                  <p className="hero-floating-label">Direcao comercial</p>
                  <strong className="mt-3 block text-[1rem] leading-6 text-white">
                    Leads, pipeline e insights
                  </strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-300">
                    Mais clareza para identificar gargalos e mover oportunidades com rapidez.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["Atendimento mais rapido", "Resposta, triagem e acompanhamento sem perder contexto."],
            ["Mais autoridade na marca", "Experiencia visual consistente e mais confianca no primeiro contato."],
            ["Menos improviso comercial", "Processo organizado para equipe, leads e proximas acoes."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_45px_rgba(2,6,23,0.16)] backdrop-blur-xl"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{title}</p>
              <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">O que muda na pratica</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Mais do que um site bonito: uma operacao com leitura clara.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Quando marca, captura e acompanhamento comercial ficam conectados, a empresa ganha mais
              previsibilidade, mais agilidade e uma percepcao muito mais forte para o cliente.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {proofCards.map(([title, description]) => (
              <div
                key={title}
                className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl"
              >
                <p className="text-base font-semibold text-white">{title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Metodologia</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Projetamos a experiencia e a operacao ao mesmo tempo.
                </h2>
              </div>

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-[1.4rem] border border-white/8 bg-[#081120]/65 p-4"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-7 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#081120]/60 p-2.5">
              <Image
                src="/hero-image-2.png"
                alt="Painel visual da Zen Time Pro"
                width={1460}
                height={1217}
                className="h-auto w-full rounded-[1.2rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section id="precos" className="space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Modelos de entrega</p>
            <h2 className="text-3xl font-semibold text-white sm:text-5xl">
              Estruturas claras para diferentes tipos de projeto.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              De landing pages objetivas a sistemas internos, o formato certo depende do nivel de
              operacao que sua empresa precisa hoje.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingCards.map(([plan, price, tagline]) => (
              <div
                key={plan}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{plan}</p>
                <p className="mt-5 text-2xl font-semibold text-white">{price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_40%),linear-gradient(180deg,rgba(8,17,32,0.92),rgba(8,17,32,0.86))] p-8 shadow-[0_24px_80px_rgba(2,6,23,0.28)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Proximo passo</p>
              <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
                Se a ideia e parecer maior, atender melhor e vender com mais estrutura, podemos
                comecar por aqui.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Organizamos um diagnostico inicial para entender seu momento, o que precisa entrar
                primeiro e como priorizar a entrega.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-end">
              <Link
                href="/contato"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_55px_rgba(37,99,235,0.35)] sm:w-auto"
              >
                Solicitar proposta
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20solicitar%20um%20orcamento."
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white sm:w-auto"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
