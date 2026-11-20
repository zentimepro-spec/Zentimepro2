"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { DigitalCore } from "./DigitalCore";

const services = [
  {
    number: "01",
    name: "Sites profissionais",
    description: "Uma presença digital com personalidade, autoridade e uma experiência que conquista desde o primeiro acesso.",
    tags: ["UI/UX", "Responsivo", "SEO"],
    symbol: "↗",
  },
  {
    number: "02",
    name: "Landing pages",
    description: "Páginas objetivas, rápidas e visualmente marcantes, construídas para transformar interesse em oportunidade.",
    tags: ["Conversão", "Performance", "Campanhas"],
    symbol: "◎",
  },
  {
    number: "03",
    name: "CRM & automações",
    description: "Da primeira conversa ao acompanhamento comercial. Menos tarefas manuais, mais clareza sobre os leads.",
    tags: ["Funil", "Integrações", "Gestão"],
    symbol: "⌘",
  },
  {
    number: "04",
    name: "Sistemas web & SaaS",
    description: "Produtos digitais sob medida para organizar processos e criar novas possibilidades de crescimento.",
    tags: ["Web Apps", "Cloud", "SaaS"],
    symbol: "◈",
  },
] as const;

const projects = [
  {
    name: "Foncare",
    category: "Site institucional",
    description: "Uma presença digital focada em clareza de informação e acesso rápido ao atendimento.",
    url: "https://www.foncare.com.br",
    number: "01",
    theme: "foncare",
    image: "/portfolio-foncare.png",
  },
  {
    name: "Zentable",
    category: "Produto SaaS",
    description: "Solução digital para organização de agendas e operações em uma experiência centralizada.",
    url: "https://www.zentable.com.br",
    number: "02",
    theme: "zentable",
    image: null,
  },
  {
    name: "Promo das Musas",
    category: "Plataforma de ofertas",
    description: "Vitrine digital voltada à descoberta de promoções e ao acesso direto às ofertas.",
    url: "https://promodasmusas.vercel.app",
    number: "03",
    theme: "musas",
    image: null,
  },
  {
    name: "TFA Operacional",
    category: "Sistema web",
    description: "Central de operações desenvolvida para apoiar processos e atividades de uma agência de viagens.",
    url: "https://tfa-operacional.vercel.app",
    number: "04",
    theme: "tfa",
    image: null,
  },
] as const;

const industries = [
  {
    id: "saude",
    category: "Clínica & saúde",
    eyebrow: "ATENDIMENTO HUMANIZADO",
    headline: "Seu cuidado começa aqui.",
    description: "Uma experiência acolhedora para quem busca atenção, confiança e praticidade.",
    button: "Agendar atendimento",
    mini: "Cuidado para cada etapa.",
  },
  {
    id: "beleza",
    category: "Beleza & estética",
    eyebrow: "EXPERIÊNCIAS EXCLUSIVAS",
    headline: "A beleza em sua melhor versão.",
    description: "Seu espaço merece uma presença elegante, atual e inesquecível.",
    button: "Conhecer serviços",
    mini: "Sua essência em destaque.",
  },
  {
    id: "servicos",
    category: "Serviços & negócios",
    eyebrow: "SOLUÇÕES PROFISSIONAIS",
    headline: "Seu próximo nível começa agora.",
    description: "Apresente sua empresa com a confiança e a força que ela merece.",
    button: "Solicitar proposta",
    mini: "Sua empresa em movimento.",
  },
] as const;

type Industry = (typeof industries)[number];
type ServiceName = "Site profissional" | "Landing page" | "CRM / automações" | "Sistema personalizado";

const serviceOptions: ServiceName[] = [
  "Site profissional",
  "Landing page",
  "CRM / automações",
  "Sistema personalizado",
];

