import Link from "next/link";

const navigation = [
  ["Servicos", "/servicos"],
  ["Portfolio", "/portfolio"],
  ["Precos", "/precos"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#08101d] px-4 py-12 text-slate-300 sm:px-6 sm:py-14 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Zen Time Pro
            </p>
            <h2 className="mt-3 max-w-md text-xl font-semibold text-white sm:text-2xl">
              Presenca digital, operacao comercial e tecnologia com nivel profissional.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Estruturamos sites, CRM e sistemas para empresas que querem melhorar percepcao de marca,
            organizacao comercial e conversao.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Navegacao
          </p>
          <div className="flex flex-col gap-3">
            {navigation.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Contato direto
          </p>
          <div className="space-y-3 text-sm">
            <a
              href="mailto:zentimepro@gmail.com"
              className="block text-slate-300 transition hover:text-cyan-300"
            >
              zentimepro@gmail.com
            </a>
            <a
              href="tel:+5511991650950"
              className="block text-slate-300 transition hover:text-cyan-300"
            >
              +55 (11) 99165-0950
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5511991650950&text=Ola,%20vim%20atraves%20do%20site%20da%20Zen%20Time%20Pro%20e%20gostaria%20de%20solicitar%20um%20orcamento."
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/8 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Zen Time Pro. Todos os direitos reservados.</p>
        <p>Desenvolvimento, CRM e sistemas com foco em conversao e clareza operacional.</p>
      </div>
    </footer>
  );
}
