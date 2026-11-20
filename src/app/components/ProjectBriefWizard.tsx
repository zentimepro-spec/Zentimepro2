"use client";

import { useState, type FormEvent } from "react";
import { zenWhatsAppLink } from "@/lib/zen-knowledge";

type Brief = {
  service: string; goal: string; urgency: string; nome: string; empresa: string; telefone: string; email: string;
};

const starter: Brief = { service: "", goal: "", urgency: "Sem urgência definida", nome: "", empresa: "", telefone: "", email: "" };
const services = ["Site institucional", "Landing page", "CRM comercial", "Sistema web personalizado", "Ainda não sei"] as const;

export function ProjectBriefWizard() {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>(starter);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const update = (field: keyof Brief, value: string) => setBrief(current => ({ ...current, [field]: value }));
  const summary = [
    "Olá, Zen Time Pro! Montei um briefing pelo site.",
    "Serviço: " + (brief.service || "A definir"),
    "Objetivo: " + (brief.goal || "Quero orientação"),
    "Prioridade: " + brief.urgency,
    "Nome: " + brief.nome,
    "Empresa: " + brief.empresa,
    "Telefone: " + brief.telefone,
    "E-mail: " + brief.email,
  ].join("\n");

  const message = ["Origem: briefing interativo da Zen Time Pro", "Objetivo: " + brief.goal, "Prioridade: " + brief.urgency, "Serviço: " + brief.service].join("\n");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!brief.service || !brief.goal.trim() || !consent || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: brief.nome.trim(), empresa: brief.empresa.trim(), telefone: brief.telefone.trim(), email: brief.email.trim(), servico: brief.service, mensagem: message }),
      });
      if (!res.ok) throw new Error("Lead rejected");
      setStatus("done");
    } catch { setStatus("error"); }
  }

  if (status === "done") return <div className="studio-brief-success" role="status">
    <div className="studio-brief-complete-icon">✓</div><h3>Seu projeto já começou.</h3>
    <p>Seu briefing foi registrado e estará disponível para o retorno comercial. Obrigado pelo interesse!</p>
    <button className="studio-primary-btn" type="button" onClick={() => { setStatus("idle"); setStep(0); setBrief(starter); setConsent(false); }}>Criar outro briefing ↗</button>
  </div>;

  return <div className="studio-brief">
    <div className="studio-brief-top"><p className="studio-overline"><span className="studio-overline-index">/BRIEFING</span> EXPERIÊNCIA GUIADA</p><span>ETAPA 0{step + 1} / 03</span></div>
    <div className="studio-brief-progress" aria-label={"Etapa " + (step + 1) + " de 3"}>{[0,1,2].map(n=><span key={n} className={n<=step?"is-active":""}/>)}</div>
    {step === 0 ? <div className="studio-brief-step">
      <h3>O que vamos criar?</h3><p>Escolha o tipo de projeto. Se não souber, o Zen pode ajudar você a descobrir.</p>
      <div className="studio-brief-cards" role="group" aria-label="Tipo de projeto">
        {services.map((item,i)=><button type="button" aria-pressed={brief.service===item} className={brief.service===item?"is-active":""} key={item} onClick={()=>update("service",item)}><span>0{i+1}</span><strong>{item}</strong><span>↗</span></button>)}
      </div>
    </div> : step === 1 ? <div className="studio-brief-step">
      <h3>Qual é o seu objetivo?</h3><p>Compartilhe o desafio principal e a prioridade. Isso ajuda nossa equipe a preparar uma proposta mais útil.</p>
      <label className="studio-brief-field">Conte um pouco da sua ideia
        <textarea value={brief.goal} onChange={e=>update("goal",e.target.value)} rows={5} minLength={10} maxLength={2000} placeholder="Ex.: quero atrair clientes e apresentar os serviços da minha clínica…"/>
      </label>
      <div role="group" className="studio-brief-urgency"><span>Prioridade</span>{["Sem urgência definida", "Quero começar em breve", "Tenho um prazo específico"].map(value=><button type="button" key={value} aria-pressed={brief.urgency===value} className={brief.urgency===value?"is-active":""} onClick={()=>update("urgency",value)}>{value}</button>)}</div>
    </div> : <form className="studio-brief-step" onSubmit={(event)=>{void submit(event);}}>
      <h3>Quem podemos contatar?</h3><p>Esses dados serão enviados à equipe comercial da Zen Time Pro, não ao modelo de IA.</p>
      <div className="studio-brief-input-grid">
        {([
          ["nome","Seu nome","text","Nome completo",3],
          ["empresa","Empresa/negócio","text","Nome do negócio",2],
          ["telefone","WhatsApp","tel","(11) 99999-9999",8],
          ["email","E-mail","email","voce@empresa.com",5],
        ] as const).map(([key,label,type,placeholder,min])=><label className="studio-brief-field" key={key}>{label}<input required minLength={min} value={brief[key]} type={type} placeholder={placeholder} onChange={e=>update(key,e.target.value)} /></label>)}
      </div>
      <div className="studio-brief-summary"><span>RESUMO DO PROJETO</span><strong>{brief.service}</strong><p>{brief.goal}</p><small>{brief.urgency}</small></div>
      <label className="studio-brief-consent"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)}/> Concordo em fornecer estes dados para receber contato sobre meu pedido de orçamento.</label>
      {status==="error" ? <p className="studio-brief-error" role="alert">Não foi possível cadastrar agora. Você pode tentar novamente ou usar o WhatsApp.</p> : null}
      <div className="studio-brief-submit-actions"><button type="button" className="studio-ghost-btn" onClick={()=>setStep(1)}>Voltar</button><button className="studio-primary-btn" type="submit" disabled={!consent || status==="sending"}>{status==="sending"?"Enviando…":"Enviar ao comercial ↗"}</button></div>
      <a className="studio-brief-whatsapp" target="_blank" rel="noopener noreferrer" href={zenWhatsAppLink(summary)}>Ou continuar pelo WhatsApp ↗</a>
    </form>}
    {step < 2 ? <div className="studio-brief-bottom">
      {step > 0 ? <button type="button" className="studio-ghost-btn" onClick={()=>setStep(step-1)}>← Voltar</button> : <button type="button" data-zen-launcher className="studio-ghost-btn">Tirar dúvidas com Zen ✳</button>}
      <button className="studio-primary-btn" type="button" disabled={step===0?!brief.service:brief.goal.trim().length<10} onClick={()=>setStep(step+1)}>Continuar ↗</button>
    </div> : null}
  </div>;
}
