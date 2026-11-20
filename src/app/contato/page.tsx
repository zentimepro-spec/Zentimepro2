import type { Metadata } from "next";
import Link from "next/link";

import { StudioHero, StudioSection } from "../components/StudioShell";
import { ProjectBriefWizard } from "../components/ProjectBriefWizard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Solicite seu projeto digital — contato Zen Time Pro",
  description: "Conte sua ideia para a Zen Time Pro e receba contato sobre sites, landing pages, CRM comercial e sistemas web. Briefing interativo.",
  path: "/contato",
});

export default function ContactPage() {
  return <main className="studio-page">
    <StudioHero index="05" eyebrow="VAMOS CRIAR?" title="Toda grande ideia" accent="começa aqui." description="Não precisa chegar com tudo pronto. Conte seu objetivo e nós ajudamos a transformar sua necessidade em um projeto com direção.">
      <a href="#briefing" className="studio-primary-btn">Começar briefing ↓</a>
      <button type="button" data-zen-launcher className="studio-ghost-btn">Perguntar ao Zen ✳</button>
    </StudioHero>
    <StudioSection id="briefing" number="01" label="SEU PROJETO" title="Comece uma conversa que faz sentido." description="Um caminho simples para organizar a necessidade e enviar as informações ao nosso comercial.">
      <ProjectBriefWizard />
    </StudioSection>
    <StudioSection number="02" label="OUTRAS FORMAS DE CONTATO" title="Prefere falar diretamente?" description="Escolha o canal de sua preferência. Estamos disponíveis para empresas em São Paulo e em todo o Brasil.">
      <div className="studio-contact-grid">
        <a className="studio-contact-option" href="https://wa.me/5511991650950?text=Ol%C3%A1%2C%20Zen%20Time%20Pro!%20Quero%20falar%20sobre%20um%20projeto." target="_blank" rel="noopener noreferrer"><span>01 / MENSAGEM</span><strong>WhatsApp</strong><p>Converse sobre seu projeto e esclareça dúvidas com a equipe.</p><i>↗</i></a>
        <a className="studio-contact-option" href="mailto:zentimepro@gmail.com"><span>02 / E-MAIL</span><strong>zentimepro@gmail.com</strong><p>Envie informações, referências e uma descrição do que precisa.</p><i>↗</i></a>
        <Link className="studio-contact-option" href="/precos#configurador"><span>03 / CONFIGURADOR</span><strong>Monte um orçamento</strong><p>Escolha uma solução e prepare sua solicitação sem adivinhar valores.</p><i>↗</i></Link>
      </div>
    </StudioSection>
  </main>;
}
