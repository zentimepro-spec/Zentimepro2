import { LeadStatus } from "@prisma/client";
import Link from "next/link";

import { CrmStatusSelect } from "../CrmStatusSelect";
import {
  getCrmDashboardData,
  getCrmFilterOptions,
  leadPriorityLabels,
  leadSourceLabels,
  leadStatusLabels,
  parseCrmFilters,
} from "@/lib/crm";

const statsConfig = [
  { key: "totalLeads", label: "Total de leads", helper: "Base dentro do filtro atual" },
  { key: "newLeads", label: "Novos", helper: "Entradas ainda no inicio do fluxo" },
  { key: "activeLeads", label: "Em andamento", helper: "Oportunidades em movimentacao" },
  { key: "wonLeads", label: "Fechados", helper: "Leads convertidos em venda" },
] as const;

type CrmDashboardPageProps = {
  searchParams: Promise<{
    period?: string;
    service?: string;
    status?: string;
  }>;
};

type AlertCard = {
  title: string;
  items: Awaited<ReturnType<typeof getCrmDashboardData>>["alerts"]["unassignedLeads"];
  emptyText: string;
  tone: "red" | "amber" | "cyan";
};

function getStatusTone(status: LeadStatus) {
  switch (status) {
    case LeadStatus.FECHADO:
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
    case LeadStatus.PERDIDO:
      return "border-red-400/20 bg-red-500/10 text-red-100";
    case LeadStatus.NEGOCIACAO:
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
    default:
      return "border-cyan-400/20 bg-cyan-500/10 text-cyan-100";
  }
}

