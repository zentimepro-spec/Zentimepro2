import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/leads/[id]/additions/[additionId]">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const { additionId, id } = await context.params;

  const addition = await prisma.leadAddition.findFirst({
    where: {
      id: additionId,
      leadId: id,
    },
    select: {
      description: true,
      id: true,
    },
  });

  if (!addition) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}`, request.url), {
      status: 303,
    });
  }

  await prisma.leadAddition.delete({
    where: { id: additionId },
  });

  await prisma.leadActivity.create({
    data: {
      actorId: session.sub,
      description: `Adicional removido: ${addition.description}.`,
      leadId: id,
      type: "FINANCIAL_UPDATED",
    },
  });

  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${id}`);

  return NextResponse.redirect(new URL(`/crm/leads/${id}`, request.url), {
    status: 303,
  });
}
