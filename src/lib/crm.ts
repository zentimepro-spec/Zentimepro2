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

export function parseCrmFilters(input?: {
  period?: string;
  service?: string;
  status?: string;
}): CrmFilters {
  const period = input?.period;
  const service = input?.service?.trim() ?? "";
  const status = input?.status;

  return {
    period:
      period === "7d" || period === "30d" || period === "90d" || period === "all"
        ? period
        : "30d",
    service,
    status: status && Object.values(LeadStatus).includes(status as LeadStatus)
      ? (status as LeadStatus)
      : "all",
  };
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
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

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
  ] =
    await Promise.all([
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
        orderBy: [
          { priority: "desc" },
          { createdAt: "desc" },
        ],
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
        orderBy: [
          { nextActionAt: "asc" },
          { priority: "desc" },
        ],
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
        orderBy: [
          { nextActionAt: "asc" },
          { priority: "desc" },
        ],
        take: 5,
      }),
    ]);

  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  const lossRate = totalLeads > 0 ? Math.round((lostLeads / totalLeads) * 100) : 0;

  return {
    filters,
    stats: {
      totalLeads,
      newLeads,
      activeLeads,
      wonLeads,
      lostLeads,
      conversionRate,
      lossRate,
    },
    sourceBreakdown: sourceGroups
      .map((group) => ({
        source: group.source,
        label: leadSourceLabels[group.source],
        total: group._count.source,
      }))
      .sort((a, b) => b.total - a.total),
    funnel: Object.values(LeadStatus).map((status) => {
      const total = statusGroups.find((group) => group.status === status)?._count.status ?? 0;
      return {
        status,
        label: leadStatusLabels[status],
        total,
        percentage: totalLeads > 0 ? Math.round((total / totalLeads) * 100) : 0,
      };
    }),
    alerts: {
      unassignedCount: unassignedLeads.length,
      overdueCount: overdueTasks.length,
      todayCount: todayTasks.length,
      unassignedLeads,
      overdueTasks,
      todayTasks,
    },
    leads,
  };
}

export async function getLeadDetails(leadId: string) {
  return prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      assignedTo: true,
      notes: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      activities: {
        include: {
          actor: true,
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
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}

export async function getCrmUsers() {
  return prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });
}
