import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

function getCurrentMonthStart() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/users/[id]/goals">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const actor = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, isActive: true, role: true },
  });

  if (!actor?.isActive || actor.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/crm", request.url), {
      status: 303,
    });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const revenueGoalRaw = String(formData.get("revenueGoal") ?? "").trim();
  const wonLeadsGoalRaw = String(formData.get("wonLeadsGoal") ?? "").trim();
  const revenueGoal = revenueGoalRaw ? Number(revenueGoalRaw.replace(",", ".")) : null;
  const wonLeadsGoal = wonLeadsGoalRaw ? Number.parseInt(wonLeadsGoalRaw, 10) : null;

  if (revenueGoalRaw && (revenueGoal === null || Number.isNaN(revenueGoal) || revenueGoal < 0)) {
    return NextResponse.redirect(new URL("/crm/users?error=goal", request.url), {
      status: 303,
    });
  }

  if (wonLeadsGoalRaw && (wonLeadsGoal === null || Number.isNaN(wonLeadsGoal) || wonLeadsGoal < 0)) {
    return NextResponse.redirect(new URL("/crm/users?error=goal", request.url), {
      status: 303,
    });
  }

  await prisma.userMonthlyGoal.upsert({
    where: {
      userId_monthDate: {
        monthDate: getCurrentMonthStart(),
        userId: id,
      },
    },
    update: {
      revenueGoal: revenueGoal === null ? null : revenueGoal,
      wonLeadsGoal,
    },
    create: {
      monthDate: getCurrentMonthStart(),
      revenueGoal: revenueGoal === null ? null : revenueGoal,
      userId: id,
      wonLeadsGoal,
    },
  });

  revalidatePath("/crm");
  revalidatePath("/crm/users");

  return NextResponse.redirect(new URL("/crm/users?success=goal-updated", request.url), {
    status: 303,
  });
}
