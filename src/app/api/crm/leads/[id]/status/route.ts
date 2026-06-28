import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

const leadStatusValues = new Set(Object.values(LeadStatus));

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/crm/leads/[id]/status">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.json({ error: "Nao autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const nextStatus = body.status;

  if (typeof nextStatus !== "string" || !leadStatusValues.has(nextStatus as LeadStatus)) {
    return NextResponse.json({ error: "Status invalido." }, { status: 422 });
  }

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: nextStatus as LeadStatus,
      lastInteractionAt: new Date(),
      activities: {
        create: {
          type: "STATUS_CHANGED",
          description: `Status alterado para ${nextStatus}.`,
          actorId: session.sub,
        },
      },
    },
  });

  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${id}`);

  return NextResponse.json({ success: true, lead });
}
