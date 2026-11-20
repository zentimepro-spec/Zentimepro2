"use client";

import Link from "next/link";
import { useState } from "react";

const labItems = [
  {
    id: "sites", number: "01", label: "Sites & presença", title: "O site que posiciona sua marca.",
    intro: "Identidade visual, experiência responsiva e um primeiro contato que transmite autoridade.",
    href: "/servicos/criacao-de-sites-em-sao-paulo",
    modules: ["Design personalizado", "SEO técnico", "Responsividade"],
  },
  {
    id: "landing", number: "02", label: "Landing pages", title: "Toda visita é uma oportunidade.",
    intro: "Páginas focadas em uma oferta clara e no caminho mais simples para o visitante entrar em contato.",
    href: "/servicos/landing-pages",
    modules: ["Campanhas", "WhatsApp", "Conversão"],
  },
  {
    id: "crm", number: "03", label: "CRM comercial", title: "Do primeiro contato à próxima venda.",
    intro: "Acompanhe oportunidades, mantenha contexto e organize o relacionamento com cada lead.",
    href: "/servicos/crm-comercial",
    modules: ["Pipeline", "Leads", "Acompanhamento"],
  },
  {
    id: "sistemas", number: "04", label: "Sistemas web", title: "A operação trabalha com você.",
    intro: "Fluxos, painéis e aplicações construídos para se adaptar às necessidades reais da empresa.",
    href: "/servicos/sistemas-web",
    modules: ["Agendas", "Dashboards", "Automações"],
  },
] as const;

type LabKey = (typeof labItems)[number]["id"];

export function LabPreview({ type }: { type: LabKey }) {
  if (type === "crm") return (
    <div className="studio-lab-screen studio-crm-demo">
      <div className="studio-screen-bar"><b>zen<span>CRM.</span></b><span>PAINEL DEMONSTRATIVO</span><span>● LIVE DEMO</span></div>
      <h3>Pipeline de oportunidades</h3><p>Dados ilustrativos para demonstrar a interface.</p>
      <div className="studio-pipeline">
        {[
          ["Novo contato", ["Empresa Alpha", "Ateliê Aurora"]],
          ["Em conversa", ["Studio Horizonte", "Clínica Exemplo"]],
          ["Proposta", ["Projeto Digital"]],
        ].map(([label, contacts]) => <div key={label as string} className="studio-pipe-column">
          <strong>{label as string}</strong>{(contacts as string[]).map(name => <div key={name} className="studio-pipe-lead"><span className="studio-pipe-dot" />{name}<i>↗</i></div>)}
        </div>)}
      </div>
      <div className="studio-lab-screen-footer"><span>GESTÃO COMERCIAL</span><span>DEMONSTRAÇÃO / NÃO CONECTADA A DADOS REAIS</span></div>
    </div>
  );

  if (type === "sistemas") return <div className="studio-lab-screen studio-system-demo">
    <div className="studio-screen-bar"><b>ZEN<span>OPS</span></b><span>VISÃO GERAL</span><span>DEMO</span></div>
    <h3>Organize tudo em um lugar.</h3><p>Uma prévia fictícia de um painel operacional sob medida.</p>
    <div className="studio-dashboard">
      <div><small>ATENDIMENTOS</small><strong>24</strong><span>Exemplo ilustrativo</span></div>
      <div><small>TAREFAS</small><strong>08</strong><span>Exemplo ilustrativo</span></div>
      <div><small>PROJETOS</small><strong>05</strong><span>Exemplo ilustrativo</span></div>
    </div>
    <div className="studio-calendar-bars">{[32,63,46,85,58,73,42,92,56,75,45,81].map((height,i)=><span key={i} style={{height:height + "%"}}/>)}</div>
    <div className="studio-lab-screen-footer"><span>WORKFLOW CONTROL</span><span>DEMONSTRAÇÃO</span></div>
  </div>;

  if (type === "landing") return <div className="studio-lab-screen studio-landing-demo">
    <div className="studio-screen-bar"><b>CONVERT<span>.</span></b><span>SOLUÇÕES</span><span>CONTATO</span></div>
    <div className="studio-landing-demo-inner">
      <div><span className="studio-demo-kicker">EXPERIÊNCIAS QUE CONVERTEM</span><h3>Seu próximo cliente está a um clique.</h3><p>Uma mensagem clara, uma oferta e um convite para conversar.</p><span className="studio-demo-fake-btn">Começar agora ↗</span></div>
      <div className="studio-landing-graphic" aria-hidden="true"><span/><span/><span/></div>
    </div>
    <div className="studio-lab-screen-footer"><span>LANDING PAGE DEMO</span><span>PRÉVIA CONCEITUAL</span></div>
  </div>;

  return <div className="studio-lab-screen studio-sites-demo">
    <div className="studio-screen-bar"><b>atelier<span>.</span></b><span>O ESTÚDIO</span><span>CONTATO ↗</span></div>
    <div className="studio-sites-demo-inner">
      <div><span className="studio-demo-kicker">IDENTIDADE DIGITAL PREMIUM</span><h3>Marcas que deixam sua marca.</h3><p>Presença visual forte. Experiência que dá vontade de descobrir.</p><span className="studio-demo-fake-btn">Conhecer o estúdio ↗</span></div>
      <div className="studio-sites-graphic" aria-hidden="true"><i/><i/></div>
    </div>
    <div className="studio-lab-screen-footer"><span>DESIGN DIGITAL</span><span>PRÉVIA CONCEITUAL</span></div>
  </div>;
}

