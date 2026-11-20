import Link from "next/link";
import type { ReactNode } from "react";

type StudioHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  children?: ReactNode;
};

export function StudioHero({ index, eyebrow, title, accent, description, children }: StudioHeroProps) {
  return (
    <section className="studio-hero" aria-labelledby="studio-page-title">
      <div className="studio-hero-grid" aria-hidden="true" />
      <div className="studio-hero-inner">
        <div className="studio-overline"><span className="studio-overline-index">/{index}</span>{eyebrow}</div>
        <h1 id="studio-page-title">{title}<br/><span>{accent}</span></h1>
        <p>{description}</p>
        {children ? <div className="studio-hero-extra">{children}</div> : null}
      </div>
      <div className="studio-hero-decoration" aria-hidden="true">
        <div className="studio-orb"><span/><span/><span/></div>
        <span className="studio-hero-vertical">ZEN TIME PRO · DIGITAL EXPERIENCES · 2026</span>
      </div>
    </section>
  );
}

export function StudioSection({ number, label, title, description, children, id }: {
  number: string; label: string; title: string; description?: string; children: ReactNode; id?: string;
}) {
  return (
    <section id={id} className="studio-section">
      <div className="studio-section-heading">
        <div><p className="studio-overline"><span className="studio-overline-index">/{number}</span>{label}</p><h2>{title}</h2></div>
        {description ? <p className="studio-section-summary">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function StudioCTA({ title = "Seu próximo projeto começa aqui.", description = "Vamos transformar sua ideia em uma experiência digital.", action = "Iniciar meu projeto" }: {
  title?: string; description?: string; action?: string;
}) {
  return <section className="studio-bottom-cta">
    <div className="studio-bottom-orbit" aria-hidden="true" />
    <p className="studio-overline"><span className="studio-overline-index">/ZEN</span>O PRÓXIMO PASSO</p>
    <h2>{title}</h2><p>{description}</p>
    <div className="studio-bottom-actions">
      <button data-cursor="Conversar" type="button" className="studio-primary-btn" data-zen-launcher="true" aria-label="Conversar com o Zen sobre seu projeto">Conversar com Zen ↗</button>
      <Link href="/contato" className="studio-ghost-btn">{action} ↗</Link>
    </div>
  </section>;
}
