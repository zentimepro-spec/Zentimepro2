import { NextResponse } from "next/server";

import {
  authenticateCrmUser,
  CRM_SESSION_COOKIE,
  createCrmSessionToken,
} from "@/lib/crm-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const action = String(formData.get("action") ?? "");

  if (action === "logout") {
    return clearSession(request);
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const user = await authenticateCrmUser(email, password);

  if (!user) {
    return NextResponse.redirect(new URL("/crm/login?error=1", request.url), {
      status: 303,
    });
  }

  const token = await createCrmSessionToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.redirect(new URL("/crm", request.url), {
    status: 303,
  });

  response.cookies.set(CRM_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

export async function DELETE(request: Request) {
  return clearSession(request);
}

function clearSession(request: Request) {
  const response = NextResponse.redirect(new URL("/crm/login", request.url), {
    status: 303,
  });

  response.cookies.set(CRM_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
