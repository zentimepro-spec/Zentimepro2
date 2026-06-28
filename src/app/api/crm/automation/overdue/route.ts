import { NextRequest, NextResponse } from "next/server";

import {
  notifyOverdueTasks,
  validateAutomationSecret,
} from "@/lib/crm-notifications";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-crm-automation-secret");

  if (!validateAutomationSecret(secret)) {
    return NextResponse.json({ error: "Nao autorizado." }, { status: 401 });
  }

  const result = await notifyOverdueTasks();

  return NextResponse.json({ success: true, ...result });
}
