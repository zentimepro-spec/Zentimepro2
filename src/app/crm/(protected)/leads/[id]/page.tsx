import { LeadPriority, LeadSource, LeadStatus } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CrmStatusSelect } from "../../../CrmStatusSelect";
import {
  calculateLeadTotalValue,
  getCrmAssignees,
  getLeadDetails,
  leadPriorityLabels,
  leadSourceLabels,
  leadStatusLabels,
} from "@/lib/crm";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    detailsError?: string;
    noteError?: string;
  }>;
};

export default async function LeadDetailPage({
  params,
  searchParams,
}: LeadDetailPageProps) {
  const { id } = await params;
  const { detailsError, noteError } = await searchParams;
  const [lead, assignees] = await Promise.all([getLeadDetails(id), getCrmAssignees()]);

  if (!lead) {
    notFound();
  }

  const financialSnapshot = calculateLeadTotalValue(lead);

  return (
    <main className="min-w-0 space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <Link href="/crm" className="text-sm text-cyan-400 transition hover:text-cyan-300">
            Voltar para o CRM
          </Link>
          <h2 className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">{lead.nome}</h2>
          <p className="mt-2 break-words text-slate-300">{lead.empresa}</p>
        </div>

        <div className="w-full xl:max-w-xs">
          <CrmStatusSelect
            leadId={lead.id}
            currentStatus={lead.status}
            options={Object.values(LeadStatus).map((status) => ({
              value: status,
              label: leadStatusLabels[status],
            }))}
          />
        </div>
      </div>

      <section className="grid gap-5 2xl:grid-cols-[1.05fr_0.95fr]">
        <div className="min-w-0 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Resumo do lead</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="mt-2 break-all text-sm text-white">{lead.email}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Telefone</p>
              <p className="mt-2 break-words text-sm text-white">{lead.telefone}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Servico</p>
              <p className="mt-2 break-words text-sm text-white">{lead.servico}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Origem</p>
              <p className="mt-2 text-sm text-white">{leadSourceLabels[lead.source]}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Prioridade</p>
              <p className="mt-2 text-sm text-white">{leadPriorityLabels[lead.priority]}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Responsavel</p>
              <p className="mt-2 break-words text-sm text-white">
                {lead.assignedTo?.name ?? lead.assignedTo?.email ?? "Nao atribuido"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Origem detalhada</p>
              <p className="mt-2 break-words text-sm text-white">{lead.sourceDetail ?? "Nao informada"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Orcamento estimado</p>
              <p className="mt-2 text-sm text-white">
                {lead.budgetValue
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(lead.budgetValue))
                  : "Nao informado"}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Servico fechado</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {lead.closedServiceValue
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(lead.closedServiceValue))
                  : "Nao informado"}
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Adicionais</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(financialSnapshot.additionsTotal)}
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Total fechado</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(financialSnapshot.total)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Criado em</p>
              <p className="mt-2 text-sm text-white">
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  }).format(lead.createdAt)}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fechado em</p>
              <p className="mt-2 text-sm text-white">
                {lead.closedAt
                  ? new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(lead.closedAt)
                  : "Sem fechamento registrado"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Proxima acao</p>
              <p className="mt-2 break-words text-sm text-white">{lead.nextAction ?? "Nao definida"}</p>
              <p className="mt-2 text-xs text-slate-400">
                {lead.nextActionAt
                  ? new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(lead.nextActionAt)
                  : "Sem data programada"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ultima interacao</p>
              <p className="mt-2 text-sm text-white">
                {lead.lastInteractionAt
                  ? new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(lead.lastInteractionAt)
                  : "Sem registro ainda"}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#081120]/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Mensagem original</p>
            <p className="mt-3 break-words text-sm leading-7 text-slate-200">{lead.mensagem}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Motivo de perda</p>
              <p className="mt-3 break-words text-sm leading-7 text-slate-200">{lead.lostReason ?? "Nao informado"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#081120]/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Observacoes internas</p>
              <p className="mt-3 break-words text-sm leading-7 text-slate-200">{lead.internalNotes ?? "Sem observacoes internas"}</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-5 sm:space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Operacao comercial</p>
            <form action={`/api/crm/leads/${lead.id}/details`} method="post" className="mt-6 space-y-4">
              {detailsError === "1" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  A data da proxima acao nao e valida.
                </div>
              ) : null}
              {detailsError === "2" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  Preencha nome, empresa, telefone, email e servico.
                </div>
              ) : null}
              {detailsError === "3" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  O orcamento precisa ser um numero valido.
                </div>
              ) : null}
              {detailsError === "4" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  O valor fechado precisa ser um numero valido.
                </div>
              ) : null}
              {detailsError === "5" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  A data de fechamento nao e valida.
                </div>
              ) : null}
              {detailsError === "6" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  Informe descricao e valor valido para o adicional.
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Nome</span>
                  <input type="text" name="nome" defaultValue={lead.nome} required className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40" />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Empresa</span>
                  <input type="text" name="empresa" defaultValue={lead.empresa} required className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Telefone</span>
                  <input type="text" name="telefone" defaultValue={lead.telefone} required className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40" />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Email</span>
                  <input type="email" name="email" defaultValue={lead.email} required className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Servico</span>
                  <input type="text" name="servico" defaultValue={lead.servico} required className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40" />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Origem</span>
                  <select name="source" defaultValue={lead.source} className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40">
                    {Object.values(LeadSource).map((source) => (
                      <option key={source} value={source}>
                        {leadSourceLabels[source]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Origem detalhada</span>
                <input
                  type="text"
                  name="sourceDetail"
                  defaultValue={lead.sourceDetail ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="Ex.: campanha de Instagram, indicacao do cliente X"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Responsavel</span>
                  <select name="assignedToId" defaultValue={lead.assignedToId ?? ""} className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40">
                    <option value="">Nao atribuido</option>
                    {assignees.map((assignee) => (
                      <option key={assignee.id} value={assignee.id}>
                        {assignee.name ?? assignee.email}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Prioridade</span>
                  <select name="priority" defaultValue={lead.priority} className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40">
                    {Object.values(LeadPriority).map((priority) => (
                      <option key={priority} value={priority}>
                        {leadPriorityLabels[priority]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Orcamento estimado (R$)</span>
                <input
                  type="number"
                  name="budgetValue"
                  step="0.01"
                  min="0"
                  defaultValue={lead.budgetValue ? Number(lead.budgetValue) : ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="0,00"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Valor fechado do servico (R$)</span>
                  <input
                    type="number"
                    name="closedServiceValue"
                    step="0.01"
                    min="0"
                    defaultValue={lead.closedServiceValue ? Number(lead.closedServiceValue) : ""}
                    className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                    placeholder="0,00"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Data de fechamento</span>
                  <input
                    type="datetime-local"
                    name="closedAt"
                    defaultValue={lead.closedAt ? new Date(lead.closedAt.getTime() - lead.closedAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
                    className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  />
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Proxima acao</span>
                <input
                  type="text"
                  name="nextAction"
                  defaultValue={lead.nextAction ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="Ex.: ligar, enviar proposta, marcar reuniao"
                />
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Motivo de perda</span>
                <textarea
                  name="lostReason"
                  rows={3}
                  defaultValue={lead.lostReason ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="Preencha quando o lead for perdido ou despriorizado."
                />
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Observacoes internas</span>
                <textarea
                  name="internalNotes"
                  rows={4}
                  defaultValue={lead.internalNotes ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="Contexto comercial, restricoes, decisores e observacoes privadas."
                />
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Data da proxima acao</span>
                <input
                  type="datetime-local"
                  name="nextActionAt"
                  defaultValue={lead.nextActionAt ? new Date(lead.nextActionAt.getTime() - lead.nextActionAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white sm:w-auto"
              >
                Salvar operacao
              </button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Financeiro do servico</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Adicionais e composicao do fechamento</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#081120]/70 px-4 py-3 text-sm text-slate-300">
                Total atual:{" "}
                <span className="font-semibold text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(financialSnapshot.total)}
                </span>
              </div>
            </div>

            <form action={`/api/crm/leads/${lead.id}/additions`} method="post" className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_auto] xl:items-end">
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Descricao do adicional</span>
                <input
                  type="text"
                  name="description"
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="Ex.: integracao extra, ajuste urgente, pagina adicional"
                />
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Valor (R$)</span>
                <input
                  type="number"
                  name="amount"
                  min="0"
                  step="0.01"
                  className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                  placeholder="0,00"
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20 xl:w-auto"
              >
                Adicionar item
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {lead.additions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#081120]/40 px-5 py-6 text-sm text-slate-400">
                  Nenhum adicional registrado ainda para este servico.
                </div>
              ) : (
                lead.additions.map((addition) => (
                  <article
                    key={addition.id}
                    className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#081120]/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="break-words text-sm font-semibold text-white">{addition.description}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(addition.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:items-end">
                      <p className="text-sm font-semibold text-cyan-200">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(addition.amount))}
                      </p>
                      <form action={`/api/crm/leads/${lead.id}/additions/${addition.id}`} method="post">
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/20"
                        >
                          Remover item
                        </button>
                      </form>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Notas internas</p>
            <form action={`/api/crm/leads/${lead.id}/notes`} method="post" className="mt-6 space-y-4">
              {noteError === "1" ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  Escreva uma nota com pelo menos 3 caracteres.
                </div>
              ) : null}

              <textarea
                name="content"
                rows={5}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
                placeholder="Registre contexto, proxima acao, objecoes ou detalhes da conversa."
              />
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white sm:w-auto"
              >
                Adicionar nota
              </button>
            </form>

            <div className="mt-6 space-y-4">
              {lead.notes.length === 0 ? (
                <p className="text-sm text-slate-400">Nenhuma nota registrada ainda.</p>
              ) : (
                lead.notes.map((note) => (
                  <article key={note.id} className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="break-words text-sm font-semibold text-white">{note.author.name ?? note.author.email}</p>
                      <p className="text-xs text-slate-400">
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(note.createdAt)}
                      </p>
                    </div>
                    <p className="mt-3 break-words text-sm leading-7 text-slate-200">{note.content}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Historico de atividades</p>
            <div className="mt-6 space-y-4">
              {lead.activities.length === 0 ? (
                <p className="text-sm text-slate-400">Nenhuma atividade registrada ainda.</p>
              ) : (
                lead.activities.map((activity) => (
                  <article key={activity.id} className="rounded-2xl border border-white/10 bg-[#081120]/70 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="break-words text-sm font-semibold text-white">{activity.description}</p>
                      <p className="text-xs text-slate-400">
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(activity.createdAt)}
                      </p>
                    </div>
                    <p className="mt-2 break-words text-sm text-slate-400">
                      {activity.actor?.name ?? activity.actor?.email ?? "Sistema"}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
