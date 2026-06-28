import "server-only";

import { LeadStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

function getWebhookUrl() {
  return process.env.CRM_NOTIFICATION_WEBHOOK_URL?.trim() || null;
}

function getAutomationSecret() {
  const secret = process.env.CRM_AUTOMATION_SECRET?.trim();

  if (!secret) {
    throw new Error("Missing CRM_AUTOMATION_SECRET environment variable.");
  }

  return secret;
}

export function validateAutomationSecret(provided?: string | null) {
  if (!provided) {
    return false;
  }

  return provided === getAutomationSecret();
}

async function sendWebhook(payload: Record<string, unknown>) {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    return { delivered: false, reason: "webhook_not_configured" } as const;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Webhook notification failed with status ${response.status}: ${body}`);
  }

  return { delivered: true } as const;
}

export async function notifyNewLead(input: {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
}) {
  return sendWebhook({
    event: "new_lead",
    title: "Novo lead recebido",
    lead: input,
  });
}

export async function notifyOverdueTasks() {
  const now = new Date();
  const overdueTasks = await prisma.lead.findMany({
    where: {
      nextActionAt: { lt: now },
      status: {
        notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
      },
    },
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: [{ nextActionAt: "asc" }, { priority: "desc" }],
    take: 20,
  });

  return sendWebhook({
    event: "overdue_tasks",
    title: "Leads com proxima acao vencida",
    generatedAt: now.toISOString(),
    total: overdueTasks.length,
    leads: overdueTasks.map((lead) => ({
      id: lead.id,
      nome: lead.nome,
      empresa: lead.empresa,
      priority: lead.priority,
      nextAction: lead.nextAction,
      nextActionAt: lead.nextActionAt?.toISOString() ?? null,
      assignedTo: lead.assignedTo?.name ?? lead.assignedTo?.email ?? null,
      status: lead.status,
    })),
  });
}

export async function notifyDailySummary() {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  const [newLeadsToday, overdueTasks, todayTasks, wonLeadsToday] = await Promise.all([
    prisma.lead.count({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    }),
    prisma.lead.count({
      where: {
        nextActionAt: { lt: now },
        status: {
          notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
        },
      },
    }),
    prisma.lead.count({
      where: {
        nextActionAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
        status: {
          notIn: [LeadStatus.FECHADO, LeadStatus.PERDIDO],
        },
      },
    }),
    prisma.lead.count({
      where: {
        status: LeadStatus.FECHADO,
        updatedAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    }),
  ]);

  return sendWebhook({
    event: "daily_summary",
    title: "Resumo diario comercial",
    generatedAt: now.toISOString(),
    summary: {
      newLeadsToday,
      overdueTasks,
      todayTasks,
      wonLeadsToday,
    },
  });
}
