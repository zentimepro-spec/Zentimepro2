import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { notifyNewLead } from "@/lib/crm-notifications";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
  empresa: z.string().min(2, "Empresa deve ter pelo menos 2 caracteres."),
  telefone: z.string().min(8, "Telefone inválido."),
  email: z.string().email("Email inválido."),
  servico: z.string().min(2, "Serviço inválido."),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", issues: result.error.format() },
        { status: 422 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        nome: result.data.nome,
        empresa: result.data.empresa,
        telefone: result.data.telefone,
        email: result.data.email,
        servico: result.data.servico,
        mensagem: result.data.mensagem,
        source: "SITE",
        activities: {
          create: {
            type: "CREATED",
            description: "Lead criado via formulario do site.",
          },
        },
      },
    });

    await notifyNewLead({
      id: lead.id,
      nome: lead.nome,
      empresa: lead.empresa,
      email: lead.email,
      telefone: lead.telefone,
      servico: lead.servico,
      mensagem: lead.mensagem,
    }).catch((error) => {
      console.error("Failed to notify about new lead:", error);
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Falha ao gravar lead." }, { status: 500 });
  }
}
