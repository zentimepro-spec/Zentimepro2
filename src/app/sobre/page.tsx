import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

const positioningPoints = [
  {
    title: "Presenca com autoridade",
    description:
      "Projetos desenhados para transmitir mais confianca, clareza e valor desde o primeiro acesso.",
  },
  {
    title: "Comercial mais organizado",
    description:
      "Estruturas digitais que ajudam a captar, responder e acompanhar oportunidades com menos improviso.",
  },
  {
    title: "Operacao mais forte",
    description:
      "Sistemas, fluxos e interfaces pensados para facilitar a rotina e apoiar o crescimento da empresa.",
  },
];

const expertiseAreas = [
  "Criacao de sites institucionais e landing pages",
  "CRM comercial para leads, historico e pipeline",
  "Sistemas web sob medida para operacao interna",
  "Infraestrutura com Vercel, Supabase, Cloudflare e AWS",
];

const principles = [
  {
    name: "Clareza",
    text: "Cada entrega precisa facilitar entendimento, decisao e movimento, tanto para o cliente final quanto para a empresa.",
  },
  {
    name: "Imagem forte",
    text: "Design e posicionamento nao sao enfeite. Eles influenciam diretamente a forma como a marca e percebida.",
  },
  {
    name: "Funcionalidade real",
    text: "Nao construimos paginas ou sistemas apenas para existir. Construimos para vender, organizar e sustentar operacao.",
  },
  {
    name: "Evolucao continua",
    text: "Cada projeto deve abrir caminho para a proxima etapa do negocio, com base tecnica e espaco para crescer.",
  },
];

const workingSteps = [
  "Entendemos o momento da empresa, os gargalos e o objetivo principal da entrega.",
  "Definimos a melhor estrutura entre site, landing page, CRM ou sistema sob medida.",
  "Projetamos a experiencia visual e a logica operacional ao mesmo tempo.",
  "Publicamos, refinamos e deixamos a empresa com mais visibilidade para crescer.",
];

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a Zen Time Pro",
  description:
    "Conheca a Zen Time Pro, empresa focada em sites, CRM e sistemas digitais para organizacao comercial, autoridade de marca e crescimento online.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <section className="space-y-6">
        <Reveal delay={40}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Sobre</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="max-w-5xl text-4xl font-semibold text-white sm:text-6xl">
            A Zen Time Pro une presenca digital, organizacao comercial e estrutura operacional.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-4xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Somos uma empresa de tecnologia focada em criar sites, landing pages, CRM e sistemas
            web para negocios que querem parecer mais fortes, atender melhor e operar com mais
            clareza. Nosso trabalho nao e apenas colocar uma empresa no ar, mas construir uma base
            digital com imagem profissional e funcao real.
          </p>
        </Reveal>
      </section>

      <section className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
        {positioningPoints.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 90}
            variant="up"
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_45px_rgba(2,6,23,0.18)] backdrop-blur-xl sm:p-6"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{item.title}</p>
            <p className="mt-4 text-base leading-7 text-slate-300">{item.description}</p>
          </Reveal>
        ))}
      </section>

      <section className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal
          as="section"
          className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_45%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Quem somos</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Tecnologia com leitura comercial, nao apenas execucao tecnica.
          </h2>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              A Zen Time Pro nasceu para atender empresas e profissionais que precisam evoluir a
              forma como se apresentam e como operam. Em muitos casos, o problema nao e apenas a
              falta de um site, mas a falta de uma estrutura coerente entre imagem, atendimento,
              captacao e organizacao interna.
            </p>
            <p className="leading-8">
              Por isso, tratamos cada projeto como uma construcao de posicionamento e de processo.
              O visual precisa transmitir valor. O contato precisa ser facil. Os leads precisam ser
              acompanhados. E a operacao precisa sustentar o crescimento sem depender de
              improviso.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={120}
          variant="right"
          as="section"
          className="rounded-[2rem] border border-white/10 bg-[#081120]/72 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.2)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Atuacao</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            O que entregamos na pratica
          </h2>
          <div className="mt-6 grid gap-3">
            {expertiseAreas.map((item, index) => (
              <Reveal
                key={item}
                delay={160 + index * 70}
                variant="scale"
                className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-slate-200"
              >
                {item}
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-2">
        <Reveal
          as="section"
          className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Missao</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Ajudar empresas a crescer com mais presenca, organizacao e confianca.
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Nossa missao e construir entregas digitais que tornem o negocio mais claro para quem
            compra e mais forte para quem opera. Quando site, CRM e sistema conversam entre si, a
            empresa responde melhor, vende com mais estrutura e transmite mais autoridade.
          </p>
        </Reveal>

        <Reveal
          delay={120}
          variant="right"
          as="section"
          className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Visao</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Ser referencia em estruturas digitais que fortalecem empresas de forma completa.
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Queremos ser reconhecidos por unir design, tecnologia e organizacao comercial de um
            jeito pratico e sofisticado, criando projetos que parecem premium, funcionam bem e
            ajudam o cliente a crescer com mais controle.
          </p>
        </Reveal>
      </section>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:p-10"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Principios</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            O que orienta a forma como desenhamos cada entrega.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
          {principles.map((item, index) => (
            <Reveal
              key={item.name}
              delay={index * 80}
              variant="scale"
              className="rounded-[1.7rem] border border-white/10 bg-[#081120]/72 p-5 sm:p-6"
            >
              <p className="text-lg font-semibold text-white">{item.name}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <section className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal
          as="section"
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Como trabalhamos</p>
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Um processo pensado para alinhar imagem, estrutura e crescimento.
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            Cada projeto precisa fazer sentido para o momento do negocio. Por isso, organizamos a
            entrega com leitura estrategica antes da execucao.
          </p>
        </Reveal>

        <div className="space-y-4">
          {workingSteps.map((step, index) => (
            <Reveal
              key={step}
              delay={index * 80}
              variant="left"
              className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-[#081120]/72 p-4 shadow-[0_18px_45px_rgba(2,6,23,0.16)] sm:p-5"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-7 text-slate-300">{step}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:mt-16 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Proximo passo</p>
            <h2 className="max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
              Se sua empresa precisa parecer mais forte e operar melhor, podemos construir isso com voce.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              A Zen Time Pro atua justamente onde imagem, atendimento e operacao precisam evoluir ao
              mesmo tempo.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contato"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:min-w-[220px] sm:w-auto"
            >
              Solicitar diagnostico
            </Link>
            <Link
              href="/servicos"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:min-w-[220px] sm:w-auto"
            >
              Ver servicos
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
