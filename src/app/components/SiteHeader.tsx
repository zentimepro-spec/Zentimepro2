"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { zenWhatsAppLink } from "@/lib/zen-knowledge";

const links = [
  ["Início", "/"], ["Serviços", "/servicos"], ["Portfólio", "/portfolio"],
  ["Preços", "/precos"], ["Sobre", "/sobre"], ["Contato", "/contato"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => { setMenu(false); }, [pathname]);

  const active = (href: string) => href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="studio-header">
      <div className="studio-header-inner">
        <Link href="/" className="studio-logo" aria-label="Zen Time Pro, voltar ao início" data-cursor="Início">
          <Image src="/logooficial-cropped.png" alt="Zen Time Pro" width={1131} height={434} priority className="studio-logo-image"/>
        </Link>
        <nav className="studio-main-nav" aria-label="Menu principal">
          {links.map(([label, href]) => <Link href={href} key={href} aria-current={active(href) ? "page" : undefined} className={active(href) ? "is-current" : ""}>{label}</Link>)}
        </nav>
        <div className="studio-header-actions">
          <a className="studio-header-whatsapp" href={zenWhatsAppLink("Olá, Zen Time Pro! Quero conversar sobre um projeto para minha empresa.")} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <button type="button" data-zen-launcher data-cursor="Conversar" className="studio-header-cta"><span aria-hidden="true">✳</span> Planeje seu projeto ↗</button>
          <button className={"studio-menu-toggle" + (menu ? " is-open" : "")} type="button" onClick={() => setMenu(v => !v)} aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu} aria-controls="studio-mobile-menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>
      {menu ? (
        <nav id="studio-mobile-menu" className="studio-mobile-nav" aria-label="Menu para celular">
          {links.map(([label, href], i) => <Link href={href} key={href} aria-current={active(href) ? "page" : undefined}><span>0{i + 1}</span>{label}<span aria-hidden="true">↗</span></Link>)}
          <a className="studio-mobile-whatsapp" href={zenWhatsAppLink("Olá, Zen Time Pro! Vim pelo site e gostaria de conversar sobre um projeto.")} target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp ↗</a>
          <button type="button" data-zen-launcher onClick={() => setMenu(false)}>✳ Conversar com Zen ↗</button>
        </nav>
      ) : null}
    </header>
  );
}
