import type { Metadata } from "next";
import Link from "next/link";

import { StudioHero, StudioSection, StudioCTA } from "../components/StudioShell";
import { ServiceLab } from "../components/ServiceExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Criação de sites, landing pages, CRM e sistemas web",
  description: "Explore as soluções da Zen Time Pro: sites profissionais, landing pages para conversão, CRM comercial e sistemas web personalizados.",
  path: "/servicos",
});

const services = [
  {
    title: "Sites profissionais", code: "01", desc: "Projetos que traduzem a identidade da marca em uma experiência digital clara, rápida e responsiva.",
    href: "/servicos/criacao-de-sites-em-sao-paulo", points: ["Sites institucionais", "Portfólios", "SEO técnico inicial"],
  },
  {
    title: "Landing pages", code: "02", desc: "Experiências pensadas para campanhas, serviços e captação de oportunidades.",
    href: "/servicos/landing-pages", points: ["Páginas de conversão", "WhatsApp", "Campanhas"],
  },
  {
    title: "CRM comercial", code: "03", desc: "Organize leads, etapas e informações essenciais para um acompanhamento melhor.",
    href: "/servicos/crm-comercial", points: ["Funil de vendas", "Histórico", "Gestão de contatos"],
  },
  {
    title: "Sistemas & SaaS", code: "04", desc: "Desenvolvimento de soluções sob medida para agendas, operação, painéis e processos.",
    href: "/servicos/sistemas-web", points: ["Sistemas web", "Agenda", "Dashboards"],
  },
];

const solutions = [
  { href:"/servicos/landing-page-com-whatsapp",title:"Landing page com WhatsApp",label:"CAPTAÇÃO DIRETA" },
  { href:"/servicos/sistema-de-agenda-para-profissionais",title:"Sistema de agenda",label:"ORGANIZAÇÃO" },
  { href:"/servicos/criacao-de-sites-em-sao-paulo",title:"Criação de sites em São Paulo",label:"PRESENÇA DIGITAL" },
];

export default function ServicesPage() {
  return <main className="studio-page">
    <StudioHero index="01" eyebrow="SOLUÇÕES DIGITAIS" title="O que sua ideia" accent="pode se tornar." description="Cada desafio é uma oportunidade de criar uma experiência melhor. Explore nossos serviços e descubra como transformar presença, captação e operação em vantagem para seu negócio.">
      <a href="#laboratorio" className="studio-primary-btn">Experimentar soluções ↓</a>
      <Link href="/portfolio" className="studio-ghost-btn">Ver projetos reais ↗</Link>
    </StudioHero>

    <StudioSection id="laboratorio" number="01" label="LABORATÓRIO" title="Não imagine. Experimente." description="Navegue pelas soluções e veja demonstrações conceituais interativas.">
      <ServiceLab />
    </StudioSection>

    <StudioSection number="02" label="NOSSAS ESPECIALIDADES" title="Tecnologia na medida da sua ambição." description="Projetos personalizados, construídos com atenção aos objetivos do negócio.">
      <div className="studio-services-catalog">
        {services.map(service => <Link key={service.code} href={service.href} className="studio-service-row" data-cursor="Explorar">
          <span>{service.code} / SERVIÇO</span>
          <div><h3>{service.title}</h3><p>{service.desc}</p><div className="studio-chip-row">{service.points.map(p=><span className="studio-chip" key={p}>{p}</span>)}</div></div>
          <strong aria-hidden="true">↗</strong>
        </Link>)}
      </div>
    </StudioSection>

    <StudioSection number="03" label="SOLUÇÕES MAIS ESPECÍFICAS" title="Para cada necessidade, um caminho." description="Páginas especializadas para quem já sabe qual problema deseja resolver.">
      <div className="studio-feature-grid">
        {solutions.map((s,i)=><Link key={s.href} className="studio-feature studio-feature-link" href={s.href} data-cursor="Ver solução"><span className="studio-feature-index">0{i+1} / {s.label}</span><h3>{s.title}</h3><p>Conheça detalhes, benefícios e uma demonstração relacionada.</p><span className="studio-feature-action">Explorar ↗</span></Link>)}
      </div>
    </StudioSection>
    <StudioCTA title="Sua empresa merece algo que ainda não viu." description="Conte o que precisa resolver e o Zen pode orientar sobre o próximo passo." />
  </main>;
}
