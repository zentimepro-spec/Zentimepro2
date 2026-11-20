"use client";

import { useMemo, useState } from "react";
import { zenWhatsAppLink } from "@/lib/zen-knowledge";

const plans = [
  { id: "promo", label: "Black Friday", name: "Landing Page Simples — promoção", price: 297, details: "Campanha sujeita à elegibilidade, disponibilidade e confirmação comercial.", badge: "CAMPANHA" },
  { id: "simples", label: "Essencial", name: "Landing Page Simples", price: 499, details: "Presença digital objetiva com apresentação, SEO inicial e botão de contato.", badge: "PLANO REGULAR" },
  { id: "completa", label: "Completa", name: "Landing Page Completa", price: 799, details: "Projeto com estrutura ampliada e painel CRM para acompanhar leads, conforme escopo.", badge: "PLANO REGULAR" },
  { id: "personalizado", label: "Sob medida", name: "Sistema web ou solução personalizada", price: null, details: "Desenvolvimento e integrações conforme requisitos do seu negócio.", badge: "ORÇAMENTO" },
] as const;

const extras = ["Domínio personalizado", "Hospedagem", "Integração externa", "Painel CRM adicional", "Mais páginas", "Manutenção mensal"] as const;

export function PricingConfigurator() {
  const [plan, setPlan] = useState<(typeof plans)[number]["id"]>("promo");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [business, setBusiness] = useState("");
  const [objective, setObjective] = useState("");
  const active = plans.find(item => item.id === plan)!;

  const message = useMemo(() => [
    "Olá, Zen Time Pro! Montei meu briefing no configurador do site.",
    "Plano escolhido: " + active.name,
    "Preço publicado de referência: " + (active.price === null ? "Sob consulta" : "R$ " + active.price),
    "Opcionais para avaliação: " + (selectedExtras.join(", ") || "Nenhum informado"),
    "Empresa/segmento: " + (business.trim() || "A definir"),
    "Objetivo: " + (objective.trim() || "Quero orientação comercial"),
    "Entendo que valores, domínio, hospedagem, elegibilidade de campanha e escopo precisam de confirmação na proposta.",
  ].join("\n"), [active, selectedExtras, business, objective]);

  function toggle(extra: string) {
    setSelectedExtras(current => current.includes(extra) ? current.filter(x => x !== extra) : [...current, extra]);
  }

  return <div className="studio-pricing-config">
    <div className="studio-pricing-options">
      <p className="studio-overline"><span className="studio-overline-index">01 /</span> ESCOLHA A BASE</p>
      <h3>Por onde começamos?</h3>
      <div className="studio-pricing-plans">
        {plans.map(item=><button type="button" key={item.id} aria-pressed={plan === item.id} className={plan === item.id ? "is-active" : ""} onClick={() => setPlan(item.id)}>
          <span className="studio-plan-category">{item.badge}</span>
          <strong>{item.label}</strong>
          <span>{item.price === null ? "Sob consulta" : "R$ " + item.price.toLocaleString("pt-BR")}</span>
        </button>)}
      </div>
      <p className="studio-overline"><span className="studio-overline-index">02 /</span> PERSONALIZE SEU PEDIDO</p>
      <h3>O que mais você precisa?</h3>
      <p className="studio-pricing-note">Os itens abaixo são solicitações adicionais ou aspectos a confirmar. Nenhum custo extra foi estimado.</p>
      <div className="studio-extra-options">{extras.map(item=><label key={item}><input type="checkbox" checked={selectedExtras.includes(item)} onChange={() => toggle(item)}/><span>{item}</span><span>+</span></label>)}</div>
      <div className="studio-pricing-fields">
        <label>Seu segmento <input value={business} maxLength={100} onChange={e=>setBusiness(e.target.value)} placeholder="Ex.: clínica, estética, loja…" /></label>
        <label>Principal objetivo <textarea rows={3} value={objective} maxLength={800} onChange={e=>setObjective(e.target.value)} placeholder="O que deseja resolver com o projeto?" /></label>
      </div>
    </div>
    <aside className="studio-pricing-summary">
      <p className="studio-overline"><span className="studio-overline-index">/PROPOSTA</span> RESUMO INTERATIVO</p>
      <div className="studio-pricing-summary-glow" aria-hidden="true">✳</div>
      <h3>{active.name}</h3>
      <p>{active.details}</p>
      <span className="studio-pricing-summary-label">PREÇO PUBLICADO DE REFERÊNCIA</span>
      <strong className="studio-pricing-total">{active.price === null ? "Sob consulta" : <><small>R$</small> {active.price}</>}</strong>
      <p className="studio-pricing-fineprint">Valor base divulgado, não cotação final. Domínio, hospedagem, opcionais, escopo e vigência da promoção precisam ser confirmados em proposta. Sistemas personalizados não têm preço fixo.</p>
      {selectedExtras.length ? <div className="studio-pricing-added"><span>ITENS A AVALIAR</span>{selectedExtras.map(s=><p key={s}>+ {s}</p>)}</div> : null}
      <a href={zenWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="studio-primary-btn" data-cursor="Solicitar">Enviar briefing para orçamento ↗</a>
      <button type="button" data-zen-launcher className="studio-ghost-btn">Conversar com Zen ✳</button>
      <span className="studio-pricing-privacy">Nenhum dado é enviado até você confirmar o envio pelo WhatsApp.</span>
    </aside>
  </div>;
}
