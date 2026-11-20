/**
 * Fonte pública de conhecimento para o Zen.
 * Somente informações verificadas no catálogo comercial e em projetos autorizados.
 * Sem informações privadas, dados de clientes ou credenciais.
 */
export type ZenLink = { label: string; href: string };
export type ZenReply = {
  message: string;
  links: ZenLink[];
  suggestions: string[];
  mode: "catalog" | "ai";
  topic?: string;
};

export type ZenKnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  content: string;
  links: ZenLink[];
  prompts: string[];
};

export const ZEN_CONTACT = {
  whatsapp: "5511991650950",
  email: "zentimepro@gmail.com",
  website: "https://zentimepro.com.br",
} as const;

export const ZEN_KNOWLEDGE: ZenKnowledgeEntry[] = [
  {
    id: "institucional",
    title: "Criação de sites institucionais",
    keywords: ["site", "sites", "institucional", "empresa", "página", "pagina", "design", "seo", "responsivo"],
    content: "A Zen Time Pro desenvolve sites institucionais personalizados e responsivos, com foco em apresentação profissional, performance, SEO técnico inicial e contato comercial. Cada projeto é definido por escopo; não prometa prazo ou resultado de posicionamento no Google.",
    links: [{ label: "Conhecer serviços", href: "/servicos" }, { label: "Projetos publicados", href: "/portfolio" }],
    prompts: ["Quanto custa um site?", "Quero ver projetos", "Como funciona a contratação?"],
  },
  {
    id: "landing",
    title: "Landing pages e campanhas",
    keywords: ["landing", "landing page", "captacao", "captação", "campanha", "conversão", "conversao", "leads"],
    content: "Landing pages são páginas focadas em apresentar uma oferta e facilitar a conversão do visitante em contato. A Zen Time Pro oferece Landing Page Simples (preço regular publicado R$ 499) e Landing Page Completa (preço regular publicado R$ 799); o escopo exato é confirmado na proposta.",
    links: [{ label: "Landing pages", href: "/servicos/landing-pages" }, { label: "Ver preços", href: "/precos" }],
    prompts: ["Qual a diferença entre os planos?", "A promoção de R$ 297 vale?", "Quero contratar"],
  },
  {
    id: "promocao",
    title: "Condição de Black Friday",
    keywords: ["black", "black friday", "promoção", "promocao", "297", "desconto", "oferta"],
    content: "Existe uma oferta anunciada de Black Friday de landing page simples por R$ 297 + domínio contratado à parte. É condição promocional para projetos elegíveis, sujeita à disponibilidade, escopo e confirmação comercial. Não afirmar validade além da campanha nem prometer hospedagem gratuita.",
    links: [{ label: "Consultar oferta", href: "/precos" }, { label: "Falar com a equipe", href: "/contato" }],
    prompts: ["O que está incluído?", "Quero consultar a oferta", "Como posso contratar?"],
  },
  {
    id: "precos",
    title: "Preços e planos",
    keywords: ["preço", "preco", "quanto custa", "valor", "orcamento", "orçamento", "planos", "pagamento", "manutencao", "manutenção"],
    content: "Preços regulares publicados: Landing Page Simples R$ 499; Landing Page Completa R$ 799; sistemas internos sob consulta; manutenção mensal R$ 150. O preço promocional Black Friday é R$ 297 + domínio para landing page simples elegível. Confirmar em proposta o custo de domínio, hospedagem, integrações, alterações extras e validade promocional. Não inventar novos valores ou condições.",
    links: [{ label: "Planos e condições", href: "/precos" }, { label: "Solicitar orçamento", href: "/contato" }],
    prompts: ["Qual plano é para mim?", "Tem preço de sistema?", "Como pedir uma proposta?"],
  },
  {
    id: "crm",
    title: "CRM comercial e gestão de leads",
    keywords: ["crm", "pipeline", "funil", "lead", "leads", "comercial", "vendas", "clientes", "contatos", "automação", "automacao"],
    content: "A Zen Time Pro desenvolve soluções de CRM comercial para acompanhar leads, etapas do funil, histórico e acompanhamento de oportunidades. Recursos específicos, integrações e preço devem ser confirmados na proposta; não afirmar funcionalidades não verificadas.",
    links: [{ label: "CRM comercial", href: "/servicos/crm-comercial" }, { label: "Solicitar demonstração", href: "/contato" }],
    prompts: ["Como funciona um CRM?", "Vocês integram com WhatsApp?", "Quero uma demonstração"],
  },
  {
    id: "sistemas",
    title: "Sistemas web e SaaS sob medida",
    keywords: ["sistema", "sistemas", "app", "aplicativo", "saas", "dashboard", "painel", "agenda", "agendamento", "plataforma", "software"],
    content: "A Zen Time Pro cria sistemas web personalizados, dashboards, soluções de agenda e organização operacional. Os projetos são definidos conforme regras, integrações, segurança e complexidade; preço é sob consulta.",
    links: [{ label: "Sistemas web", href: "/servicos/sistemas-web" }, { label: "Sistema de agenda", href: "/servicos/sistema-de-agenda-para-profissionais" }],
    prompts: ["Preciso de um sistema de agenda", "Vocês fazem SaaS?", "Quanto custa um sistema?"],
  },
  {
    id: "foncare",
    title: "Projeto Foncare",
    keywords: ["foncare", "clinica", "clínica", "saúde", "saude", "portfolio", "portfólio", "trabalho"],
    content: "O site público Foncare é um projeto apresentado no portfólio da Zen Time Pro. A vitrine mostra uma experiência institucional com foco em comunicação clara e contato. Não afirmar resultados ou métricas de conversão não comprovadas.",
    links: [{ label: "Estudo de caso", href: "/portfolio#foncare" }, { label: "Abrir site publicado", href: "https://www.foncare.com.br" }],
    prompts: ["Mostre outro projeto", "Quero um site como esse"],
  },
  {
    id: "zentable",
    title: "Zentable — produto SaaS",
    keywords: ["zentable", "saas", "agenda", "agendamento", "portfólio", "portfolio"],
    content: "Zentable é um produto SaaS do ecossistema da Zen Time Pro. Há um site público em www.zentable.com.br. Disponibilidade, funcionalidades e planos devem ser confirmados no próprio produto; não inventar lançamento ou recursos.",
    links: [{ label: "Estudo de caso", href: "/portfolio#zentable" }, { label: "Visitar Zentable", href: "https://www.zentable.com.br" }],
    prompts: ["Mostre outros projetos", "Posso criar meu SaaS?"],
  },
  {
    id: "musas",
    title: "Promo das Musas — plataforma de ofertas",
    keywords: ["promo das musas", "musas", "ofertas", "promoções", "promocoes", "ecommerce", "loja", "shopping"],
    content: "Promo das Musas é uma experiência digital de vitrine de ofertas com acesso a lojas e promoções. Projeto público em promodasmusas.vercel.app.",
    links: [{ label: "Estudo de caso", href: "/portfolio#musas" }, { label: "Visitar plataforma", href: "https://promodasmusas.vercel.app" }],
    prompts: ["Quero uma vitrine de produtos", "Mostre outros projetos"],
  },
  {
    id: "tfa",
    title: "TFA Operacional — sistema web",
    keywords: ["tfa", "turismo", "agencia", "agência", "viagens", "operacional"],
    content: "TFA Operacional é um projeto de sistema web para atividades operacionais de uma agência de viagens. A aplicação está em tfa-operacional.vercel.app e algumas telas podem exigir autenticação; dados internos não são públicos.",
    links: [{ label: "Estudo de caso", href: "/portfolio#tfa" }, { label: "Abrir aplicação", href: "https://tfa-operacional.vercel.app" }],
    prompts: ["Vocês criam sistemas internos?", "Quero um projeto parecido"],
  },
  {
    id: "processo",
    title: "Etapas de contratação",
    keywords: ["como funciona", "contratar", "prazo", "processo", "etapas", "proposta", "comecar", "começar", "reunião", "reuniao"],
    content: "O fluxo de trabalho é: diagnóstico inicial, definição do escopo e proposta, planejamento visual, desenvolvimento, revisão e publicação. Prazos, entregáveis e pagamento são confirmados em proposta individual.",
    links: [{ label: "Sobre a Zen Time Pro", href: "/sobre" }, { label: "Iniciar projeto", href: "/contato" }],
    prompts: ["Quero começar agora", "Vocês fazem site personalizado?"],
  },
  {
    id: "whatsapp",
    title: "Contato e localização",
    keywords: ["contato", "whatsapp", "telefone", "email", "e-mail", "endereco", "endereço", "localização", "localizacao", "são paulo", "sao paulo"],
    content: "A Zen Time Pro atende empresas em São Paulo e em todo o Brasil. WhatsApp +55 (11) 99165-0950; e-mail zentimepro@gmail.com. Não informar endereço físico que não foi disponibilizado no site.",
    links: [{ label: "Página de contato", href: "/contato" }, { label: "Conversar no WhatsApp", href: "https://wa.me/5511991650950" }],
    prompts: ["Quero solicitar orçamento", "Quais serviços vocês fazem?"],
  },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function findZenKnowledge(question: string, page = "/", count = 3): ZenKnowledgeEntry[] {
  const text = normalize(question).slice(0, 600);
  if (!text) return [ZEN_KNOWLEDGE[0], ZEN_KNOWLEDGE[3]];
  const scored = ZEN_KNOWLEDGE.map((entry) => {
    const title = normalize(entry.title);
    let score = 0;
    for (const keyword of entry.keywords) {
      const normalized = normalize(keyword);
      if (text.includes(normalized)) score += Math.max(3, normalized.length / 3);
    }
    if (text.includes(normalize(entry.id))) score += 4;
    if (text.length >= 4 && title.includes(text)) score += 4;
    if (page.startsWith("/precos") && entry.id === "precos") score += 0.75;
    if (page.startsWith("/portfolio") && ["foncare", "zentable", "musas", "tfa"].includes(entry.id)) score += 0.35;
    return { entry, score };
  }).sort((a, b) => b.score - a.score);
  const relevant = scored.filter((item) => item.score > 0).slice(0, count).map((item) => item.entry);
  return relevant.length ? relevant : [ZEN_KNOWLEDGE.find((e) => e.id === "processo")!, ZEN_KNOWLEDGE.find((e) => e.id === "institucional")!];
}

export function zenCatalogReply(question: string, page = "/"): ZenReply {
  const relevant = findZenKnowledge(question, page);
  const first = relevant[0];
  const neutral = !question.trim() || !first.keywords.some((keyword) => normalize(question).includes(normalize(keyword)));
  const message = neutral
    ? "Olá! Sou o Zen, guia digital da Zen Time Pro. Posso explicar nossos serviços, mostrar trabalhos reais e ajudar você a escolher uma solução. O que gostaria de conhecer?"
    : first.content;
  return {
    message,
    links: first.links.slice(0, 3),
    suggestions: (neutral ? ["Quais serviços vocês fazem?", "Quanto custa um site?", "Mostre os projetos"] : first.prompts).slice(0, 3),
    mode: "catalog",
    topic: first.id,
  };
}

export function zenWhatsAppLink(message: string) {
  return "https://wa.me/" + ZEN_CONTACT.whatsapp + "?text=" + encodeURIComponent(message);
}
