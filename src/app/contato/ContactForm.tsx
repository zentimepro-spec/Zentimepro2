"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().min(3),
  empresa: z.string().min(2),
  telefone: z.string().min(8),
  email: z.string().email(),
  servico: z.string().min(2),
  mensagem: z.string().min(10),
});

type ContactData = z.infer<typeof contactSchema>;

const initialValues: ContactData = {
  nome: "",
  empresa: "",
  telefone: "",
  email: "",
  servico: "",
  mensagem: "",
};

const fields = [
  ["Nome", "nome", "text", "Seu nome"],
  ["Empresa", "empresa", "text", "Nome da empresa"],
  ["Telefone", "telefone", "tel", "Telefone ou WhatsApp"],
  ["E-mail", "email", "email", "seuemail@empresa.com"],
  ["Servico", "servico", "text", "Ex.: landing page, CRM, sistema interno"],
] as const;

export function ContactForm() {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError("Preencha os campos corretamente para enviarmos sua solicitacao.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? "Nao foi possivel enviar o formulario agora.");
      } else {
        setSuccess("Solicitacao enviada com sucesso. Retornaremos em breve.");
        setForm(initialValues);
      }
    } catch {
      setError("Erro de conexao. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: keyof ContactData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? (
        <div className="rounded-[1.4rem] border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-[1.4rem] border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {success}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(([label, field, type, placeholder]) => (
          <label key={field} className="block text-sm text-slate-300">
            <span className="mb-2 block font-medium text-slate-200">{label}</span>
            <input
              type={type}
              value={form[field]}
              onChange={(event) => handleChange(field, event.target.value)}
              className="w-full rounded-[1.2rem] border border-white/10 bg-[#081120]/80 px-4 py-3.5 text-white outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15 placeholder:text-slate-500"
              placeholder={placeholder}
            />
          </label>
        ))}
      </div>

      <label className="block text-sm text-slate-300">
        <span className="mb-2 block font-medium text-slate-200">Mensagem</span>
        <textarea
          rows={6}
          value={form.mensagem}
          onChange={(event) => handleChange("mensagem", event.target.value)}
          className="w-full rounded-[1.2rem] border border-white/10 bg-[#081120]/80 px-4 py-3.5 text-white outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/15 placeholder:text-slate-500"
          placeholder="Conte brevemente seu momento, objetivo e o que precisa organizar ou construir."
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-400">
          Ao enviar, nossa equipe recebe seu lead no CRM para retorno e acompanhamento comercial.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(37,99,235,0.38)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Enviando..." : "Enviar solicitacao"}
        </button>
      </div>
    </form>
  );
}
