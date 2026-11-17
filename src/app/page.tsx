import type { Metadata } from "next";
import Image from "next/image";
import {
  HeroStage,
  MobileOffer,
  MotionSection,
  ProjectShowcase,
  ProcessSteps,
  ZentableDemo,
} from "@/components/studio/StudioInteractions";
import { Arrow } from "@/components/studio/Arrow";
import styles from "@/components/studio/studio.module.css";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";
import { offerMessage, whatsappLink } from "@/lib/studio";

export const metadata: Metadata = createPageMetadata({
  title: "Black Friday | Site profissional ou landing page por R$ 297",
  description:
    "Black Friday da Zen Time Pro. Site profissional ou landing page por R$ 297, com botão para WhatsApp. Conheça os projetos da Zen Time Pro e o Zentable, nosso SaaS com lançamento em breve.",
  path: "/",
});

const questions = [
  {
    question: "O que está incluído nos R$ 297 da Black Friday?",
    answer:
      "O preço especial de Black Friday inclui a criação de um site institucional simples ou uma landing page para apresentar seu negócio, seus serviços e facilitar o contato pelo WhatsApp. Alinhamos o conteúdo e o escopo com você antes da contratação.",
  },
  {
    question: "Como ficam domínio e hospedagem?",
    answer:
      "Conversamos sobre o endereço e a hospedagem adequados ao seu projeto. As condições e os eventuais custos são informados na proposta, antes da contratação.",
  },
  {
    question: "O site funciona no celular?",
    answer:
      "Sim. O projeto é preparado para navegação no celular e no computador, com conteúdo legível e contato fácil pelo WhatsApp.",
  },
  {
    question: "Qual é o prazo e como funcionam as alterações?",
    answer:
      "O prazo, os materiais necessários e as rodadas de ajustes são combinados na proposta, de acordo com o escopo do projeto.",
  },
  {
    question: "Vocês também desenvolvem sistemas?",
    answer:
      "Sim. Desenvolvemos sistemas e automações sob medida. Esses projetos recebem uma proposta própria, conforme as necessidades da sua operação.",
  },
  {
    question: "Como conheço o Zentable?",
    answer:
      "Acesse zentable.com.br para conhecer a proposta da plataforma. Você também pode falar com a gente pelo WhatsApp sobre o lançamento e o uso no seu negócio.",
  },
];

