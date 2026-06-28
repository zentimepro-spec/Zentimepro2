type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function CrmLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#081120] px-6 py-16 text-slate-100">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Acesso interno</p>
          <h1 className="text-3xl font-bold text-white">Entrar no CRM</h1>
          <p className="text-sm leading-7 text-slate-300">
            Este painel centraliza os leads captados pelo site e organiza o fluxo comercial.
          </p>
        </div>

        <form action="/api/crm/session" method="post" className="mt-8 space-y-4">
          {hasError ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
              Credenciais invalidas. Tente novamente.
            </div>
          ) : null}

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">E-mail</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="seuemail@empresa.com"
            />
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Senha de acesso</span>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="Digite a senha do CRM"
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
