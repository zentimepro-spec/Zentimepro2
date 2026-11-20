import type { Metadata } from "next";

import { StudioHero, StudioSection, StudioCTA } from "../components/StudioShell";
import { PricingConfigurator } from "../components/PricingConfigurator";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Preços e configurador de sites, landing pages e sistemas",
  description: "Conheça os preços publicados da Zen Time Pro, consulte a oferta de Black Friday e monte um briefing para orçamento de sites, CRM e sistemas web.",
  path: "/precos",
});

export default function PricingPage() {
  return <main className="studio-page">
    <StudioHero index="03" eyebrow="INVESTIMENTO INTELIGENTE" title="Sua ideia merece" accent="um plano à altura." description="Valores claros onde já existe uma oferta definida e orçamento personalizado quando o projeto exige mais. Explore as possibilidades e organize seu pedido.">
      <a href="#configurador" className="studio-primary-btn">Montar meu projeto ↓</a>
    </StudioHero>
    <StudioSection id="configurador" number="01" label="CONFIGURADOR" title="Escolha o que faz sentido." description="Experimente combinações e prepare sua solicitação. Sem preços fictícios para funcionalidades adicionais.">
      <PricingConfigurator />
    </StudioSection>
    <StudioSection number="02" label="COMO FUNCIONA" title="Transparência do início à entrega." description="Uma proposta profissional começa com expectativas claras.">
      <div className="studio-feature-grid">
        <article className="studio-feature"><span className="studio-feature-index">01 / BRIEFING</span><h3>Entendemos a necessidade</h3><p>Conversamos sobre objetivos, referências, funcionalidades, integrações e conteúdo.</p></article>
        <article className="studio-feature"><span className="studio-feature-index">02 / PROPOSTA</span><h3>Definimos escopo e prazo</h3><p>Entregáveis, valores, domínio, hospedagem e condições são confirmados antes do desenvolvimento.</p></article>
        <article className="studio-feature"><span className="studio-feature-index">03 / EVOLUÇÃO</span><h3>Publicação e manutenção</h3><p>O plano regular de manutenção mensal é divulgado a R$ 150, sujeito ao escopo contratado.</p></article>
      </div>
      <p className="studio-pricing-disclaimer">Condição de Black Friday divulgada: landing page simples por R$ 297 + domínio à parte, para projetos elegíveis e mediante confirmação comercial. Preços regulares publicados: landing page simples R$ 499; completa R$ 799; manutenção R$ 150/mês; sistemas sob consulta.</p>
    </StudioSection>
    <StudioCTA title="Não sabe qual solução escolher?" description="O Zen pode ajudar você a entender os planos e montar o próximo passo." />
  </main>;
}
