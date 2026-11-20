import Image from "next/image";
import Link from "next/link";

const nav = [["Serviços","/servicos"],["Portfólio","/portfolio"],["Preços","/precos"],["Sobre","/sobre"],["Contato","/contato"]] as const;

export function SiteFooter() {
  return <footer className="studio-footer">
    <div className="studio-footer-inner">
      <div className="studio-footer-brand">
        <Link href="/" aria-label="Zen Time Pro, página inicial"><Image src="/logooficial-cropped.png" alt="Zen Time Pro" width={1131} height={434} className="studio-footer-logo"/></Link>
        <h2>Ideias extraordinárias merecem experiências à altura.</h2>
        <p>Sites profissionais, landing pages, CRM e sistemas web desenvolvidos para marcas e empresas que querem avançar.</p>
      </div>
      <div className="studio-footer-links">
        <h3>NAVEGUE</h3>
        {nav.map(([name,url]) => <Link href={url} key={url}>{name} ↗</Link>)}
      </div>
      <div className="studio-footer-contact">
        <h3>VAMOS CONVERSAR?</h3>
        <a href="mailto:zentimepro@gmail.com">zentimepro@gmail.com</a>
        <a href="https://wa.me/5511991650950" target="_blank" rel="noopener noreferrer">+55 (11) 99165-0950 ↗</a>
        <a href="https://www.instagram.com/zentimepro/" target="_blank" rel="noopener noreferrer">Instagram @zentimepro ↗</a>
        <p>Atendimento em São Paulo e em todo o Brasil.</p>
      </div>
    </div>
    <div className="studio-footer-bottom"><span>© 2026 Zen Time Pro. Todos os direitos reservados.</span><span>DESIGN × TECNOLOGIA × RESULTADOS</span><Link href="/">VOLTAR AO INÍCIO ↑</Link></div>
  </footer>;
}
