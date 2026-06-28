import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Criacao de landing pages",
  description:
    "Criacao de landing pages com SEO otimizado, botao de WhatsApp e foco em captacao de leads para empresas e profissionais.",
  path: "/servicos/landing-pages",
});

const benefits = [
  "Estrutura pensada para conversao e contato rapido",
  "Layout responsivo com apresentacao profissional",
  "SEO tecnico de base para melhor indexacao",
  "Integracao com WhatsApp para captacao imediata",
];

const landingTypes = [
  {
    title: "Landing Page Institucional",
    description:
      "Indicada para empresas que querem apresentar servicos, diferenciais, estrutura e gerar confianca com uma pagina objetiva.",
    importance:
      "Ajuda a empresa a parecer mais organizada, profissional e preparada para atender bem desde o primeiro clique.",
  },
  {
    title: "Landing Page Pessoal",
    description:
      "Indicada para profissionais que vendem pela propria imagem, especialidade e autoridade, como maquiadoras, consultores e especialistas.",
    importance:
      "Valoriza a marca pessoal, facilita o contato e aumenta a percepcao de profissionalismo para quem ainda depende apenas de redes sociais.",
  },
];

const faqItems = [
  {
    question: "O que esta incluso na criacao de uma landing page?",
    answer:
      "A estrutura pode incluir layout personalizado, textos organizados para conversao, SEO de base, botao de WhatsApp e publicacao.",
  },
  {
    question: "Landing page serve para qual tipo de negocio?",
    answer:
      "Serve para empresas, profissionais liberais, especialistas e servicos que precisam apresentar uma oferta com clareza e gerar contato rapido.",
  },
  {
    question: "A landing page pode ter CRM para leads?",
    answer:
      "Sim. Quando necessario, a estrutura pode incluir CRM comercial para organizar os leads recebidos e acompanhar o andamento.",
  },
  {
    question: "Qual a diferenca entre landing page institucional e landing page pessoal?",
    answer:
      "A institucional apresenta a empresa e seus servicos com foco em credibilidade. A pessoal destaca a imagem, a autoridade e o posicionamento de um profissional especifico.",
  },
];

export default function LandingPagesServicePage() {
  const relatedLinks = [
    { href: "/precos", label: "Ver precos de landing pages" },
    { href: "/servicos/crm-comercial", label: "Conhecer CRM comercial" },
    { href: "/servicos/criacao-de-sites-em-sao-paulo", label: "Criacao de sites em Sao Paulo" },
  ];

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
    serviceType: "Criacao de landing pages",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    url: absoluteUrl("/servicos/landing-pages"),
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
          Criacao de landing pages para captacao de leads e contato comercial.
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Desenvolvemos landing pages com estrutura objetiva, botao de WhatsApp, apresentacao
          profissional e base de SEO para empresas e especialistas que querem gerar mais conversao.
        </p>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Quando faz sentido</p>
          <div className="mt-6 space-y-4 text-slate-300">
            <p className="leading-8">
              A landing page funciona muito bem para campanhas, trafego pago, profissionais liberais,
              servicos locais, lancamentos e ofertas especificas que precisam de uma pagina enxuta e
              focada em acao.
            </p>
            <p className="leading-8">
              Em vez de navegar por varias paginas, o visitante encontra uma mensagem direta, entende
              a proposta e tem um caminho curto para entrar em contato.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">O que voce recebe</p>
          <div className="mt-6 grid gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4 text-sm leading-7 text-slate-200"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Tipos de landing page</p>
          <h2 className="text-3xl font-semibold text-white">Entenda quando usar landing page institucional ou pessoal</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            Embora as duas tenham foco em conversao e contato rapido, a estrategia muda conforme o que precisa ser valorizado: a empresa ou o profissional.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {landingTypes.map((item) => (
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
      </section>

      <section className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Perguntas frequentes</p>
          <h2 className="text-3xl font-semibold text-white">FAQ sobre landing pages</h2>
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

      <section className="mt-16 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_42%),rgba(255,255,255,0.04)] p-8 shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Busca relacionada</p>
          <h2 className="text-3xl font-semibold text-white">Paginas complementares para quem esta pesquisando esse servico</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            Quem procura criacao de landing pages normalmente tambem compara precos, busca estrutura
            para acompanhar leads ou avalia desenvolvimento de site em contexto local.
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
        >
          Solicitar landing page
        </Link>
        <Link
          href="/precos"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/6 px-8 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:w-auto"
        >
          Ver precos
        </Link>
      </section>
    </main>
  );
}
