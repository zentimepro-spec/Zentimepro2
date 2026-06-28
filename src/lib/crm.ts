import { LeadPriority, LeadSource, LeadStatus, Prisma, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const leadStatusLabels: Record<LeadStatus, string> = {
  NOVO: "Novo",
  CONTATO_INICIADO: "Contato iniciado",
  QUALIFICADO: "Qualificado",
  PROPOSTA_ENVIADA: "Proposta enviada",
  NEGOCIACAO: "Negociacao",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

export const leadSourceLabels: Record<LeadSource, string> = {
  SITE: "Site",
  WHATSAPP: "WhatsApp",
  INSTAGRAM: "Instagram",
  GOOGLE: "Google",
  INDICACAO: "Indicacao",
  OUTRO: "Outro",
};

export const leadPriorityLabels: Record<LeadPriority, string> = {
  BAIXA: "Baixa",
  MEDIA: "Media",
  ALTA: "Alta",
  URGENTE: "Urgente",
};

export const userRoleLabels: Record<UserRole, string> = {
  ADMIN: "Administrador",
  SALES: "Comercial",
};

export type CrmPeriodFilter = "7d" | "30d" | "90d" | "all";

export type CrmFilters = {
  period: CrmPeriodFilter;
  service: string;
  status: "all" | LeadStatus;
};

function getDecimalValue(value: Prisma.Decimal | number | null | undefined) {
  if (value === null || value === undefined) {
    return 0;
  }

  return typeof value === "number" ? value : value.toNumber();
}

export function calculateLeadTotalValue(lead: {
  additions: Array<{
    amount: Prisma.Decimal | number;
  }>;
  closedServiceValue: Prisma.Decimal | number | null;
}) {
  const additionsTotal = lead.additions.reduce((total, item) => total + getDecimalValue(item.amount), 0);
  const serviceValue = getDecimalValue(lead.closedServiceValue);

  return {
    additionsTotal,
    serviceValue,
    total: serviceValue + additionsTotal,
  };
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function buildLeadWhere(filters: CrmFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (filters.status !== "all") {
    where.status = filters.status;
  }

  if (filters.service) {
    where.servico = filters.service;
  }

  if (filters.period !== "all") {
    const days = Number.parseInt(filters.period, 10);
    const from = new Date();
    from.setDate(from.getDate() - days);
    where.createdAt = { gte: from };
  }

  return where;
}

function buildRevenueWhere(filters: CrmFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {
    status: LeadStatus.FECHADO,
    closedAt: undefined,
  };

  if (filters.service) {
    where.servico = filters.service;
  }

  if (filters.period !== "all") {
    const days = Number.parseInt(filters.period, 10);
    const from = new Date();
    from.setDate(from.getDate() - days);
    where.closedAt = { gte: from };
  }

  return where;
}

export function parseCrmFilters(input?: {
  period?: string;
  service?: string;
  status?: string;
}) {
  const period = input?.period;
  const service = input?.service?.trim() ?? "";
  const status = input?.status;

  return {
    period:
      period === "7d" || period === "30d" || period === "90d" || period === "all"
        ? period
        : "30d",
    service,
    status:
      status && Object.values(LeadStatus).includes(status as LeadStatus)
        ? (status as LeadStatus)
        : "all",
  } satisfies CrmFilters;
}

export async function getCrmFilterOptions() {
  const [services, assignees] = await Promise.all([
    prisma.lead.findMany({
      distinct: ["servico"],
      orderBy: {
        servico: "asc",
      },
      select: {
        servico: true,
      },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      orderBy: [{ role: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        email: true,
      },
    }),
  ]);

  return {
    services: services.map((item) => item.servico),
    assignees,
  };
}

export async function getCrmDashboardData(filters: CrmFilters) {
  const where = buildLeadWhere(filters);
  const revenueWhere = buildRevenueWhere(filters);
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);
  const currentMonthStart = getMonthStart(now);
  const nextMonthStart = addMonths(currentMonthStart, 1);
  const timelineStart = addMonths(currentMonthStart, -5);

  const [
    totalLeads,
    newLeads,
    activeLeads,
    wonLeads,
    lostLeads,
    leads,
    sourceGroups,
    statusGroups,
    unassignedLeads,
    overdueTasks,
    todayTasks,
    filteredClosedLeads,
    timelineClosedLeads,
    goalUsers,
  ] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.count({ where: { ...where, status: LeadStatus.NOVO } }),
    prisma.lead.count({
      where: {
        ...where,
        status: {
          in: [
            LeadStatus.NOVO,
            LeadStatus.CONTATO_INICIADO,
            LeadStatus.QUALIFICADO,
            LeadStatus.PROPOSTA_ENVIADA,
            LeadStatus.NEGOCIACAO,
          ],
        },
      },
    }),
    prisma.lead.count({ where: { ...where, status: LeadStatus.FECHADO } }),
    prisma.lead.count({ where: { ...where, status: LeadStatus.PERDIDO } }),
    prisma.lead.findMany({
      where,
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    }),
    prisma.lead.groupBy({
      by: ["source"],
      where,
      _count: {
        source: true,
      },
    }),
    prisma.lead.groupBy({
      by: ["status"],
      where,
      _count: {
        status: true,
      },
    }),
    prisma.lead.findMany({
      where: {
        ...where,
        assignedToId: null,
        status: {
          notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
        },
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 5,
    }),
    prisma.lead.findMany({
      where: {
        ...where,
        nextActionAt: { lt: now },
        status: {
          notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
        },
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ nextActionAt: "asc" }, { priority: "desc" }],
      take: 5,
    }),
    prisma.lead.findMany({
      where: {
        ...where,
        nextActionAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
        status: {
          notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
        },
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: [{ nextActionAt: "asc" }, { priority: "desc" }],
      take: 5,
    }),
    prisma.lead.findMany({
      where: revenueWhere,
      select: {
        id: true,
        nome: true,
        closedAt: true,
        closedServiceValue: true,
        additions: {
          select: {
            amount: true,
          },
        },
      },
    }),
    prisma.lead.findMany({
      where: {
        status: LeadStatus.FECHADO,
        ...(filters.service ? { servico: filters.service } : {}),
        closedAt: {
          gte: timelineStart,
          lt: nextMonthStart,
        },
      },
      select: {
        id: true,
        closedAt: true,
        closedServiceValue: true,
        additions: {
          select: {
            amount: true,
          },
        },
      },
    }),
    prisma.user.findMany({
      where: { isActive: true },
      orderBy: [{ role: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        monthlyGoals: {
          where: {
            monthDate: currentMonthStart,
          },
          take: 1,
          select: {
            revenueGoal: true,
            wonLeadsGoal: true,
          },
        },
        assignedLeads: {
          where: {
            status: LeadStatus.FECHADO,
            closedAt: {
              gte: currentMonthStart,
              lt: nextMonthStart,
            },
          },
          select: {
            id: true,
            closedServiceValue: true,
            additions: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    }),
  ]);

  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const lossRate = totalLeads > 0 ? Math.round((lostLeads / totalLeads) * 100) : 0;

  const financialTotals = filteredClosedLeads.reduce(
    (accumulator, lead) => {
      const { additionsTotal, serviceValue, total } = calculateLeadTotalValue(lead);

      return {
        additionalRevenue: accumulator.additionalRevenue + additionsTotal,
        totalRevenue: accumulator.totalRevenue + total,
        totalServiceRevenue: accumulator.totalServiceRevenue + serviceValue,
      };
    },
    {
      additionalRevenue: 0,
      totalRevenue: 0,
      totalServiceRevenue: 0,
    },
  );

  const revenueTimelineMap = new Map<string, { goal: number; label: string; revenue: number }>();

  for (let monthOffset = 0; monthOffset < 6; monthOffset += 1) {
    const monthDate = addMonths(timelineStart, monthOffset);
    const key = monthDate.toISOString();
    revenueTimelineMap.set(key, {
      label: new Intl.DateTimeFormat("pt-BR", {
        month: "short",
        year: "2-digit",
      }).format(monthDate),
      revenue: 0,
      goal: 0,
    });
  }

  for (const lead of timelineClosedLeads) {
    if (!lead.closedAt) {
      continue;
    }

    const monthKey = getMonthStart(lead.closedAt).toISOString();
    const bucket = revenueTimelineMap.get(monthKey);

    if (!bucket) {
      continue;
    }

    bucket.revenue += calculateLeadTotalValue(lead).total;
  }

  const teamGoals = goalUsers.map((user) => {
    const currentMonthGoal = user.monthlyGoals[0] ?? null;
    const achievedRevenue = user.assignedLeads.reduce(
      (total, lead) => total + calculateLeadTotalValue(lead).total,
      0,
    );
    const achievedWonLeads = user.assignedLeads.length;
    const revenueGoal = getDecimalValue(currentMonthGoal?.revenueGoal);
    const wonLeadsGoal = currentMonthGoal?.wonLeadsGoal ?? 0;

    return {
      achievedRevenue,
      achievedWonLeads,
      email: user.email,
      id: user.id,
      name: user.name,
      revenueGoal,
      revenueProgress: revenueGoal > 0 ? Math.min(Math.round((achievedRevenue / revenueGoal) * 100), 999) : 0,
      role: user.role,
      wonLeadsGoal,
      wonLeadsProgress: wonLeadsGoal > 0 ? Math.min(Math.round((achievedWonLeads / wonLeadsGoal) * 100), 999) : 0,
    };
  });

  const currentMonthRevenue = teamGoals.reduce((total, user) => total + user.achievedRevenue, 0);
  const currentMonthRevenueGoal = teamGoals.reduce((total, user) => total + user.revenueGoal, 0);
  const currentMonthWonLeads = teamGoals.reduce((total, user) => total + user.achievedWonLeads, 0);
  const currentMonthWonLeadsGoal = teamGoals.reduce((total, user) => total + user.wonLeadsGoal, 0);

  const currentMonthKey = currentMonthStart.toISOString();
  const currentMonthBucket = revenueTimelineMap.get(currentMonthKey);

  if (currentMonthBucket) {
    currentMonthBucket.goal = currentMonthRevenueGoal;
  }

  const currentMonthProgress =
    currentMonthRevenueGoal > 0
      ? Math.min(Math.round((currentMonthRevenue / currentMonthRevenueGoal) * 100), 999)
      : 0;

  return {
    alerts: {
      overdueCount: overdueTasks.length,
      overdueTasks,
      todayCount: todayTasks.length,
      todayTasks,
      unassignedCount: unassignedLeads.length,
      unassignedLeads,
    },
    filters,
    financials: {
      additionalRevenue: financialTotals.additionalRevenue,
      averageTicket:
        filteredClosedLeads.length > 0 ? financialTotals.totalRevenue / filteredClosedLeads.length : 0,
      closedDealsCount: filteredClosedLeads.length,
      currentMonthProgress,
      currentMonthRevenue,
      currentMonthRevenueGoal,
      currentMonthWonLeads,
      currentMonthWonLeadsGoal,
      revenueTimeline: Array.from(revenueTimelineMap.values()),
      teamGoals,
      totalRevenue: financialTotals.totalRevenue,
      totalServiceRevenue: financialTotals.totalServiceRevenue,
    },
    funnel: Object.values(LeadStatus).map((status) => {
      const total = statusGroups.find((group) => group.status === status)?._count.status ?? 0;

      return {
        label: leadStatusLabels[status],
        percentage: totalLeads > 0 ? Math.round((total / totalLeads) * 100) : 0,
        status,
        total,
      };
    }),
    leads,
    sourceBreakdown: sourceGroups
      .map((group) => ({
        label: leadSourceLabels[group.source],
        source: group.source,
        total: group._count.source,
      }))
      .sort((a, b) => b.total - a.total),
    stats: {
      activeLeads,
      conversionRate,
      lossRate,
      lostLeads,
      newLeads,
      totalLeads,
      wonLeads,
    },
  };
}

export async function getLeadDetails(leadId: string) {
  return prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      activities: {
        include: {
          actor: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      additions: {
        orderBy: {
          createdAt: "desc",
        },
      },
      assignedTo: true,
      notes: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function getCrmAssignees() {
  return prisma.user.findMany({
    where: { isActive: true },
    orderBy: [{ role: "asc" }, { name: "asc" }],
    select: {
      email: true,
      id: true,
      name: true,
      role: true,
    },
  });
}

export async function getCrmUsers() {
  const currentMonthStart = getMonthStart(new Date());
  const nextMonthStart = addMonths(currentMonthStart, 1);

  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      createdAt: true,
      email: true,
      id: true,
      isActive: true,
      lastLoginAt: true,
      monthlyGoals: {
        where: {
          monthDate: currentMonthStart,
        },
        take: 1,
        select: {
          id: true,
          revenueGoal: true,
          wonLeadsGoal: true,
        },
      },
      name: true,
      role: true,
      assignedLeads: {
        where: {
          status: LeadStatus.FECHADO,
          closedAt: {
            gte: currentMonthStart,
            lt: nextMonthStart,
          },
        },
        select: {
          closedServiceValue: true,
          id: true,
          additions: {
            select: {
              amount: true,
            },
          },
        },
      },
    },
  });
}