export default function Home() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Black Friday — Criação de site institucional simples ou landing page",
    serviceType: "Criação de sites e landing pages",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: "BR",
    url: absoluteUrl("/"),
    offers: {
      "@type": "Offer",
      price: "297.00",
      priceCurrency: "BRL",
      url: absoluteUrl("/#oferta"),
    },
  };

  return (
    <main id="conteudo" className={styles.studio}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section id="inicio" className={styles.heroShell}>
        <div className={`${styles.hero} ${styles.container}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Sites · Landing pages · Sistemas</p>
            <h1>
              <span>Seu negócio.</span>
              <span>Em destaque.</span>
            </h1>
            <p className={styles.heroIntro}>
              Design que valoriza sua marca. Tecnologia que aproxima seu próximo
              cliente. Vamos criar sua presença digital?
            </p>
            <div className={styles.heroPrice}>
              <div>
                <span className={styles.blackFridayLabel}>Black Friday</span>
                <span>Site simples ou landing page por</span>
              </div>
              <strong>
                <small>R$</small> 297<span>,00</span>
              </strong>
            </div>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href={whatsappLink(offerMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero aproveitar a Black Friday <Arrow />
              </a>
              <a className={styles.textLink} href="#projetos">
                Explorar projetos <Arrow down />
              </a>
            </div>
            <p className={styles.heroFootnote}>
              Criação de site institucional simples ou landing page com botão
              para WhatsApp. Condições alinhadas na proposta.
            </p>
          </div>
          <HeroStage />
        </div>
        <div className={`${styles.heroBottom} ${styles.container}`}>
          <a href="#projetos">
            Continue explorando <Arrow down />
          </a>
          <span>Presença digital feita para o seu negócio</span>
        </div>
      </section>

      <div className={styles.trustStrip}>
        <div className={styles.container}>
          <span>Projetos que você pode conhecer</span>
          <a
            href="https://www.foncare.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Foncare <Arrow />
          </a>
          <a
            href="https://promodasmusas.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Promo das Musas <Arrow />
          </a>
          <a
            href="https://tfa-operacional.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TFA Viagens <Arrow />
          </a>
          <a href="#zentable">
            Zentable <Arrow down />
          </a>
        </div>
      </div>

      <MotionSection
        id="projetos"
        className={`${styles.section} ${styles.container}`}
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Nosso trabalho, na prática</p>
            <h2>
              Projetos que conectam
              <br />
              <span>design e tecnologia.</span>
            </h2>
          </div>
          <p>
            De sites institucionais a plataformas sob medida. Explore os
            projetos e conheça o que desenvolvemos.
          </p>
        </div>
        <ProjectShowcase />
        <p className={styles.portfolioNote}>
          Cada projeto tem seu próprio escopo. Converse com a gente sobre o que
          você precisa.
        </p>
      </MotionSection>

      <MotionSection id="oferta" className={styles.offerSection}>
        <div className={`${styles.container} ${styles.offerLayout}`}>
          <div>
            <p className={styles.eyebrow}>Black Friday Zen Time Pro</p>
            <h2>
              Seu site profissional.
              <br />
              <span>Agora por R$ 297.</span>
            </h2>
            <p>
              Apresente o que você faz, valorize seus serviços e facilite a
              conversa com quem quer contratar.
            </p>
            <ul className={styles.offerFeatures}>
              <li>Site institucional simples ou landing page</li>
              <li>Visual alinhado à sua marca</li>
              <li>Layout adaptado ao celular e ao computador</li>
              <li>Botão direto para o seu WhatsApp</li>
            </ul>
          </div>
          <div className={styles.offerCard}>
            <p>Preço especial de Black Friday</p>
            <div className={styles.offerValue}>
              <span>R$</span> 297<small>,00</small>
            </div>
            <p>Site institucional simples ou landing page.</p>
            <a
              className={styles.primaryButton}
              href={whatsappLink(offerMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Aproveitar a Black Friday <Arrow />
            </a>
            <small>
              Escopo, prazo, ajustes e condições de domínio e hospedagem
              alinhados na proposta.
            </small>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="zentable"
        className={`${styles.zentableSection} ${styles.container}`}
      >
        <div className={styles.zentableCopy}>
          <div className={styles.zentableBrand}>
            <Image
              src="/zentable-logo.webp"
              alt="Zentable"
              width={600}
              height={200}
              sizes="180px"
              className={styles.zentableLogo}
            />
            <span>Lançamento em breve</span>
          </div>
          <p className={styles.eyebrow}>Um produto da Zen Time Pro</p>
          <h2>
            Do próximo horário
            <br />
            <span>a uma rotina mais simples.</span>
          </h2>
          <p>
            Conheça o Zentable, nosso SaaS para organizar horários, clientes e
            equipe em um só lugar.
          </p>
          <ul>
            <li>Agenda de atendimentos</li>
            <li>Clientes e profissionais organizados</li>
            <li>Link para agendamento online</li>
          </ul>
          <div className={styles.zentableActions}>
            <a
              className={styles.darkButton}
              href="https://www.zentable.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o Zentable <Arrow />
            </a>
            <a
              className={styles.textLink}
              href={whatsappLink(
                "Olá! Quero saber mais sobre o lançamento do Zentable para o meu negócio.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero saber do lançamento <Arrow />
            </a>
          </div>
        </div>
        <ZentableDemo />
      </MotionSection>

      <MotionSection
        id="como-funciona"
        className={`${styles.section} ${styles.container}`}
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Da conversa à publicação</p>
            <h2>
              Você conta a ideia.
              <br />
              <span>A gente dá forma.</span>
            </h2>
          </div>
          <p>
            Um processo próximo, com as decisões do projeto combinadas desde o
            começo.
          </p>
        </div>
        <ProcessSteps />
      </MotionSection>

      <MotionSection className={`${styles.faqSection} ${styles.container}`}>
        <div>
          <p className={styles.eyebrow}>Antes de começar</p>
          <h2>
            Vamos esclarecer
            <br />
            <span>suas dúvidas.</span>
          </h2>
          <a
            className={styles.textLink}
            href={whatsappLink(
              "Olá, Douglas! Tenho uma dúvida sobre a criação do meu site.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conversar pelo WhatsApp <Arrow />
          </a>
        </div>
        <div className={styles.faqList}>
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </MotionSection>

      <section id="contato" className={styles.finalSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Vamos criar o seu?</p>
          <h2>
            O próximo projeto
            <br />
            pode ser <span>o seu.</span>
          </h2>
          <p>
            Black Friday. Seu site profissional ou landing page por R$ 297.
            <br />
            Conte sua ideia para a Zen Time Pro.
          </p>
          <a
            className={styles.primaryButton}
            href={whatsappLink(offerMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Aproveitar a Black Friday <Arrow />
          </a>
        </div>
      </section>
      <MobileOffer />
    </main>
  );
}
