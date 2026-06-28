import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

const deliveredProjects = [
  {
    title: "Foncare",
    status: "Publicado",
    segment: "Landing page institucional",
    technologies: ["HTML", "CSS", "WhatsApp CTA"],
    image: "/portfolio-foncare.png",
    summary:
      "Site objetivo e direto ao ponto, com estrutura simples de apresentacao e botao para contato imediato via WhatsApp.",
    result:
      "Entrega voltada para presenca digital rapida, comunicacao clara e captura de oportunidade sem friccao.",
    url: "https://www.foncare.com.br",
  },
];

const inProgressProjects = [
  {
    title: "Marcella Mendes - Maquiadora",
    category: "Site profissional",
    description:
      "Projeto com foco em imagem, apresentacao de servicos, autoridade visual e estrutura de contato para captacao.",
  },
  {
    title: "Sistema Atipicals",
    category: "Sistema web",
    description:
      "Plataforma em desenvolvimento para suportar operacao, gestao e fluxos internos com visao mais estruturada do negocio.",
  },
  {
    title: "Sistema de gestao de agenda",
    category: "Sistema SaaS",
    description:
      "Solucao pensada para profissionais de varias areas organizarem agenda, atendimento e operacao do dia a dia.",
  },
  {
    title: "Sistema de controle de ponto",
    category: "Sistema interno",
    description:
      "Ferramenta para registro, acompanhamento e controle de jornada em um fluxo mais claro e centralizado.",
  },
];

const technologies = [
  {
    name: "HTML5",
    icon: "/tech-html.svg",
    description: "Estrutura semantica para landing pages rapidas, claras e bem indexadas.",
    accent: "from-[#f97316]/18 to-transparent",
  },
  {
    name: "CSS3",
    icon: "/tech-css.svg",
    description: "Interface premium, responsiva e com identidade visual mais forte.",
    accent: "from-[#3b82f6]/18 to-transparent",
  },
  {
    name: "Node.js",
    icon: "/tech-node.svg",
    description: "Back-end leve e escalavel para rotas, APIs e automacoes comerciais.",
    accent: "from-[#84cc16]/16 to-transparent",
  },
  {
    name: "Python",
    icon: "/tech-python.svg",
    description: "Regras de negocio, integracoes e rotinas internas com muita flexibilidade.",
    accent: "from-[#facc15]/14 via-[#2563eb]/10 to-transparent",
  },
  {
    name: "Vercel",
    icon: "/tech-vercel.svg",
    description: "Deploy moderno com velocidade, estabilidade e experiencia de producao.",
    accent: "from-white/10 to-transparent",
  },
  {
    name: "Supabase",
    icon: "/tech-supabase.svg",
    description: "Banco, autenticacao e servicos gerenciados para produtos web enxutos.",
    accent: "from-emerald-400/18 to-transparent",
  },
  {
    name: "Cloudflare",
    icon: "/tech-cloudflare.svg",
    description: "DNS, camada de protecao e entrega global com mais performance.",
    accent: "from-orange-400/18 to-transparent",
  },
  {
    name: "AWS",
    icon: "/tech-aws.svg",
    description: "Infraestrutura robusta para cenarios que exigem flexibilidade e escala.",
    accent: "from-amber-300/14 to-transparent",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio de sites e sistemas web",
  description:
    "Veja projetos publicados e em desenvolvimento da Zen Time Pro, incluindo landing pages, sites profissionais, CRM e sistemas web sob medida.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <Reveal delay={40}>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Portfolio</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">
              Trabalhos que unem site, sistema e operacao com uma apresentacao de alto nivel.
            </h1>
          </Reveal>
          <Reveal delay={190}>
            <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              O portfolio da Zen Time Pro mostra entregas publicadas, projetos em desenvolvimento e a
              direcao tecnica que usamos para construir presenca digital e produto com padrao profissional.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Landing pages objetivas para captacao",
              "Sistemas internos e operacionais",
              "Plataformas com CRM, agenda e fluxo comercial",
              "Infraestrutura moderna usada pelas maiores empresas do setor",
            ].map((item, index) => (
              <Reveal
                key={item}
                delay={250 + index * 80}
                variant="scale"
                className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-6 text-slate-300"
              >
                {item}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          delay={180}
          variant="right"
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-2.5 shadow-[0_28px_80px_rgba(2,6,23,0.26)] backdrop-blur-xl sm:p-3"
        >
          <Image
            src="/portfolio-showcase.png"
            alt="Vitrine visual de projetos da Zen Time Pro"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full rounded-[1.45rem] object-cover"
          />
        </Reveal>
      </section>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:mt-20 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Stack e infraestrutura</p>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Tecnologias amplamente utilizadas pelas maiores empresas do mercado.</h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-300">
              Trabalhamos com ferramentas modernas e consolidadas para entregar performance,
              confiabilidade, escalabilidade e operacao consistente.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech, index) => (
            <Reveal
              key={tech.name}
              delay={index * 70}
              variant="scale"
              className={`rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,17,32,0.84),rgba(8,17,32,0.68)),radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] ${tech.accent} p-4 shadow-[0_14px_34px_rgba(2,6,23,0.18)] sm:p-5`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.05] sm:h-14 sm:w-14">
                  <Image
                    src={tech.icon}
                    alt={`Logo ${tech.name}`}
                    width={40}
                    height={40}
                    className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-white">{tech.name}</p>
                  <p className="text-sm leading-6 text-slate-300">{tech.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <section className="mt-14 space-y-8 sm:mt-20">
        <Reveal className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Projetos publicados</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Entregas ja online</h2>
        </Reveal>

        <div className="grid gap-6">
          {deliveredProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 100}
              as="article"
              className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:p-8 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <Reveal
                delay={100}
                variant="left"
                className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#081120]/70 p-2.5 sm:p-3"
              >
                <Image
                  src={project.image}
                  alt={`Representacao visual do projeto ${project.title}`}
                  width={1536}
                  height={1024}
                  className="h-full min-h-[220px] w-full rounded-[1.2rem] object-cover sm:min-h-[260px]"
                />
              </Reveal>

              <Reveal delay={160} variant="right" className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                    {project.status}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{project.segment}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{project.summary}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 p-4 sm:p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Entrega</p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">{project.result}</p>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(37,99,235,0.38)] sm:w-auto"
                >
                  Acessar projeto
                </a>
              </Reveal>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-14 space-y-8 sm:mt-20">
        <Reveal className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Em desenvolvimento</p>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Projetos em andamento</h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-300">
            Uma vitrine do tipo de produto e operacao que estamos estruturando neste momento para diferentes cenarios.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          {inProgressProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 90}
              variant="up"
              as="article"
              className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] shadow-[0_20px_60px_rgba(2,6,23,0.18)] backdrop-blur-xl"
            >
              <div className="h-40 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_40%),linear-gradient(135deg,rgba(8,17,32,0.96),rgba(15,23,42,0.85))]" />
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-200">
                    Em desenvolvimento
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{project.category}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal
        as="section"
        className="mt-14 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl sm:mt-20 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Seu projeto aqui</p>
            <h2 className="max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
              Se voce quer entrar para esse portfolio com uma entrega profissional, podemos comecar.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Estruturamos desde landing pages objetivas ate sistemas e operacoes comerciais mais completas.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
            <Link
              href="/contato"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 sm:min-w-[220px] sm:w-auto"
            >
              Solicitar projeto
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20portfolio%20da%20Zen%20Time%20Pro%20e%20quero%20falar%20sobre%20um%20projeto."
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
