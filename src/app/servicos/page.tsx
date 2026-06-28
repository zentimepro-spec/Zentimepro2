import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

const services = [
  {
    title: "Landing Pages",
    description:
      "Paginas objetivas para apresentacao, captacao de leads e contato rapido com foco comercial.",
    href: "/servicos/landing-pages",
  },
  {
    title: "Sites Institucionais",
    description:
      "Presenca digital profissional com layout premium, velocidade e responsividade para transmitir confianca.",
  },
  {
    title: "Portfolios Profissionais",
    description:
      "Apresente seu trabalho com clareza, autoridade e uma experiencia visual mais valorizada.",
  },
  {
    title: "CRM Comercial",
    description:
      "Painel para acompanhar leads, status, historico, notas e organizacao do fluxo comercial.",
    href: "/servicos/crm-comercial",
  },
  {
    title: "Sistemas Web",
    description:
      "Solucoes personalizadas para agenda, operacao interna, dashboards e processos especificos da empresa.",
    href: "/servicos/sistemas-web",
  },
  {
    title: "Infraestrutura e publicacao",
    description:
      "Deploy, hospedagem, banco de dados e camada tecnica com Vercel, Supabase, Cloudflare e AWS.",
  },
];

const serviceGuides = [
  {
    title: "Landing Page Institucional",
    description:
      "Uma pagina criada para apresentar a empresa, transmitir confianca, explicar servicos e facilitar o contato com mais clareza.",
    importance:
      "Importante para negocios que precisam parecer mais profissionais, organizar a comunicacao e melhorar a primeira impressao online.",
    href: "/servicos/landing-pages",
  },
  {
    title: "Landing Page Pessoal",
    description:
      "Uma pagina focada em apresentar um profissional, especialista ou prestador de servico, destacando autoridade, historia e forma de atendimento.",
    importance:
      "Importante para maquiadoras, consultores, terapeutas, advogados, personal trainers e outros profissionais que dependem da propria imagem para vender.",
    href: "/servicos/landing-pages",
  },
  {
    title: "O que e CRM?",
    description:
      "CRM e a estrutura usada para organizar contatos, acompanhar etapas, registrar historico e dar visibilidade ao andamento comercial.",
    importance:
      "Importante para nao depender de memoria, planilhas soltas ou conversas perdidas no WhatsApp quando o volume de oportunidades cresce.",
    href: "/servicos/crm-comercial",
  },
  {
    title: "O que sao leads?",
    description:
      "Leads sao pessoas ou empresas que demonstraram interesse no seu servico e entraram em contato pelo site, formulario, WhatsApp ou campanha.",
    importance:
      "Entender isso e essencial porque todo lead precisa de resposta, contexto e acompanhamento para ter chance real de virar cliente.",
    href: "/servicos/crm-comercial",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Servicos de sites, CRM e sistemas web",
  description:
    "Conheca os servicos da Zen Time Pro: landing pages, criacao de sites, CRM comercial, sistemas web e infraestrutura digital para empresas em Sao Paulo e no Brasil.",
  path: "/servicos",
});

export default function ServicesPage() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-16 space-y-6">
        <Reveal delay={40}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Servicos</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="text-4xl font-semibold text-white sm:text-6xl">
            Solucoes digitais voltadas para resultados reais.
          </h1>
        </Reveal>
        <Reveal delay={190}>
          <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Desenvolvemos entregas que unem tecnologia, imagem profissional e estrutura comercial
            para empresas que querem crescer com clareza, especialmente em buscas por criacao de
            sites, landing pages, CRM e sistemas web.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <Reveal
            key={service.title}
            delay={index * 80}
            variant="up"
            className="glass-card rounded-3xl p-8 transition hover:border-cyan-500/30"
          >
            <p className="text-xl font-semibold text-white">{service.title}</p>
            <p className="mt-3 leading-7 text-slate-300">{service.description}</p>
            {service.href ? (
              <Link
                href={service.href}
                className="mt-6 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Ver pagina detalhada
              </Link>
            ) : null}
          </Reveal>
        ))}
      </div>

      <Reveal
        as="section"
        className="mt-16 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_45%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Guia rapido</p>
          <h2 className="text-3xl font-semibold text-white">
            Entenda o que cada servico resolve e por que isso importa.
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            Nem todo cliente chega sabendo a diferenca entre landing page, CRM e lead. Esta visao
            ajuda a entender o papel de cada estrutura dentro do crescimento digital e comercial.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {serviceGuides.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 90}
              variant="scale"
              className="rounded-[1.8rem] border border-white/10 bg-[#081120]/72 p-6 shadow-[0_18px_45px_rgba(2,6,23,0.18)]"
            >
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              <div className="mt-5 rounded-[1.25rem] border border-cyan-400/12 bg-cyan-500/8 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Importancia</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item.importance}</p>
              </div>
              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Ver aplicacao na pratica
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-16 glass-card rounded-3xl p-8">
        <h2 className="mb-6 text-2xl font-semibold text-white">Como trabalhamos</h2>
        <ul className="mt-6 space-y-4 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="mt-1 text-cyan-400">•</span>
            <span>Analise de necessidades e posicionamento da sua marca.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-cyan-400">•</span>
            <span>Estrutura de conteudo pensada para conversao e autoridade.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-cyan-400">•</span>
            <span>Design moderno com performance, SEO e seguranca em mente.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-cyan-400">•</span>
            <span>Entrega agil com foco em resultado e tranquilidade para o cliente.</span>
          </li>
        </ul>
      </Reveal>

      <Reveal
        as="section"
        className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Busca local e comercial</p>
          <h2 className="text-2xl font-semibold text-white">
            Paginas especificas para intencao de busca mais forte
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            Para competir melhor em buscas comerciais, tambem organizamos conteudo por servico e
            contexto. Isso ajuda o Google a entender com mais clareza para quais termos cada pagina
            deve aparecer.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/servicos/landing-pages"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Landing pages
            </Link>
            <Link
              href="/servicos/crm-comercial"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              CRM comercial
            </Link>
            <Link
              href="/servicos/sistemas-web"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Sistemas web
            </Link>
            <Link
              href="/servicos/criacao-de-sites-em-sao-paulo"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Criacao de sites em Sao Paulo
            </Link>
            <Link
              href="/servicos/landing-page-com-whatsapp"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Landing page com WhatsApp
            </Link>
            <Link
              href="/servicos/sistema-de-agenda-para-profissionais"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Sistema de agenda
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] transition hover:shadow-[0_0_50px_rgba(99,102,241,0.7)] hover:scale-105 sm:w-auto"
        >
          Solicitar proposta
        </Link>
        <a
          href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20servicos."
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-8 py-4 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] sm:w-auto"
        >
          Conversar no WhatsApp
        </a>
      </Reveal>
    </main>
  );
}
