import Link from "next/link";
import { redirect } from "next/navigation";

import { CrmNavigation } from "./CrmNavigation";
import { getCurrentCrmUser } from "@/lib/crm-auth";

export default async function CrmProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentCrmUser();

  if (!user?.isActive) {
    redirect("/crm/login");
  }

  return (
    <div className="min-h-[100dvh] bg-[#081120] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_42%),rgba(255,255,255,0.04)] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Zen Time Pro CRM</p>
              <h1 className="text-3xl font-semibold text-white">Painel comercial</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Operacao comercial com mais visibilidade, historico e disciplina de acompanhamento.
              </p>
              <p className="text-sm text-slate-400">
                {user.name ?? user.email} • {user.role === "ADMIN" ? "Administrador" : "Comercial"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/25 hover:text-white"
              >
                Ver site
              </Link>
              <form action="/api/crm/session" method="post">
                <input type="hidden" name="action" value="logout" />
                <button
                  type="submit"
                  className="rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.1]"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <CrmNavigation isAdmin={user.role === "ADMIN"} />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
