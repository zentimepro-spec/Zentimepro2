import type { Metadata } from "next";
import Link from "next/link";

import { StudioHero, StudioSection, StudioCTA } from "../components/StudioShell";
import { ProjectGallery } from "../components/ProjectGallery";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Portfólio de sites, plataformas e sistemas web",
  description: "Explore projetos reais da Zen Time Pro: Foncare, Zentable, Promo das Musas e TFA Operacional, com visualização desktop e mobile.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <main className="studio-page">
    <StudioHero index="02" eyebrow="EXPERIÊNCIAS REAIS" title="Construímos o que" accent="você pode explorar." description="Mais do que promessas: aqui estão projetos e produtos do nosso ecossistema. Selecione um trabalho, descubra seu contexto e acesse a aplicação publicada.">
      <a href="#galeria" className="studio-primary-btn">Explorar os projetos ↓</a>
    </StudioHero>

    <StudioSection id="galeria" number="01" label="GALERIA DIGITAL" title="Cada projeto tem sua história." description="Veja o trabalho publicado. As áreas privadas permanecem protegidas, e os exemplos demonstrativos são identificados.">
      <ProjectGallery />
    </StudioSection>

    <StudioSection number="02" label="COMO CRIAMOS" title="Design, desenvolvimento e operação." description="Cada experiência é definida a partir do problema que precisa resolver, e não de um modelo repetido.">
      <div className="studio-feature-grid">
        {[
          ["01", "Entender", "Conhecemos o contexto, o público e as prioridades do negócio."],
          ["02", "Desenhar", "Criamos a direção visual e organizamos as interações de maneira intuitiva."],
          ["03", "Entregar", "Desenvolvemos, revisamos e publicamos com foco em utilidade e clareza."],
        ].map(([num,title,desc])=><article className="studio-feature" key={num}><span className="studio-feature-index">{num} / ETAPA</span><h3>{title}</h3><p>{desc}</p></article>)}
      </div>
      <div className="studio-gallery-secondary-actions">
        <Link href="/servicos" className="studio-ghost-btn">Conhecer serviços ↗</Link>
        <Link href="/sobre" className="studio-ghost-btn">Sobre nosso processo ↗</Link>
      </div>
    </StudioSection>
    <StudioCTA title="Seu projeto pode ser nosso próximo destaque." description="Uma proposta feita para o seu negócio, com personalidade e tecnologia de verdade."/>
  </main>;
}
