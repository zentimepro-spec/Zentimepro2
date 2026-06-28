import "server-only";

import { compare } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const CRM_SESSION_COOKIE = "zentimepro_crm_session";

const CRM_SESSION_DURATION_SECONDS = 60 * 60 * 12;

type CrmSessionPayload = {
  email: string;
  role: "ADMIN" | "SALES";
  sub: string;
};

function getSessionSecret() {
  const secret = process.env.CRM_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing CRM_SESSION_SECRET environment variable.");
  }

  return new TextEncoder().encode(secret);
}

export async function createCrmSessionToken(payload: CrmSessionPayload) {
  return new SignJWT({
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${CRM_SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function verifyCrmSessionToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    return payload as CrmSessionPayload & { exp?: number; iat?: number };
  } catch {
    return null;
  }
}

export async function authenticateCrmUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const isPasswordValid = await compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
    },
  });

  return user;
}

export async function getCrmSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CRM_SESSION_COOKIE)?.value;
  const payload = await verifyCrmSessionToken(token);

  if (!payload?.sub) {
    return null;
  }

  return payload;
}

export async function getCurrentCrmUser() {
  const session = await getCrmSession();

  if (!session?.sub) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.sub },
  });
}

export async function getCrmSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(CRM_SESSION_COOKIE)?.value;
  return verifyCrmSessionToken(token);
}

export async function getCurrentCrmAdminUser() {
  const user = await getCurrentCrmUser();

  if (!user || !user.isActive || user.role !== UserRole.ADMIN) {
    return null;
  }

  return user;
}
