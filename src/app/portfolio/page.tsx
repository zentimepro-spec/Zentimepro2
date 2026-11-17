import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/studio/StudioInteractions";
import styles from "@/components/studio/studio.module.css";
import { createPageMetadata } from "@/lib/seo";
import { offerMessage, whatsappLink } from "@/lib/studio";

export const metadata: Metadata = createPageMetadata({
  title: "Portfólio de sites e sistemas web",
  description:
    "Conheça Foncare, Promo das Musas, a Central de Operações TFA e o Zentable. Projetos de sites e sistemas desenvolvidos pela Zen Time Pro.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main id="conteudo" className={styles.studio}>
      <section className={`${styles.section} ${styles.container}`}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Portfólio Zen Time Pro</p>
            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Projetos que você
              <br />
              pode explorar.
            </h1>
          </div>
          <p>
            Conheça os sites e sistemas que desenvolvemos, cada um com seu
            próprio objetivo e escopo.
          </p>
        </div>
        <ProjectShowcase />
        <p className={styles.portfolioNote}>
          A prévia da TFA mostra a página pública de acesso. O sistema é
          destinado à equipe da agência. Zentable com lançamento em breve.
        </p>
      </section>
      <section className={styles.finalSection}>
        <div className={styles.container}>
          <h2>
            Vamos criar <span>o seu?</span>
          </h2>
          <p>Black Friday. Site institucional simples ou landing page por R$ 297.</p>
          <a
            className={styles.primaryButton}
            href={whatsappLink(offerMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Aproveitar a Black Friday
          </a>
        </div>
      </section>
    </main>
  );
}
