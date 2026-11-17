export const offerMessage =
  "Olá, Douglas! Quero aproveitar a oferta de Black Friday de site institucional simples ou landing page por R$ 297 para o meu negócio.";

export function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=5511991650950&text=${encodeURIComponent(message)}`;
}

export const projects = [
  {
    name: "Foncare",
    category: "Site institucional",
    description:
      "Uma apresentação acolhedora para conectar famílias aos serviços, às unidades e ao atendimento da clínica.",
    image: "/project-foncare.webp",
    url: "https://www.foncare.com.br",
    domain: "foncare.com.br",
    features: [
      "Apresentação dos serviços",
      "Unidades e contato",
      "Integração com WhatsApp",
    ],
  },
  {
    name: "Promo das Musas",
    category: "Portal de ofertas",
    description:
      "Ofertas, cupons e categorias em uma experiência de descoberta, com acesso às lojas e à comunidade no WhatsApp.",
    image: "/project-musas.webp",
    url: "https://promodasmusas.vercel.app",
    domain: "promodasmusas.vercel.app",
    features: ["Busca de produtos", "Categorias e cupons", "Favoritos"],
  },
  {
    name: "TFA Viagens Company",
    category: "Sistema para agência de viagens",
    description:
      "Central de Operações desenvolvida para a TFA, com uma área de acesso interno dedicada à equipe da agência.",
    image: "/project-tfa.webp",
    url: "https://tfa-operacional.vercel.app/",
    domain: "tfa-operacional.vercel.app",
    features: [
      "Plataforma operacional",
      "Acesso interno da equipe",
      "Projeto sob medida",
    ],
  },
  {
    name: "Zentable",
    category: "SaaS próprio · lançamento em breve",
    description:
      "Nossa plataforma para quem trabalha com hora marcada. Agenda, clientes e equipe em um só lugar.",
    image: "/project-zentable.webp",
    url: "https://www.zentable.com.br",
    domain: "zentable.com.br",
    features: [
      "Agenda de atendimentos",
      "Organização de clientes",
      "Agendamento online",
    ],
  },
] as const;
