"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  ["Home", "/"],
  ["Servicos", "/servicos"],
  ["Portfolio", "/portfolio"],
  ["Precos", "/precos"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#08101d]/78 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[4.8rem] max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:min-h-[5.4rem] sm:gap-4 sm:px-6 sm:py-3 lg:min-h-[5.9rem] lg:gap-6 lg:px-10">
        <Link
          href="/"
          className="relative flex min-w-0 flex-shrink-0 items-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/logooficial-cropped.png"
            alt="Zen Time Pro"
            width={1131}
            height={434}
            priority
            className="h-[3.9rem] w-auto object-contain drop-shadow-[0_14px_34px_rgba(2,6,23,0.34)] sm:h-[4.2rem] lg:h-[5.1rem]"
          />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] p-2 shadow-[0_18px_40px_rgba(2,6,23,0.16)] lg:flex">
          {navLinks.map(([label, href]) => {
            const isActive = isActivePath(pathname, href);

            return (
              <Link
                key={label}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20solicitar%20um%20orcamento."
            target="_blank"
            rel="noreferrer"
            className="hidden items-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(37,99,235,0.38)] lg:inline-flex"
          >
            Falar no WhatsApp
          </Link>

          <button
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-all ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav className="border-t border-white/8 bg-[#08101d]/96 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2.5">
            {navLinks.map(([label, href]) => {
              const isActive = isActivePath(pathname, href);

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                    isActive
                      ? "border border-cyan-400/20 bg-cyan-500/10 text-white"
                      : "border border-white/8 bg-white/[0.03] text-slate-300 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <Link
              href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20solicitar%20um%20orcamento."
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-5 py-3 text-sm font-semibold text-white"
            >
              Falar no WhatsApp
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
