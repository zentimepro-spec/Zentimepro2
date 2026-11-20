import Image from "next/image";
import { zenWhatsAppLink } from "@/lib/zen-knowledge";

export function FounderStory({ compact = false }: { compact?: boolean }) {
  const whatsapp = zenWhatsAppLink(
    compact
      ? "Olá, Zen Time Pro! Conheci o fundador pela página de contato e gostaria de conversar sobre meu projeto."
      : "Olá, Zen Time Pro! Li sobre o fundador e gostaria de conversar sobre uma solução digital para meu negócio."
  );
  return (
    <section className={"studio-founder-section" + (compact ? " is-compact" : "")} aria-labelledby={compact ? "contact-founder-title" : "founder-title"}>
      <div className="studio-founder-portrait">
        <div className="studio-founder-photo">
          <Image src="/douglas-araujo-fundador.avif" alt="Retrato de Douglas Araujo, fundador da Zen Time Pro" width={300} height={605} sizes="(max-width:720px) 85vw, 330px" loading="lazy" unoptimized />
        </div>
        <div className="studio-founder-signature">
          <span>CONHEÇA O FUNDADOR</span>
          <strong>Douglas Araujo</strong>
          <small>Empreendedor · Gestor · Desenvolvedor</small>
        </div>
      </div>
      <div className="studio-founder-copy">
        <p className="studio-overline"><span className="studio-overline-index">/PESSOAS</span> POR TRÁS DA ZEN TIME PRO</p>
        <h2 id={compact ? "contact-founder-title" : "founder-title"}>Eu sou <span>Douglas Araujo.</span></h2>
        <p className="studio-founder-role">Fundador da Zen Time Pro</p>
        {compact ? (
          <>
            <p>Acredito que bons negócios merecem tecnologia à altura de suas ideias. Minha atuação reúne gestão, empreendedorismo e desenvolvimento de soluções digitais, sempre com foco nas necessidades de cada empresa.</p>
            <p>Meu objetivo é ajudar negócios a apresentar melhor seu trabalho, gerar oportunidades e organizar processos com sites e sistemas que realmente façam sentido. Quero entender seu desafio e encontrar o melhor caminho para começar.</p>
          </>
        ) : (
          <>
            <p>Sou empreendedor, gestor e desenvolvedor de soluções tecnológicas. Minha experiência com gestão e processos me mostrou que tecnologia só faz sentido quando resolve problemas reais. Foi dessa visão que nasceu a Zen Time Pro.</p>
            <p>Criei a empresa para aproximar estratégia, design e desenvolvimento, ajudando negócios a construir uma presença digital profissional e transformar ideias em ferramentas úteis para o dia a dia.</p>
            <p>Meu objetivo é tornar soluções digitais bem pensadas mais acessíveis, simplificar rotinas e criar experiências que possam evoluir junto com cada empresa. Para mim, um site não é apenas uma vitrine: é uma oportunidade de gerar confiança, abrir conversas e apoiar o crescimento de um negócio.</p>
            <div className="studio-founder-goals">
              <div><span>01 / PROPÓSITO</span><strong>Aproximar empresas da tecnologia.</strong></div>
              <div><span>02 / VISÃO</span><strong>Unir design, estratégia e utilidade.</strong></div>
              <div><span>03 / COMPROMISSO</span><strong>Construir para evoluir.</strong></div>
            </div>
          </>
        )}
        <div className="studio-founder-actions">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="studio-primary-btn">Conversar pelo WhatsApp ↗</a>
          <a className="studio-ghost-btn" href={compact ? "/sobre" : "/portfolio"}>{compact ? "Conheça minha história ↗" : "Conheça nossos projetos ↗"}</a>
        </div>
      </div>
    </section>
  );
}
