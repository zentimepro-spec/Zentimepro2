import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { zenCatalogReply, type ZenReply } from "@/lib/zen-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  question: z.string().trim().min(1).max(550),
  page: z.string().max(120).optional().default("/"),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(550),
  })).max(8).optional().default([]),
});

const bucket = new Map<string, { count: number; until: number }>();

function throttle(ip: string) {
  const now = Date.now();
  if (bucket.size > 2500) bucket.clear();
  const entry = bucket.get(ip);
  if (!entry || now > entry.until) {
    bucket.set(ip, { count: 1, until: now + 60000 });
    return true;
  }
  entry.count++;
  return entry.count <= 20;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
    }
  }

  const length = Number(request.headers.get("content-length") || "0");
  if (length > 8000) return NextResponse.json({ error: "Mensagem muito grande." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!throttle(ip)) return NextResponse.json({ error: "Muitas mensagens. Tente novamente em instantes." }, { status: 429 });

  let raw: unknown;
  try { raw = await request.json(); }
  catch { return NextResponse.json({ error: "Formato inválido." }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos." }, { status: 422 });

  const { question, page, history } = parsed.data;
  const fallback = zenCatalogReply(question, page);

  if (!process.env.ZEN_WORKER_URL || !process.env.ZEN_WORKER_SECRET) {
    return NextResponse.json(fallback, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const url = new URL(process.env.ZEN_WORKER_URL);
    if (url.protocol !== "https:") throw new Error("ZEN_WORKER_URL must use HTTPS");
    const visitor = createHash("sha256")
      .update(ip + ":" + process.env.ZEN_WORKER_SECRET)
      .digest("hex");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + process.env.ZEN_WORKER_SECRET,
      },
      body: JSON.stringify({ question, page, history, visitor }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(response.status === 429
        ? { error: "Limite de mensagens atingido. Volte em instantes." }
        : fallback, { status: response.status === 429 ? 429 : 200, headers: { "Cache-Control": "no-store" } });
    }

    const candidate: unknown = await response.json();
    if (!candidate || typeof candidate !== "object") throw new Error("Bad response");
    const reply = candidate as Partial<ZenReply>;
    if (typeof reply.message !== "string" || !reply.message.trim()) throw new Error("Empty response");

    // Links e sugestões saem somente do catálogo autorizado.
    const result: ZenReply = {
      ...fallback,
      message: reply.message.slice(0, 1350),
      mode: reply.mode === "ai" ? "ai" : "catalog",
    };
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(fallback, { headers: { "Cache-Control": "no-store" } });
  }
}
