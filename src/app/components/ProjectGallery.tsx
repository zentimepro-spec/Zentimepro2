"use client";

import Image from "next/image";
import { useState } from "react";

export const portfolioItems = [
  {
    id: "foncare", number: "01", name: "Foncare", category: "Site institucional",
    tagline: "Presença digital feita para facilitar o primeiro contato.",
    description: "Projeto institucional com comunicação objetiva e acesso rápido às informações do serviço.",
    url: "https://www.foncare.com.br",
    image: "/portfolio-foncare.png",
    access: "public",
    tools: ["Site institucional", "Responsivo", "Contato"],
  },
  {
    id: "zentable", number: "02", name: "Zentable", category: "Produto SaaS",
    tagline: "Software com identidade e propósito.",
    description: "Conheça a apresentação pública do produto digital Zentable, parte do ecossistema Zen.",
    url: "https://www.zentable.com.br",
    image: "",
    access: "public",
    tools: ["SaaS", "Produto web", "Experiência digital"],
  },
  {
    id: "musas", number: "03", name: "Promo das Musas", category: "Plataforma de ofertas",
    tagline: "Uma vitrine pensada para descobrir ofertas.",
    description: "Experiência de navegação para encontrar promoções e acessar as lojas parceiras.",
    url: "https://promodasmusas.vercel.app",
    image: "",
    access: "public",
    tools: ["Vitrine digital", "Ofertas", "Integração com lojas"],
  },
  {
    id: "tfa", number: "04", name: "TFA Operacional", category: "Sistema operacional",
    tagline: "Tecnologia aplicada aos fluxos de uma agência.",
    description: "Central digital de operações para atividades do setor de viagens. Determinadas telas podem exigir autenticação.",
    url: "https://tfa-operacional.vercel.app",
    image: "",
    access: "restricted",
    tools: ["Sistemas web", "Operações", "Gestão"],
  },
] as const;

type Device = "desktop" | "mobile";

export function ProjectGallery() {
  const [active, setActive] = useState<(typeof portfolioItems)[number]["id"]>("foncare");
  const [device, setDevice] = useState<Device>("desktop");
  const project = portfolioItems.find(item => item.id === active)!;
  const frameKey = project.id + ":" + device;

  return <div className="studio-gallery">
    <div className="studio-gallery-tabs" role="tablist" aria-label="Selecionar projeto">
      {portfolioItems.map(project => <button key={project.id} type="button" role="tab" id={"tab-" + project.id} aria-selected={active === project.id} aria-controls="studio-project-detail" className={active === project.id ? "is-active" : ""} onClick={() => setActive(project.id)}>
        <span>{project.number}</span><strong>{project.name}</strong><small>{project.category}</small><span aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div className="studio-gallery-detail" role="tabpanel" id="studio-project-detail" aria-labelledby={"tab-" + active} key={active}>
      <div className="studio-gallery-detail-header"><span>WORKS / {project.number} — {project.category}</span><span>PUBLICAÇÃO EXTERNA ↗</span></div>
      <div className="studio-gallery-stage">
        <div className="studio-gallery-device-switch" role="group" aria-label="Visualização do projeto">
          <button type="button" aria-pressed={device==="desktop"} className={device==="desktop"?"is-active":""} onClick={()=>setDevice("desktop")}>Desktop</button>
          <button type="button" aria-pressed={device==="mobile"} className={device==="mobile"?"is-active":""} onClick={()=>setDevice("mobile")}>Mobile</button>
        </div>
        <div className={"studio-gallery-frame" + (device === "mobile" ? " is-mobile" : "")}>
          <div className="studio-gallery-browser-bar"><i/><i/><i/><span>{project.url}</span></div>
          {project.access === "public" ? (
            <div className="studio-gallery-viewport">
              {project.image && device==="desktop" ? <Image src={project.image} alt={"Captura do site " + project.name} width={1500} height={1000} className="studio-gallery-screenshot"/> : null}
              {(!project.image || device === "mobile") ? <iframe key={frameKey} src={project.url} title={"Visualização pública de " + project.name} loading="lazy" sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin"/> : null}
            </div>
          ) : (
            <div className="studio-gallery-private"><span className="studio-gallery-private-icon">◈</span><h3>Projeto com acesso restrito</h3><p>Não exibimos páginas internas, dados operacionais ou informações de terceiros. Conheça a apresentação pública no link abaixo.</p></div>
          )}
        </div>
        <p className="studio-gallery-notice">{project.image && device === "desktop" ? "Captura de tela incluída no repositório." : project.access === "public" ? "Visualização ao vivo do endereço público. Alguns sites podem bloquear incorporação; use o link para abrir o original." : "Visualização interna não disponibilizada por privacidade."}</p>
      </div>
      <div className="studio-gallery-summary">
        <div><span className="studio-overline"><span className="studio-overline-index">/CASE</span>{project.category}</span><h3>{project.tagline}</h3><p>{project.description}</p><div className="studio-chip-row">{project.tools.map(t=><span className="studio-chip" key={t}>{t}</span>)}</div></div>
        <div className="studio-gallery-summary-actions">
          <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="Visitar" className="studio-primary-btn">Abrir projeto real ↗</a>
          <button type="button" data-zen-launcher data-cursor="Conversar" className="studio-ghost-btn">Quero algo parecido ↗</button>
        </div>
      </div>
    </div>
  </div>;
}
