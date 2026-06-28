import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/leads/[id]/notes">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const content = String(formData.get("content") ?? "").trim();

  if (content.length < 3) {
    return NextResponse.redirect(new URL(`/crm/leads/${id}?noteError=1`, request.url), {
      status: 303,
    });
  }

  await prisma.lead.update({
    where: { id },
    data: {
      lastInteractionAt: new Date(),
      notes: {
        create: {
          content,
          authorId: session.sub,
        },
      },
      activities: {
        create: {
          type: "NOTE_ADDED",
          description: "Nota interna adicionada ao lead.",
          actorId: session.sub,
        },
      },
    },
  });

  revalidatePath("/crm");
  revalidatePath(`/crm/leads/${id}`);

  return NextResponse.redirect(new URL(`/crm/leads/${id}`, request.url), {
    status: 303,
  });
}
