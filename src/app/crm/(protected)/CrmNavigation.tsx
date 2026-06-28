"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const baseLinks = [{ label: "Dashboard", href: "/crm" }];
const adminLinks = [{ label: "Usuarios", href: "/crm/users" }];

type CrmNavigationProps = {
  isAdmin: boolean;
};

function isActivePath(pathname: string, href: string) {
  return href === "/crm" ? pathname === "/crm" || pathname.startsWith("/crm/leads/") : pathname.startsWith(href);
}

export function CrmNavigation({ isAdmin }: CrmNavigationProps) {
  const pathname = usePathname();
  const links = isAdmin ? [...baseLinks, ...adminLinks] : baseLinks;

  return (
    <aside className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="rounded-[1.4rem] border border-cyan-400/12 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_54%),rgba(8,17,32,0.82)] p-4 xl:min-w-[280px]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Workspace</p>
          <p className="mt-3 text-base font-semibold text-white">Zen Time Pro CRM</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Acompanhe funil, prioridades e a execucao comercial em um unico painel.
          </p>
        </div>

        <nav className="grid gap-2 sm:grid-cols-2 xl:flex xl:flex-wrap xl:justify-end">
          {links.map((link) => {
            const isActive = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition xl:min-w-[148px] ${
                  isActive
                    ? "border border-cyan-400/20 bg-cyan-500/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
