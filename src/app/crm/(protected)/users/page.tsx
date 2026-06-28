import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

import { getCurrentCrmAdminUser } from "@/lib/crm-auth";
import { calculateLeadTotalValue, getCrmUsers, userRoleLabels } from "@/lib/crm";

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
  goal: "Informe metas com valores validos.",
};

const successMessages: Record<string, string> = {
  created: "Usuario criado com sucesso.",
  updated: "Usuario atualizado com sucesso.",
  "goal-updated": "Meta mensal atualizada com sucesso.",
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
    <main className="min-w-0 space-y-6 lg:space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
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

        <form action="/api/crm/users" method="post" className="mt-6 grid gap-4 xl:grid-cols-4">
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

          <div className="xl:col-span-4">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white sm:w-auto"
            >
              Criar usuario
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-5 2xl:grid-cols-2">
        {users.map((user) => (
          <article
            key={user.id}
            className="min-w-0 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8"
          >
            {(() => {
              const currentGoal = user.monthlyGoals[0] ?? null;
              const achievedRevenue = user.assignedLeads.reduce(
                (total, lead) => total + calculateLeadTotalValue(lead).total,
                0,
              );
              const achievedWonLeads = user.assignedLeads.length;
              const revenueGoal = currentGoal?.revenueGoal ? Number(currentGoal.revenueGoal) : 0;
              const wonLeadsGoal = currentGoal?.wonLeadsGoal ?? 0;
              const revenueProgress =
                revenueGoal > 0 ? Math.min(Math.round((achievedRevenue / revenueGoal) * 100), 999) : 0;
              const wonLeadsProgress =
                wonLeadsGoal > 0 ? Math.min(Math.round((achievedWonLeads / wonLeadsGoal) * 100), 999) : 0;

              return (
                <>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-white">{user.name ?? "Sem nome"}</h3>
                      <p className="mt-2 break-all text-sm text-slate-300">{user.email}</p>
                    </div>
                    <div className="text-left sm:text-right">
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

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Meta de faturamento</p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 0,
                        }).format(achievedRevenue)}
                      </p>
                      <p className="mt-1 text-xs text-emerald-100/80">
                        Meta:{" "}
                        {revenueGoal > 0
                          ? new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              maximumFractionDigits: 0,
                            }).format(revenueGoal)
                          : "Nao definida"}{" "}
                        ({revenueProgress}%)
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Meta de fechamentos</p>
                      <p className="mt-3 text-xl font-semibold text-white">{achievedWonLeads}</p>
                      <p className="mt-1 text-xs text-cyan-100/80">
                        Meta: {wonLeadsGoal > 0 ? wonLeadsGoal : "Nao definida"} ({wonLeadsProgress}%)
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
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 sm:w-auto"
                    >
                      Salvar usuario
                    </button>
                  </form>

                  <form action={`/api/crm/users/${user.id}/goals`} method="post" className="mt-6 rounded-[1.6rem] border border-white/10 bg-[#081120]/70 p-5">
                    <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                      <p className="text-sm uppercase tracking-[0.22em] text-cyan-400">Meta vigente</p>
                      <p className="text-sm text-slate-300">Defina a meta comercial do mes atual para este usuario.</p>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="block text-sm text-slate-300">
                        <span className="mb-2 block">Meta de faturamento (R$)</span>
                        <input
                          type="number"
                          name="revenueGoal"
                          step="0.01"
                          min="0"
                          defaultValue={revenueGoal > 0 ? revenueGoal : ""}
                          className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                          placeholder="0,00"
                        />
                      </label>

                      <label className="block text-sm text-slate-300">
                        <span className="mb-2 block">Meta de fechamentos</span>
                        <input
                          type="number"
                          name="wonLeadsGoal"
                          min="0"
                          defaultValue={wonLeadsGoal > 0 ? wonLeadsGoal : ""}
                          className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                          placeholder="0"
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white sm:w-auto"
                    >
                      Salvar meta do mes
                    </button>
                  </form>
                </>
              );
            })()}
          </article>
        ))}
      </section>
    </main>
  );
}
