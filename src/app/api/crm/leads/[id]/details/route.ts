import { LeadPriority, LeadSource } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

const leadPriorityValues = new Set(Object.values(LeadPriority));
const leadSourceValues = new Set(Object.values(LeadSource));

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/leads/[id]/details">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const assignedToIdRaw = String(formData.get("assignedToId") ?? "").trim();
  const nome = String(formData.get("nome") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const telefone = String(formData.get("telefone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const servico = String(formData.get("servico") ?? "").trim();
  const sourceRaw = String(formData.get("source") ?? "").trim();
  const sourceDetail = String(formData.get("sourceDetail") ?? "").trim();
  const priorityRaw = String(formData.get("priority") ?? "").trim();
  const budgetValueRaw = String(formData.get("budgetValue") ?? "").trim();
  const closedServiceValueRaw = String(formData.get("closedServiceValue") ?? "").trim();
  const closedAtRaw = String(formData.get("closedAt") ?? "").trim();
  const lostReason = String(formData.get("lostReason") ?? "").trim();
  const internalNotes = String(formData.get("internalNotes") ?? "").trim();
  const nextAction = String(formData.get("nextAction") ?? "").trim();
  const nextActionAtRaw = String(formData.get("nextActionAt") ?? "").trim();

  const assignedToId = assignedToIdRaw || null;
  const nextActionAt = nextActionAtRaw ? new Date(nextActionAtRaw) : null;
  const closedAt = closedAtRaw ? new Date(closedAtRaw) : null;
  const source = leadSourceValues.has(sourceRaw as LeadSource)
    ? (sourceRaw as LeadSource)
    : LeadSource.SITE;
  const priority = leadPriorityValues.has(priorityRaw as LeadPriority)
    ? (priorityRaw as LeadPriority)
    : LeadPriority.MEDIA;
  const budgetValue = budgetValueRaw ? Number(budgetValueRaw.replace(",", ".")) : null;
  const closedServiceValue = closedServiceValueRaw
    ? Number(closedServiceValueRaw.replace(",", "."))
    : null;

  if (!nome || !empresa || !telefone || !email || !servico) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=2`, request.url), {
      status: 303,
    });
  }

  if (nextActionAt && Number.isNaN(nextActionAt.getTime())) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=1`, request.url), {
      status: 303,
    });
  }

  if (budgetValueRaw && (budgetValue === null || Number.isNaN(budgetValue) || budgetValue < 0)) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=3`, request.url), {
      status: 303,
    });
  }

  if (
    closedServiceValueRaw &&
    (closedServiceValue === null || Number.isNaN(closedServiceValue) || closedServiceValue < 0)
  ) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=4`, request.url), {
      status: 303,
    });
  }

  if (closedAt && Number.isNaN(closedAt.getTime())) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=5`, request.url), {
      status: 303,
    });
  }

  const currentLead = await prisma.lead.findUnique({
    where: { id },
    select: {
      nome: true,
      empresa: true,
      telefone: true,
      email: true,
      servico: true,
      source: true,
      sourceDetail: true,
      assignedToId: true,
      priority: true,
      budgetValue: true,
      closedServiceValue: true,
      closedAt: true,
      lostReason: true,
      internalNotes: true,
      nextAction: true,
      nextActionAt: true,
    },
  });

  if (!currentLead) {
    return NextResponse.redirect(new URL("/crm", request.url), { status: 303 });
  }

  const activityMessages: string[] = [];

  if (currentLead.assignedToId !== assignedToId) {
    activityMessages.push(assignedToId ? "Responsavel atualizado." : "Responsavel removido.");
  }

  if (currentLead.priority !== priority) {
    activityMessages.push(`Prioridade alterada para ${priority}.`);
  }

  if (
    currentLead.nome !== nome ||
    currentLead.empresa !== empresa ||
    currentLead.telefone !== telefone ||
    currentLead.email !== email ||
    currentLead.servico !== servico
  ) {
    activityMessages.push("Dados principais do lead foram atualizados.");
  }

  if (currentLead.source !== source || (currentLead.sourceDetail ?? "") !== sourceDetail) {
    activityMessages.push("Origem do lead foi atualizada.");
  }

  if ((currentLead.budgetValue?.toNumber() ?? null) !== budgetValue) {
    activityMessages.push("Orcamento estimado foi atualizado.");
  }

  if ((currentLead.closedServiceValue?.toNumber() ?? null) !== closedServiceValue) {
    activityMessages.push("Valor fechado do servico foi atualizado.");
  }

  if ((currentLead.closedAt?.toISOString() ?? "") !== (closedAt?.toISOString() ?? "")) {
    activityMessages.push("Data de fechamento foi atualizada.");
  }

  if ((currentLead.lostReason ?? "") !== lostReason) {
    activityMessages.push("Motivo de perda foi atualizado.");
  }

  if ((currentLead.internalNotes ?? "") !== internalNotes) {
    activityMessages.push("Observacoes internas foram atualizadas.");
  }

  if ((currentLead.nextAction ?? "") !== nextAction || (currentLead.nextActionAt?.toISOString() ?? "") !== (nextActionAt?.toISOString() ?? "")) {
    activityMessages.push("Proxima acao atualizada.");
  }

  await prisma.lead.update({
    where: { id },
    data: {
      nome,
      empresa,
      telefone,
      email,
      servico,
      source,
      sourceDetail: sourceDetail || null,
      assignedToId,
      priority,
      budgetValue: budgetValue === null ? null : budgetValue,
      closedServiceValue: closedServiceValue === null ? null : closedServiceValue,
      closedAt,
      lostReason: lostReason || null,
      internalNotes: internalNotes || null,
      nextAction: nextAction || null,
      nextActionAt,
      lastInteractionAt: new Date(),
      activities: activityMessages.length
        ? {
            create: activityMessages.map((description) => ({
              type: description.includes("Valor fechado") || description.includes("Data de fechamento")
                ? "FINANCIAL_UPDATED"
                : "OWNER_CHANGED",
              description,
              actorId: session.sub,
            })),
          }
        : undefined,
    },
  });

  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${id}`);

  return NextResponse.redirect(new URL(`/crm/leads/${id}`, request.url), {
    status: 303,
  });
}
