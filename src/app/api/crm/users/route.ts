import { hash } from "bcryptjs";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getCrmSessionFromRequest } from "@/lib/crm-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
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

  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const roleRaw = String(formData.get("role") ?? "").trim();
  const role = roleRaw === UserRole.ADMIN ? UserRole.ADMIN : UserRole.SALES;

  if (!email || password.length < 8) {
    return NextResponse.redirect(new URL("/crm/users?error=create", request.url), {
      status: 303,
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.redirect(new URL("/crm/users?error=duplicate", request.url), {
      status: 303,
    });
  }

  const passwordHash = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash,
      role,
      isActive: true,
    },
  });

  revalidatePath("/crm/users");

  return NextResponse.redirect(new URL("/crm/users?success=created", request.url), {
    status: 303,
  });
}
