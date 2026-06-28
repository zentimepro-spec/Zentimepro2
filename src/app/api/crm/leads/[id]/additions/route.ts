import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/leads/[id]/additions">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const description = String(formData.get("description") ?? "").trim();
  const amountRaw = String(formData.get("amount") ?? "").trim();
  const amount = amountRaw ? Number(amountRaw.replace(",", ".")) : null;

  if (description.length < 3 || amount === null || Number.isNaN(amount) || amount < 0) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?detailsError=6`, request.url), {
      status: 303,
    });
  }

  const lead = await prisma.lead.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!lead) {
    return NextResponse.redirect(new URL("/crm", request.url), { status: 303 });
  }

  await prisma.leadAddition.create({
    data: {
      amount,
      description,
      leadId: id,
    },
  });

  await prisma.leadActivity.create({
    data: {
      actorId: session.sub,
      description: `Adicional registrado: ${description}.`,
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
