"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";

import { ZenAvatar } from "./ZenAvatar";
import { zenCatalogReply, zenWhatsAppLink, type ZenReply } from "@/lib/zen-knowledge";

type ChatEntry = { role: "assistant" | "user"; message: string; reply?: ZenReply };
type LeadForm = { nome: string; empresa: string; telefone: string; email: string; servico: string; mensagem: string };

const defaults: LeadForm = { nome: "", empresa: "", telefone: "", email: "", servico: "", mensagem: "" };

const welcomeByRoute: Record<string, string> = {
  "/": "Olá! Sou o Zen. Posso ajudar você a escolher um serviço ou conhecer nossos projetos.",
  "/servicos": "Estou aqui para explicar nossos serviços e encontrar a solução ideal para o seu negócio.",
  "/portfolio": "Quer conhecer algum projeto real ou entender como criamos soluções como essas?",
  "/precos": "Posso explicar os valores publicados e a condição de Black Friday.",
  "/sobre": "Quer conhecer o jeito Zen Time Pro de criar experiências digitais?",
  "/contato": "Vamos organizar sua ideia e transformar isso em uma solicitação de projeto?",
};

export function ZenAssistant() {
  const pathname = usePathname() || "/";
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [lead, setLead] = useState<LeadForm>(defaults);
  const [consent, setConsent] = useState(false);
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const welcome = welcomeByRoute[pathname] || (pathname.startsWith("/servicos/")
    ? "Você está explorando uma solução da Zen Time Pro. Quer tirar uma dúvida ou solicitar uma proposta?"
    : welcomeByRoute["/"]);
  const context = zenCatalogReply("", pathname);

  const openZen = useCallback(() => { openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current; setOpen(true); }, []);
  const closeZen = useCallback(() => { setOpen(false); setLeadOpen(false); openerRef.current?.focus(); }, []);

  useEffect(() => {
    const onOpen = () => openZen();
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-zen-launcher]")) openZen();
    };
    window.addEventListener("zen:open", onOpen);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("zen:open", onOpen); document.removeEventListener("click", onClick); };
  }, [openZen]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => (leadOpen ? dialogRef.current?.querySelector<HTMLInputElement>("input[name=nome]") : inputRef.current)?.focus());
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); closeZen(); }
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),[tabindex="0"]');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [open, closeZen, leadOpen]);

  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }); }, [entries, busy]);

  async function ask(value: string) {
    const question = value.trim();
    if (!question || busy || question.length > 550) return;
    setDraft("");
    setLeadOpen(false);
    const history = entries.slice(-6).map((entry) => ({ role: entry.role, content: entry.message }));
    setEntries((old) => [...old, { role: "user", message: question }]);
    setBusy(true);
    try {
      const response = await fetch("/api/zen/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, page: pathname, history }),
      });
      if (!response.ok) throw new Error("Chat unavailable");
      const reply = await response.json() as ZenReply;
      if (typeof reply.message !== "string") throw new Error("Bad reply");
      setEntries((old) => [...old, { role: "assistant", message: reply.message, reply }]);
    } catch {
      const reply = zenCatalogReply(question, pathname);
      setEntries((old) => [...old, { role: "assistant", message: reply.message, reply }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || leadStatus === "sending") return;
    setLeadStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error("Lead not saved");
      setLeadStatus("saved");
      setLead(defaults);
    } catch {
      setLeadStatus("error");
    }
  }

  const latest = [...entries].reverse().find((entry) => entry.reply)?.reply || context;
  const options = entries.length ? latest.suggestions : ["Quais serviços vocês fazem?", "Quanto custa um site?", "Mostre os projetos"];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="zen-launcher"
        onClick={openZen}
        data-cursor="Conversar"
        aria-label="Conversar com o Zen, assistente da Zen Time Pro"
      >
        <ZenAvatar size={52} mood="happy" />
        <span className="zen-launcher-copy"><strong>Fale com o Zen</strong><small>Seu guia digital</small></span>
        <span className="zen-launcher-online" aria-hidden="true"/>
      </button>

      {open ? (
        <div className="zen-modal-layer" onPointerDown={(e) => { if (e.target === e.currentTarget) closeZen(); }}>
          <section className="zen-window" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <header className="zen-window-header">
              <ZenAvatar size={58} mood={busy ? "thinking" : "happy"} />
              <div className="zen-window-header-title">
                <h2 id={titleId}>ZEN <span>✳</span></h2>
                <p>Assistente digital · Zen Time Pro</p>
              </div>
              <button type="button" className="zen-window-close" aria-label="Fechar assistente" onClick={closeZen}>×</button>
            </header>

            <div className="zen-window-mode"><span className="zen-online-dot" /> {latest.mode === "ai" ? "Orientação com IA e catálogo oficial" : "Base de conhecimento Zen Time Pro"}<span>●</span></div>

            {!leadOpen ? (
              <>
                <div className="zen-messages" ref={messagesRef} role="log" aria-label="Conversa com Zen" aria-live="polite">
                  <div className="zen-chat-message zen-chat-assistant">
                    <ZenAvatar size={28} mood="idle" />
                    <p>{welcome}</p>
                  </div>
                  {entries.map((entry, index) => (
                    <div key={index} className={"zen-chat-message zen-chat-" + entry.role}>
                      {entry.role === "assistant" ? <ZenAvatar size={28} mood="talk" /> : null}
                      <div>
                        <p>{entry.message}</p>
                        {entry.reply?.links?.length ? (
                          <div className="zen-chat-links">
                            {entry.reply.links.map((item) => (
                              <a key={item.href} href={item.href} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} target={item.href.startsWith("http") ? "_blank" : undefined} onClick={() => { if (item.href.startsWith("/")) closeZen(); }}>{item.label} ↗</a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {busy ? <div className="zen-chat-message zen-chat-assistant"><ZenAvatar size={28} mood="thinking"/><p>Estou consultando as informações disponíveis…</p></div> : null}
                </div>
                <div className="zen-chat-options">
                  {options.map((suggestion) => <button key={suggestion} type="button" disabled={busy} onClick={() => void ask(suggestion)}>{suggestion} ↗</button>)}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); void ask(draft); }} className="zen-compose">
                  <input ref={inputRef} value={draft} maxLength={550} onChange={(e) => setDraft(e.target.value)} placeholder="Pergunte algo ao Zen…" aria-label="Mensagem ao assistente" />
                  <button type="submit" disabled={!draft.trim() || busy} aria-label="Enviar mensagem">↗</button>
                </form>
                <div className="zen-chat-actions">
                  <button type="button" onClick={() => { setLeadStatus("idle"); setLeadOpen(true); }}>✳ Quero um orçamento</button>
                  <a href={zenWhatsAppLink("Olá! Conheci o Zen no site e quero conversar sobre um projeto da Zen Time Pro.")} target="_blank" rel="noopener noreferrer">Falar com a equipe ↗</a>
                </div>
              </>
            ) : (
              <div className="zen-lead-body">
                {leadStatus === "saved" ? (
                  <div className="zen-lead-success" role="status">
                    <ZenAvatar size={90} mood="happy"/>
                    <h3>Recebemos seu projeto!</h3>
                    <p>Seus dados foram registrados para retorno da equipe comercial.</p>
                    <button type="button" onClick={() => { setLeadStatus("idle"); setLeadOpen(false); }}>Voltar à conversa</button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { void submitLead(e); }} className="zen-lead-form">
                    <button className="zen-back-link" type="button" onClick={() => setLeadOpen(false)}>← Voltar para a conversa</button>
                    <h3>Conte sobre seu projeto</h3>
                    <p>As informações são enviadas à equipe comercial, não ao modelo de IA.</p>
                    {([
                      ["nome", "Seu nome", "text", "Como podemos chamar você?"],
                      ["empresa", "Empresa ou negócio", "text", "Nome da empresa"],
                      ["telefone", "WhatsApp", "tel", "(11) 99999-9999"],
                      ["email", "E-mail", "email", "voce@empresa.com"],
                      ["servico", "Serviço desejado", "text", "Site, CRM, sistema…"],
                    ] as const).map(([key, label, type, placeholder]) => (
                      <label key={key}>{label}
                        <input name={key} type={type} required minLength={key === "nome" ? 3 : key === "telefone" ? 8 : 2} placeholder={placeholder} value={lead[key]} onChange={e => setLead((old) => ({ ...old, [key]: e.target.value }))}/>
                      </label>
                    ))}
                    <label>Qual seu objetivo?
                      <textarea required minLength={10} rows={3} placeholder="Conte um pouco da sua ideia e do que precisa." value={lead.mensagem} onChange={e => setLead(old => ({ ...old, mensagem: e.target.value }))} />
                    </label>
                    <label className="zen-consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} /> Autorizo o uso dos dados informados para contato sobre minha solicitação.</label>
                    {leadStatus === "error" ? <p role="alert" className="zen-lead-error">Não foi possível registrar agora. Verifique os dados ou fale pelo WhatsApp.</p> : null}
                    <button className="zen-lead-submit" type="submit" disabled={!consent || leadStatus === "sending"}>{leadStatus === "sending" ? "Enviando…" : "Enviar minha solicitação ↗"}</button>
                  </form>
                )}
              </div>
            )}
            <footer className="zen-window-footer">O Zen pode cometer erros. Valores e condições especiais são confirmados pela equipe.</footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