export default async function CrmDashboardPage({ searchParams }: CrmDashboardPageProps) {
  const filters = parseCrmFilters(await searchParams);
  const [{ stats, leads, sourceBreakdown, alerts, funnel }, { services }] = await Promise.all([
    getCrmDashboardData(filters),
    getCrmFilterOptions(),
  ]);
  const alertCards: AlertCard[] = [
    {
      title: "Sem responsavel",
      items: alerts.unassignedLeads,
      emptyText: "Nenhum lead aberto sem responsavel.",
      tone: "red",
    },
    {
      title: "Atrasadas",
      items: alerts.overdueTasks,
      emptyText: "Nenhuma proxima acao vencida.",
      tone: "amber",
    },
    {
      title: "Agenda de hoje",
      items: alerts.todayTasks,
      emptyText: "Nenhuma acao programada para hoje.",
      tone: "cyan",
    },
  ];

  return (
    <main className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Leitura comercial</p>
            <h2 className="text-3xl font-semibold text-white">Visao executiva do pipeline</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Filtre, entenda o momento do funil e identifique rapidamente onde o time precisa agir.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Conversao</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stats.conversionRate}%</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Perda</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stats.lossRate}%</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Acao hoje</p>
              <p className="mt-2 text-2xl font-semibold text-white">{alerts.todayCount}</p>
            </div>
          </div>
        </div>

        <form className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Periodo</span>
            <select
              name="period"
              defaultValue={filters.period}
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
            >
              <option value="7d">Ultimos 7 dias</option>
              <option value="30d">Ultimos 30 dias</option>
              <option value="90d">Ultimos 90 dias</option>
              <option value="all">Todo o periodo</option>
            </select>
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Status</span>
            <select
              name="status"
              defaultValue={filters.status}
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
            >
              <option value="all">Todos</option>
              {Object.values(LeadStatus).map((status) => (
                <option key={status} value={status}>
                  {leadStatusLabels[status]}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Servico</span>
            <select
              name="service"
              defaultValue={filters.service}
              className="w-full rounded-2xl border border-white/10 bg-[#081120] px-4 py-3 text-white outline-none transition focus:border-cyan-500/40"
            >
              <option value="">Todos os servicos</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-6 py-3 text-sm font-semibold text-white"
            >
              Aplicar
            </button>
            <Link
              href="/crm"
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 transition hover:border-cyan-500/40 hover:text-white"
            >
              Limpar
            </Link>
          </div>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsConfig.map((item) => (
          <div
            key={item.key}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-white">{stats[item.key]}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Funil comercial</p>
              <h2 className="text-2xl font-semibold text-white">Distribuicao por etapa</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              Entenda onde o volume esta concentrado e se o time esta conseguindo empurrar o lead ate fechamento.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {funnel.map((stage) => (
              <div
                key={stage.status}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,19,33,0.96),rgba(8,17,32,0.82))] p-5"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/80 via-sky-400/70 to-indigo-400/80" />
                <p className="min-h-[2.7rem] max-w-[9rem] text-[11px] font-semibold uppercase leading-5 tracking-[0.22em] text-cyan-300">
                  {stage.label}
                </p>
                <p className="mt-6 text-5xl font-semibold leading-none text-white">{stage.total}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{stage.percentage}% do total filtrado</p>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
                    style={{ width: `${Math.max(stage.percentage, stage.total > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Origem dos leads</p>
            <div className="mt-6 space-y-3">
              {sourceBreakdown.length === 0 ? (
                <p className="text-sm text-slate-400">Nenhum lead encontrado para o filtro atual.</p>
              ) : (
                sourceBreakdown.map((item) => (
                  <div key={item.source} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#081120]/70 px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-100">{item.label}</p>
                      <p className="text-xs text-slate-500">{Math.round((item.total / Math.max(stats.totalLeads, 1)) * 100)}% da base filtrada</p>
                    </div>
                    <p className="text-lg font-semibold text-white">{item.total}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Saude da operacao</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Sem responsavel", alerts.unassignedCount, "text-red-100", "border-red-400/20 bg-red-500/10"],
                ["Atrasadas", alerts.overdueCount, "text-amber-100", "border-amber-400/20 bg-amber-500/10"],
                ["Agenda de hoje", alerts.todayCount, "text-cyan-100", "border-cyan-400/20 bg-cyan-500/10"],
              ].map(([label, total, toneText, toneBox]) => (
                <div key={label} className={`rounded-2xl border px-4 py-4 ${toneBox}`}>
                  <p className={`text-sm ${toneText}`}>{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{total}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {alertCards.map(({ title, items, emptyText, tone }) => (
          <div
            key={title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">{title}</p>
            <div className="mt-5 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-slate-400">{emptyText}</p>
              ) : (
                items.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/crm/leads/${lead.id}`}
                    className={`block rounded-2xl border px-4 py-4 transition hover:border-white/20 ${
                      tone === "red"
                        ? "border-red-400/15 bg-red-500/10"
                        : tone === "amber"
                          ? "border-amber-400/15 bg-amber-500/10"
                          : "border-cyan-400/15 bg-cyan-500/10"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">{lead.nome}</p>
                    <p className="mt-1 text-xs text-slate-300">{lead.empresa}</p>
                    {"nextAction" in lead && lead.nextAction ? (
                      <p className="mt-2 text-xs text-slate-400">{lead.nextAction}</p>
                    ) : null}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:p-8">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Leads recentes</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Pipeline comercial</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-300">
            Acesse rapidamente os contatos mais recentes, contexto do lead e acao pendente.
          </p>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-[#081120]/70 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-white">Nenhum lead encontrado</p>
            <p className="mt-3 text-sm text-slate-300">
              Ajuste os filtros ou aguarde novas entradas pelo formulario do site.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {leads.map((lead) => (
              <article
                key={lead.id}
                className="grid gap-5 rounded-[1.7rem] border border-white/10 bg-[#081120]/72 p-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_220px] lg:items-start"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/crm/leads/${lead.id}`} className="text-lg font-semibold text-white transition hover:text-cyan-300">
                      {lead.nome}
                    </Link>
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusTone(lead.status)}`}>
                      {leadStatusLabels[lead.status]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{lead.empresa}</p>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-400">{lead.mensagem}</p>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Contato</p>
                    <p className="mt-2">{lead.email}</p>
                    <p className="mt-1">{lead.telefone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Servico</p>
                    <p className="mt-2">{lead.servico}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Operacao</p>
                    <p className="mt-2">{leadSourceLabels[lead.source]}</p>
                    <p className="mt-1 text-slate-400">{leadPriorityLabels[lead.priority]}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Responsavel</p>
                    <p className="mt-2">{lead.assignedTo?.name ?? lead.assignedTo?.email ?? "Nao atribuido"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Entrada</p>
                    <p className="mt-2 text-slate-400">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      }).format(lead.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Proxima acao</p>
                    <p className="mt-2 text-sm text-slate-200">{lead.nextAction ?? "Sem proxima acao definida"}</p>
                  </div>
                  <CrmStatusSelect
                    leadId={lead.id}
                    currentStatus={lead.status}
                    options={Object.values(LeadStatus).map((status) => ({
                      value: status,
                      label: leadStatusLabels[status],
                    }))}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
