import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { getCurrentCrmAdminUser } from "@/lib/crm-auth";
import { getCrmUsers, userRoleLabels } from "@/lib/crm";

type CrmUsersPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

const errorMessages: Record<string, string> = {
  create: "Preencha um email valido e uma senha com pelo menos 8 caracteres.",
  duplicate: "Ja existe um usuario com este email.",
  "self-disable": "Voce nao pode desativar o proprio usuario logado.",
  "last-admin": "O CRM precisa manter ao menos um administrador ativo.",
  missing: "Usuario nao encontrado.",
};

const successMessages: Record<string, string> = {
  created: "Usuario criado com sucesso.",
  updated: "Usuario atualizado com sucesso.",
};

export default async function CrmUsersPage({ searchParams }: CrmUsersPageProps) {
  const admin = await getCurrentCrmAdminUser();

  if (!admin) {
    redirect("/crm");
  }

  const params = await searchParams;
  const users = await getCrmUsers();
  const errorMessage = params.error ? errorMessages[params.error] : null;
  const successMessage = params.success ? successMessages[params.success] : null;

  return (
    <main className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Usuarios</p>
          <h2 className="text-2xl font-bold text-white">Gestao de acessos do CRM</h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Crie usuarios comerciais, promova administradores e redefina senhas sem depender de scripts.
          </p>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            {successMessage}
          </div>
        ) : null}

        <form action="/api/crm/users" method="post" className="mt-6 grid gap-4 lg:grid-cols-4">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Nome</span>
            <input
              type="text"
              name="name"
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
              placeholder="Nome do usuario"
            />
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Email</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
              placeholder="usuario@empresa.com"
            />
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Perfil</span>
            <select
              name="role"
              defaultValue={UserRole.SALES}
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
            >
              {Object.values(UserRole).map((role) => (
                <option key={role} value={role}>
                  {userRoleLabels[role]}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Senha inicial</span>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
              placeholder="Minimo 8 caracteres"
            />
          </label>

          <div className="lg:col-span-4">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white"
            >
              Criar usuario
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{user.name ?? "Sem nome"}</h3>
                <p className="mt-2 text-sm text-slate-300">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-cyan-400">{userRoleLabels[user.role]}</p>
                <p className="mt-2 text-xs text-slate-400">{user.isActive ? "Ativo" : "Inativo"}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-xs text-slate-400 sm:grid-cols-2">
              <div>
                <p>Criado em</p>
                <p className="mt-1 text-sm text-slate-300">
                  {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(user.createdAt)}
                </p>
              </div>
              <div>
                <p>Ultimo login</p>
                <p className="mt-1 text-sm text-slate-300">
                  {user.lastLoginAt
                    ? new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(user.lastLoginAt)
                    : "Ainda nao acessou"}
                </p>
              </div>
            </div>

            <form action={`/api/crm/users/${user.id}`} method="post" className="mt-6 space-y-4">
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Nome</span>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Perfil</span>
                  <select
                    name="role"
                    defaultValue={user.role}
                    className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  >
                    {Object.values(UserRole).map((role) => (
                      <option key={role} value={role}>
                        {userRoleLabels[role]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Nova senha</span>
                  <input
                    type="password"
                    name="password"
                    minLength={8}
                    className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                    placeholder="Deixe em branco para manter"
                  />
                </label>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#081120]/70 px-4 py-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={user.isActive}
                  className="h-4 w-4 rounded border-white/10 bg-transparent"
                />
                Usuario ativo
              </label>

              <button
                type="submit"
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              >
                Salvar usuario
              </button>
            </form>
          </article>
        ))}
      </section>
    </main>
  );
}
