"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type CrmStatusSelectProps = {
  currentStatus: string;
  leadId: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export function CrmStatusSelect({
  currentStatus,
  leadId,
  options,
}: CrmStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function updateStatus(nextStatus: string) {
    setStatus(nextStatus);
    setError(null);

    const response = await fetch(`/api/crm/leads/${leadId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!response.ok) {
      setStatus(currentStatus);
      setError("Falha ao salvar");
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <select
        value={status}
        disabled={isPending}
        onChange={(event) => void updateStatus(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#081120] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
