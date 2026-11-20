import type { Metadata } from "next";
import Link from "next/link";

import { StudioHero, StudioSection, StudioCTA } from "../components/StudioShell";
import { FounderStory } from "../components/FounderStory";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre a Zen Time Pro — design e tecnologia com propósito",
  description: "Conheça Douglas Araujo, fundador da Zen Time Pro, seus objetivos e nossa visão sobre sites, CRM e desenvolvimento de soluções digitais.",
  path: "/sobre",
});

const steps = [
  { n:"01", title:"Entender antes de criar.", text:"Cada empresa possui desafios específicos. Começamos ouvindo, identificando objetivos e organizando prioridades." },
  { n:"02", title:"Transformar estratégia em experiência.", text:"A identidade visual, a navegação e os elementos interativos precisam trabalhar a favor da mensagem e dos resultados do projeto." },
  { n:"03", title:"Desenvolver com intenção.", text:"Tecnologia, acessibilidade, performance e clareza operacional orientam as decisões técnicas." },
  { n:"04", title:"Criar espaço para evoluir.", text:"Um bom produto digital permite melhorias e adaptação conforme o negócio amadurece." },
];

export default function AboutPage() {
  return <main className="studio-page studio-about">
    <StudioHero index="04" eyebrow="NOSSO MANIFESTO" title="Não fazemos apenas" accent="sites. Criamos futuros." description="A Zen Time Pro conecta visão de negócios, design e engenharia de software para criar experiências digitais com personalidade, utilidade e espaço para evoluir.">
      <a href="#filosofia" className="studio-primary-btn">Conheça nossa visão ↓</a>
    </StudioHero>

    <section className="studio-manifesto-panel" id="filosofia">
      <p className="studio-overline"><span className="studio-overline-index">/IDEOLOGIA</span> SOBRE A ZEN TIME PRO</p>
      <p className="studio-manifesto-big">Acreditamos que tecnologia é mais do que código.<br/><span>É uma nova forma de criar possibilidades.</span></p>
      <div className="studio-manifesto-caption"><span className="studio-manifesto-stamp">Z✳</span><p>Uma presença digital de verdade precisa transmitir valor, facilitar decisões e resolver problemas reais. Por isso, combinamos design marcante e soluções técnicas úteis.</p></div>
    </section>

    <FounderStory />

    <StudioSection number="01" label="NOSSA ESSÊNCIA" title="Ideias claras. Execução consistente." description="Uma empresa digital deve demonstrar competência tanto no que o visitante vê quanto na experiência que ele vive.">
      <div className="studio-feature-grid">
        <article className="studio-feature"><span className="studio-feature-index">01 / DESIGN</span><h3>Visual que comunica.</h3><p>Identidade, tipografia e interações que reforçam a confiança e a personalidade da marca.</p></article>
        <article className="studio-feature"><span className="studio-feature-index">02 / TECNOLOGIA</span><h3>Funcionalidade que importa.</h3><p>Sites, CRM e sistemas alinhados a objetivos e processos concretos, não somente a tendências.</p></article>
        <article className="studio-feature"><span className="studio-feature-index">03 / ESTRATÉGIA</span><h3>Um propósito em cada entrega.</h3><p>Estrutura para apresentar, captar oportunidades, organizar fluxos e abrir novas possibilidades.</p></article>
      </div>
    </StudioSection>

    <StudioSection number="02" label="NOSSO MÉTODO" title="Como uma ideia ganha vida." description="Uma sequência clara para transformar um desafio em experiência digital.">
      <div className="studio-about-timeline">
        {steps.map(step=><div className="studio-timeline-step" key={step.n}><span className="studio-timeline-index">{step.n}</span><h3>{step.title}</h3><p>{step.text}</p><span className="studio-timeline-node" aria-hidden="true"/></div>)}
      </div>
    </StudioSection>

    <StudioSection number="03" label="NOSSO ECOSSISTEMA" title="Experiência que se comprova." description="É no desenvolvimento e na evolução de projetos reais que transformamos nossa visão em soluções.">
      <div className="studio-about-projects">
        <Link href="/portfolio#galeria" className="studio-about-project-link"><span>01 / PORTFÓLIO</span><strong>Conheça projetos publicados</strong><i>↗</i></Link>
        <Link href="/servicos#laboratorio" className="studio-about-project-link"><span>02 / LABORATÓRIO</span><strong>Experimente soluções digitais</strong><i>↗</i></Link>
        <Link href="/precos#configurador" className="studio-about-project-link"><span>03 / COMEÇAR</span><strong>Monte seu próprio projeto</strong><i>↗</i></Link>
      </div>
    </StudioSection>
    <StudioCTA title="O próximo capítulo pode ser o seu." description="Seu negócio tem uma história. Vamos transformá-la em experiência digital."/>
  </main>;
}
