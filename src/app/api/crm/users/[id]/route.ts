import { hash } from "bcryptjs";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/crm/users/[id]">,
) {
  const session = await getCrmSessionFromRequest(request);

  if (!session?.sub) {
    return NextResponse.redirect(new URL("/crm/login", request.url), {
      status: 303,
    });
  }

  const actor = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, role: true, isActive: true },
  });

  if (!actor?.isActive || actor.role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/crm", request.url), {
      status: 303,
    });
  }

  const { id } = await context.params;
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const roleRaw = String(formData.get("role") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const isActive = String(formData.get("isActive") ?? "") === "on";
  const role = roleRaw === UserRole.ADMIN ? UserRole.ADMIN : UserRole.SALES;

  if (actor.id === id && !isActive) {
    return NextResponse.redirect(new URL("/crm/users?error=self-disable", request.url), {
      status: 303,
    });
  }

  const adminCount = await prisma.user.count({
    where: {
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  const currentUser = await prisma.user.findUnique({
    where: { id },
    select: { role: true, isActive: true },
  });

  if (!currentUser) {
    return NextResponse.redirect(new URL("/crm/users?error=missing", request.url), {
      status: 303,
    });
  }

  const wouldRemoveLastAdmin =
    currentUser.role === UserRole.ADMIN &&
    currentUser.isActive &&
    adminCount <= 1 &&
    (role !== UserRole.ADMIN || !isActive);

  if (wouldRemoveLastAdmin) {
    return NextResponse.redirect(new URL("/crm/users?error=last-admin", request.url), {
      status: 303,
    });
  }

  await prisma.user.update({
    where: { id },
    data: {
      name: name || null,
      role,
      isActive,
      ...(password.length >= 8 ? { passwordHash: await hash(password, 12) } : {}),
    },
  });

  revalidatePath("/crm/users");

  return NextResponse.redirect(new URL("/crm/users?success=updated", request.url), {
    status: 303,
  });
}