const whatsAppLink = (message: string) =>
  "https://wa.me/5511991650950?text=" + encodeURIComponent(message);

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="ztp-section-label">
      <span className="ztp-section-label-number">/{number}</span>
      <span>{children}</span>
    </p>
  );
}

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={"ztp-project-art ztp-project-art-" + project.theme}>
      <div className="ztp-project-window">
        <div className="ztp-project-window-top"><span /><span /><span /><i>zen / work</i></div>
        {project.image ? (
          <Image
            src={project.image}
            alt={"Prévia do projeto " + project.name}
            width={860}
            height={600}
            loading="lazy"
            className="ztp-project-real-image"
          />
        ) : (
          <div className="ztp-project-mock" aria-hidden="true">
            <span className="ztp-project-mock-brand">{project.name}</span>
            <div className="ztp-project-mock-display">
              <span className="ztp-project-mock-kicker">DESIGN × TECNOLOGIA</span>
              <strong>{project.name}</strong>
              <span className="ztp-project-mock-line" />
              <span className="ztp-project-mock-pill">Explorar projeto</span>
            </div>
            <div className="ztp-project-mock-footer"><span /><span /><span /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function SiteSimulator({ onContact }: { onContact: (message: string) => void }) {
  const [selected, setSelected] = useState<Industry>(industries[0]);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  return (
    <section id="laboratorio" className="ztp-section ztp-lab-section" data-reveal>
      <div className="ztp-lab-heading">
        <div>
          <SectionLabel number="03">LABORATÓRIO INTERATIVO</SectionLabel>
          <h2 className="ztp-heading">Não imagine.<br /><span>Experimente.</span></h2>
        </div>
        <p className="ztp-section-description">
          Escolha um segmento e descubra como sua marca poderia ganhar vida.
          Uma demonstração conceitual para inspirar seu próximo projeto.
        </p>
      </div>

      <div className="ztp-lab-layout">
        <div className="ztp-lab-controls">
          <div className="ztp-control-caption"><span className="ztp-live-dot" /> DEMONSTRAÇÃO INTERATIVA</div>
          <h3>Qual é a área do seu negócio?</h3>
          <div className="ztp-industry-options" role="group" aria-label="Escolha o segmento da demonstração">
            {industries.map((industry) => (
              <button
                type="button"
                key={industry.id}
                className={"ztp-industry-btn" + (selected.id === industry.id ? " is-active" : "")}
                onClick={() => setSelected(industry)}
                aria-pressed={selected.id === industry.id}
              >
                <span>{industry.category}</span><span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <p className="ztp-lab-note">A prévia é ilustrativa. Cada site real é projetado conforme a identidade e os objetivos da empresa.</p>
          <button
            className="ztp-inline-link"
            type="button"
            onClick={() => onContact("Olá! Testei o laboratório interativo da Zen Time Pro para o segmento " + selected.category + " e gostaria de solicitar um projeto semelhante.")}
          >
            Quero um projeto assim <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="ztp-preview-area">
          <div className="ztp-preview-toolbar">
            <span>LIVE PREVIEW <span className="ztp-live-dot" /></span>
            <div role="group" aria-label="Visualização da demonstração">
              <button type="button" aria-pressed={view === "desktop"} className={view === "desktop" ? "is-active" : ""} onClick={() => setView("desktop")}>Desktop</button>
              <button type="button" aria-pressed={view === "mobile"} className={view === "mobile" ? "is-active" : ""} onClick={() => setView("mobile")}>Mobile</button>
            </div>
          </div>
          <div className={"ztp-preview-frame" + (view === "mobile" ? " is-mobile" : "")}>
            <div className={"ztp-preview-browser ztp-demo-" + selected.id} aria-live="polite">
              <div className="ztp-demo-topbar">
                <span className="ztp-demo-logo">studio<span>.</span></span>
                <span className="ztp-demo-nav">Início &nbsp; Serviços &nbsp; Contato</span>
                <span className="ztp-demo-menu">☰</span>
              </div>
              <div className="ztp-demo-content">
                <span className="ztp-demo-eyebrow">{selected.eyebrow}</span>
                <h4>{selected.headline}</h4>
                <p>{selected.description}</p>
                <span className="ztp-demo-cta">{selected.button} ↗</span>
              </div>
              <div className="ztp-demo-visual" aria-hidden="true">
                <span className="ztp-demo-shape ztp-demo-shape-a" />
                <span className="ztp-demo-shape ztp-demo-shape-b" />
                <span className="ztp-demo-floating-text">{selected.mini}</span>
              </div>
              <span className="ztp-demo-bottom">01 / EXPERIÊNCIAS DIGITAIS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [service, setService] = useState<ServiceName>("Site profissional");
  const [business, setBusiness] = useState("");
  const [objective, setObjective] = useState("");
  const [step, setStep] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const message = [
    "Olá, Zen Time Pro! Gostaria de conversar sobre um projeto.",
    "Serviço: " + service,
    "Empresa/segmento: " + (business.trim() || "Não informado"),
    "Objetivo: " + (objective.trim() || "Gostaria de orientação para definir o escopo."),
    "Origem: consultor digital do site.",
  ].join("\n");

  return (
    <div className="ztp-dialog-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="ztp-dialog" role="dialog" aria-modal="true" aria-labelledby="ztp-dialog-title">
        <div className="ztp-dialog-topbar">
          <div className="ztp-assistant-identity">
            <span className="ztp-assistant-avatar">✳</span>
            <span><strong>Consultor Zen</strong><small>Pré-atendimento digital · guiado</small></span>
          </div>
          <button ref={closeRef} type="button" className="ztp-close-button" aria-label="Fechar consultor" onClick={onClose}>×</button>
        </div>
        <div className="ztp-dialog-body">
          <div className="ztp-dialog-progress" aria-label={"Etapa " + (step + 1) + " de 3"}>
            {[0, 1, 2].map((index) => <span key={index} className={index <= step ? "is-active" : ""} />)}
          </div>
          {step === 0 ? (
            <>
              <p className="ztp-chat-bubble">Olá! Que bom ter você aqui. Vamos descobrir qual solução combina com seu negócio?</p>
              <h2 id="ztp-dialog-title">O que você precisa criar?</h2>
              <div className="ztp-chat-options">
                {serviceOptions.map((option) => (
                  <button type="button" key={option} aria-pressed={service === option} className={service === option ? "is-active" : ""} onClick={() => setService(option)}>{option} <span aria-hidden="true">↗</span></button>
                ))}
              </div>
            </>
          ) : step === 1 ? (
            <>
              <p className="ztp-chat-bubble">Excelente! Um projeto de {service.toLowerCase()} pode seguir caminhos diferentes. Conte só mais um pouco.</p>
              <h2 id="ztp-dialog-title">Sobre seu negócio</h2>
              <label className="ztp-chat-label">Nome ou segmento da empresa
                <input value={business} onChange={(event) => setBusiness(event.target.value)} maxLength={90} placeholder="Ex.: clínica, escritório, loja..." />
              </label>
              <label className="ztp-chat-label">O que você gostaria de melhorar?
                <textarea value={objective} onChange={(event) => setObjective(event.target.value)} maxLength={800} rows={4} placeholder="Ex.: atrair clientes, vender online, organizar agendamentos..." />
              </label>
            </>
          ) : (
            <>
              <p className="ztp-chat-bubble">Perfeito. Organizei as informações para facilitar sua conversa com nossa equipe.</p>
              <h2 id="ztp-dialog-title">Seu briefing está pronto.</h2>
              <div className="ztp-briefing-summary">
                <p><span>SERVIÇO</span><strong>{service}</strong></p>
                <p><span>NEGÓCIO</span><strong>{business.trim() || "A definir"}</strong></p>
                <p><span>OBJETIVO</span><strong>{objective.trim() || "Orientação inicial"}</strong></p>
              </div>
              <p className="ztp-chat-disclaimer">Você escolhe se deseja enviar estas informações pelo WhatsApp. Nada é enviado automaticamente.</p>
            </>
          )}
          <div className="ztp-dialog-actions">
            {step > 0 ? <button type="button" className="ztp-secondary-button" onClick={() => setStep(step - 1)}>Voltar</button> : null}
            {step < 2 ? (
              <button type="button" className="ztp-primary-button" onClick={() => setStep(step + 1)}>Continuar <span aria-hidden="true">↗</span></button>
            ) : (
              <a className="ztp-primary-button" href={whatsAppLink(message)} target="_blank" rel="noopener noreferrer" onClick={onClose}>Conversar no WhatsApp ↗</a>
            )}
          </div>
        </div>
        <p className="ztp-dialog-footer">Pré-atendimento guiado. Propostas e valores são confirmados pela equipe.</p>
      </section>
    </div>
  );
}

export function ImmersiveHome() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -32px 0px" });
    targets.forEach((target) => observer.observe(target));
    root.classList.add("ztp-motion-ready");
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandsOpen((current) => !current);
      }
      if (event.key === "Escape") setCommandsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAssistant = () => setAssistantOpen(false);
  const showAssistant = () => setAssistantOpen(true);

  return (
    <main ref={mainRef} className={"ztp-home" + (!motionAllowed ? " ztp-reduced-motion" : "")}>
      <div className="ztp-ambient ztp-ambient-one" aria-hidden="true" />
      <div className="ztp-ambient ztp-ambient-two" aria-hidden="true" />
      <section className="ztp-hero" aria-labelledby="ztp-hero-title">
        <div className="ztp-hero-grid" aria-hidden="true" />
        <div className="ztp-hero-copy">
          <p className="ztp-eyebrow"><span className="ztp-live-dot" /> ESTÚDIO DE EXPERIÊNCIAS DIGITAIS <span className="ztp-eyebrow-year">/ 2026</span></p>
          <h1 id="ztp-hero-title">
            O futuro<br />
            <span className="ztp-hero-outline">não espera.</span><br />
            <span className="ztp-hero-accent">Nós criamos.</span>
          </h1>
          <p className="ztp-hero-description">
            Sites, experiências digitais, CRM e sistemas web para marcas que querem ir além do convencional.
            Tecnologia que impressiona. Estratégia que gera oportunidades.
          </p>
          <div className="ztp-hero-actions">
            <button type="button" onClick={showAssistant} className="ztp-primary-button ztp-hero-main-button">Iniciar meu projeto <span aria-hidden="true">↗</span></button>
            <a href="#projetos" className="ztp-outline-button">Explorar projetos <span aria-hidden="true">↓</span></a>
          </div>
          <div className="ztp-hero-proof">
            <div><strong>01 /</strong><span>Design que se destaca</span></div>
            <div><strong>02 /</strong><span>Tecnologia com propósito</span></div>
            <div><strong>03 /</strong><span>Negócios em movimento</span></div>
          </div>
        </div>
        <div className="ztp-hero-visual">
          <DigitalCore />
          <div className="ztp-floating-chip ztp-floating-chip-one"><span className="ztp-live-dot" /> DIGITAL EXPERIENCES</div>
          <div className="ztp-floating-chip ztp-floating-chip-two">[ MADE TO EVOLVE ]</div>
        </div>
        <a className="ztp-hero-scroll" href="#manifesto"><span className="ztp-scroll-line" /> SCROLL TO EXPLORE</a>
        <div className="ztp-hero-side-label" aria-hidden="true">ZEN TIME PRO — DIGITAL STUDIO</div>
      </section>

      <div className="ztp-marquee" aria-label="Design, tecnologia, experiências e inovação">
        <div className="ztp-marquee-track" aria-hidden="true">
          <span>DESIGN SEM LIMITES ✳ TECNOLOGIA COM PROPÓSITO ✳ EXPERIÊNCIAS QUE CONVERTEM ✳ </span>
          <span>DESIGN SEM LIMITES ✳ TECNOLOGIA COM PROPÓSITO ✳ EXPERIÊNCIAS QUE CONVERTEM ✳ </span>
        </div>
      </div>

      <section id="manifesto" className="ztp-section ztp-manifesto" data-reveal>
        <SectionLabel number="00">NOSSO MANIFESTO</SectionLabel>
        <p className="ztp-manifesto-text">
          A internet está cheia de sites iguais.<br />
          <span>Nós existimos para criar o que</span><br />
          <em>ninguém esquece.</em>
        </p>
        <div className="ztp-manifesto-bottom">
          <p>Combinamos estética, desenvolvimento e visão de negócios para transformar ideias em experiências digitais relevantes.</p>
          <div className="ztp-manifesto-mark" aria-hidden="true">Z<span>✳</span></div>
        </div>
      </section>

      <section id="servicos" className="ztp-section ztp-services" data-reveal>
        <div className="ztp-section-head">
          <div><SectionLabel number="01">O QUE CRIAMOS</SectionLabel><h2 className="ztp-heading">Da ideia<br /><span>ao extraordinário.</span></h2></div>
          <p className="ztp-section-description">Cada projeto começa com uma pergunta: como tornar esta experiência mais clara, mais poderosa e mais memorável?</p>
        </div>
        <div className="ztp-services-grid">
          {services.map((service) => (
            <article className="ztp-service-card" key={service.number}>
              <div className="ztp-service-top"><span>{service.number} / SOLUÇÃO DIGITAL</span><span className="ztp-service-symbol" aria-hidden="true">{service.symbol}</span></div>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="ztp-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <Link href="/servicos" className="ztp-service-link" aria-label={"Saiba mais sobre " + service.name}>Conhecer solução <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section id="projetos" className="ztp-section ztp-work" data-reveal>
        <div className="ztp-section-head">
          <div><SectionLabel number="02">PROJETOS & PRODUTOS</SectionLabel><h2 className="ztp-heading">Nosso trabalho<br /><span>fala por nós.</span></h2></div>
          <p className="ztp-section-description">Conheça algumas experiências e produtos do nosso ecossistema. Clique para explorar os projetos publicados.</p>
        </div>
        <div className="ztp-project-grid">
          {projects.map((project) => (
            <a className="ztp-project-card" key={project.name} href={project.url} target="_blank" rel="noopener noreferrer">
              <ProjectPreview project={project} />
              <div className="ztp-project-info">
                <div><span>{project.number} / {project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                <span className="ztp-project-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
        <Link href="/portfolio" className="ztp-outline-button ztp-all-projects">Ver portfólio completo <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteSimulator onContact={(message) => window.open(whatsAppLink(message), "_blank", "noopener,noreferrer")} />

      <section id="processo" className="ztp-section ztp-process" data-reveal>
        <SectionLabel number="04">NOSSO PROCESSO</SectionLabel>
        <div className="ztp-section-head"><h2 className="ztp-heading">Um processo simples.<br /><span>Um resultado extraordinário.</span></h2><p className="ztp-section-description">Do primeiro contato à publicação, cada etapa aproxima sua empresa de uma presença digital mais forte.</p></div>
        <div className="ztp-process-grid">
          {[
            ["01", "Descobrir", "Entendemos o negócio, os objetivos e as oportunidades."],
            ["02", "Desenhar", "Transformamos estratégia em uma experiência visual única."],
            ["03", "Desenvolver", "Construímos a solução com tecnologia, velocidade e cuidado."],
            ["04", "Evoluir", "Publicamos e orientamos os próximos passos de melhoria."],
          ].map(([number, title, description]) => (
            <div className="ztp-process-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>
          ))}
        </div>
      </section>

      <section className="ztp-section ztp-offer-section" data-reveal>
        <div className="ztp-offer-glow" aria-hidden="true" />
        <div className="ztp-offer-grid">
          <div>
            <p className="ztp-offer-eyebrow">✳ EDIÇÃO BLACK FRIDAY</p>
            <h2>Sua próxima grande ideia merece sair do papel.</h2>
            <p>Converse com a Zen Time Pro sobre a condição promocional para landing pages simples elegíveis.</p>
            <button type="button" className="ztp-primary-button" onClick={showAssistant}>Quero aproveitar <span aria-hidden="true">↗</span></button>
          </div>
          <div className="ztp-offer-price"><span>OFERTA A PARTIR DE</span><strong><small>R$</small> 297</strong><p>Condição promocional sujeita a escopo e disponibilidade. Domínio e hospedagem devem ser confirmados na proposta.</p></div>
        </div>
      </section>

      <section className="ztp-section ztp-final-cta" data-reveal>
        <SectionLabel number="05">O PRÓXIMO PASSO</SectionLabel>
        <h2>O seu próximo projeto<br /><span>começa com uma conversa.</span></h2>
        <p>Existe uma maneira melhor de apresentar sua empresa ao mundo. Vamos construir a sua?</p>
        <div className="ztp-final-actions">
          <button type="button" className="ztp-primary-button" onClick={showAssistant}>Criar meu projeto <span aria-hidden="true">↗</span></button>
          <a href={whatsAppLink("Olá, Zen Time Pro! Acessei o site e gostaria de conversar sobre um projeto.")} target="_blank" rel="noopener noreferrer" className="ztp-outline-button">Falar no WhatsApp ↗</a>
        </div>
        <span className="ztp-final-giant" aria-hidden="true">ZENTIME</span>
      </section>

      <button className="ztp-assistant-fab" type="button" onClick={showAssistant} aria-label="Abrir consultor digital"><span>✳</span><span>Planeje seu projeto</span></button>
      <button className="ztp-command-trigger" type="button" onClick={() => setCommandsOpen(true)} aria-label="Abrir atalhos de navegação">⌘ K</button>
      <ConsultationDialog open={assistantOpen} onClose={closeAssistant} />
      {commandsOpen ? (
        <div className="ztp-dialog-backdrop" onPointerDown={(event) => { if (event.target === event.currentTarget) setCommandsOpen(false); }}>
          <div className="ztp-command-panel" role="dialog" aria-modal="true" aria-label="Navegação rápida">
            <div className="ztp-command-title">⌘ &nbsp; Navegação rápida <button type="button" aria-label="Fechar navegação rápida" onClick={() => setCommandsOpen(false)}>×</button></div>
            {[
              ["Explorar serviços", "#servicos"],
              ["Ver projetos", "#projetos"],
              ["Experimentar laboratório", "#laboratorio"],
              ["Conhecer processo", "#processo"],
              ["Contato", "/contato"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setCommandsOpen(false)}>{label} <span aria-hidden="true">↗</span></a>
            ))}
            <p>Atalho: Ctrl / ⌘ + K</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
