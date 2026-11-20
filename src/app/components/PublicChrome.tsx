"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { ZenAssistant } from "./ZenAssistant";
import { CursorFX } from "./CursorFX";

export function PublicChrome({ children, header, footer }: { children: ReactNode; header: ReactNode; footer: ReactNode }) {
  const path = usePathname() || "/";
  if (path === "/crm" || path.startsWith("/crm/")) {
    // Ferramentas internas preservam seus layouts, logins e interações nativas.
    return <>{children}</>;
  }
  return (
    <>
      {header}
      <div className="studio-root">{children}</div>
      {footer}
      <ZenAssistant />
      <CursorFX />
    </>
  );
}