export function ServiceLab() {
  const [selected, setSelected] = useState<LabKey>("sites");
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const current = labItems.find(item => item.id === selected)!;

  return <div className="studio-lab">
    <div className="studio-lab-sidebar">
      <p className="studio-lab-kicker"><span className="zen-online-dot"/> LABORATÓRIO DE SOLUÇÕES</p>
      <h3>Explore o que podemos criar.</h3>
      <div className="studio-lab-list">
        {labItems.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} className={selected === item.id ? "is-active" : ""} onClick={() => setSelected(item.id)}>
          <span>{item.number}</span><strong>{item.label}</strong><span aria-hidden="true">↗</span>
        </button>)}
      </div>
      <div className="studio-lab-selected" aria-live="polite"><h4>{current.title}</h4><p>{current.intro}</p><div className="studio-chip-row">{current.modules.map(m=><span className="studio-chip" key={m}>{m}</span>)}</div>
        <Link href={current.href}>Conhecer solução ↗</Link>
      </div>
    </div>
    <div className="studio-lab-stage">
      <div className="studio-lab-stage-top"><span><i/>LIVE DESIGN EXPERIENCE</span><div role="group" aria-label="Dispositivo"><button type="button" aria-pressed={view==="desktop"} onClick={()=>setView("desktop")} className={view==="desktop" ? "is-active" : ""}>Desktop</button><button type="button" aria-pressed={view==="mobile"} onClick={()=>setView("mobile")} className={view==="mobile" ? "is-active" : ""}>Mobile</button></div></div>
      <div className={"studio-lab-display" + (view === "mobile" ? " is-mobile" : "")} aria-live="polite"><LabPreview type={selected}/></div>
      <p>Protótipo visual ilustrativo. Os projetos finais são personalizados conforme escopo.</p>
    </div>
  </div>;
}

const detailOptions: Record<string, { title:string; tabs:[string,string,string]; descriptions:[string,string,string] }> = {
  "landing-pages": {
    title:"Qual resultado você busca?",
    tabs:["Apresentar negócio","Captar contatos","Divulgar campanha"],
    descriptions:["Uma landing page institucional apresenta a empresa e facilita contatos.","Uma estrutura com oferta, benefícios e CTA para acompanhar oportunidades.","Uma página focada em uma campanha específica, com mensagem e objetivo claros."],
  },
  "crm-comercial": {
    title:"Explore as etapas do relacionamento",
    tabs:["Novo lead","Em negociação","Proposta"],
    descriptions:["Centralize o contato e a origem de cada oportunidade.","Registre o contexto e mantenha os próximos passos organizados.","Acompanhe propostas e etapas sem depender de planilhas dispersas."],
  },
  "sistemas-web": {
    title:"Qual processo precisa evoluir?",
    tabs:["Agenda","Gestão interna","Indicadores"],
    descriptions:["Organize horários, atendimentos e rotinas de agendamento.","Centralize tarefas e regras operacionais em um sistema adaptado ao negócio.","Visualize dados e atividades em dashboards adequados ao seu fluxo."],
  },
  "criacao-de-sites-em-sao-paulo": {
    title:"O que seu site deve transmitir?",
    tabs:["Credibilidade","Serviços","Contato fácil"],
    descriptions:["Uma identidade clara ajuda a criar uma primeira impressão profissional.","Organize serviços e diferenciais para o visitante encontrar o que precisa.","Disponibilize canais de contato acessíveis e compatíveis com celulares."],
  },
  "landing-page-com-whatsapp": {
    title:"Escolha um objetivo para seu WhatsApp",
    tabs:["Pedir orçamento","Agendar visita","Tirar dúvida"],
    descriptions:["O botão pode abrir uma conversa com uma mensagem inicial personalizada.","O visitante pode chegar ao atendimento informando que deseja agendar.","Uma chamada direta elimina etapas para perguntas rápidas sobre o serviço."],
  },
  "sistema-de-agenda-para-profissionais": {
    title:"Como seria seu agendamento?",
    tabs:["Escolher serviço","Selecionar horário","Confirmar"],
    descriptions:["O cliente encontra os serviços disponíveis em uma tela clara.","Uma agenda pode mostrar janelas disponíveis conforme as regras do negócio.","O registro permite confirmar informações e organizar os próximos passos."],
  },
};

export function ServiceDetailDemo({ slug }: { slug: string }) {
  const data = detailOptions[slug] || detailOptions["landing-pages"];
  const [index, setIndex] = useState(0);
  return <section className="studio-detail-demo" aria-label="Demonstração interativa do serviço">
    <div className="studio-detail-demo-left">
      <p className="studio-overline"><span className="studio-overline-index">/DEMO</span>INTERAÇÃO</p>
      <h2>{data.title}</h2>
      <p>Selecione uma situação para descobrir como essa experiência pode funcionar em seu negócio.</p>
      <div role="group" aria-label="Opções da demonstração" className="studio-detail-tabs">
        {data.tabs.map((tab,i)=><button key={tab} type="button" aria-pressed={index===i} className={index===i?"is-active":""} onClick={()=>setIndex(i)}><span>0{i+1}</span>{tab} ↗</button>)}
      </div>
    </div>
    <div className="studio-detail-demo-right" aria-live="polite">
      <span className="studio-detail-deco">0{index + 1} / 03</span>
      <div className="studio-detail-demo-orbit" aria-hidden="true"><span/><span/><span/></div>
      <h3>{data.tabs[index]}</h3><p>{data.descriptions[index]}</p>
      <button data-zen-launcher type="button" data-cursor="Conversar">Quero uma solução assim ↗</button>
      <small>Demonstração conceitual, sem ligação com dados reais.</small>
    </div>
  </section>;
}
