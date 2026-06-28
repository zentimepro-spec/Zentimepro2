import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#0F172A] px-6 text-center text-slate-100">
      <div className="max-w-xl rounded-4xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">404</p>
        <h1 className="mt-6 text-4xl font-semibold text-white">Pagina nao encontrada</h1>
        <p className="mt-4 text-slate-300">Parece que voce entrou em um local que nao existe. Vamos voltar para a pagina inicial.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1E4BB8]">
          Voltar para Home
        </Link>
      </div>
    </main>
  );
}
