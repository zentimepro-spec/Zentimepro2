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
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_42%),rgba(255,255,255,0.04)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Zen Time Pro CRM</p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">Painel comercial</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Operacao comercial com mais visibilidade, historico e disciplina de acompanhamento.
              </p>
              <p className="break-words text-sm text-slate-400">
                {user.name ?? user.email} • {user.role === "ADMIN" ? "Administrador" : "Comercial"}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/25 hover:text-white"
              >
                Ver site
              </Link>
              <form action="/api/crm/session" method="post">
                <input type="hidden" name="action" value="logout" />
                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/[0.1]"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <CrmNavigation isAdmin={user.role === "ADMIN"} />
        </div>

        <div className="mt-5 min-w-0">{children}</div>
      </div>
    </div>
  );
}
