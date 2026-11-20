"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ZenAssistant } from "./ZenAssistant";
import { CursorFX } from "./CursorFX";

export function PublicChrome({ children }: { children: ReactNode }) {
  const path = usePathname() || "/";
  if (path === "/crm" || path.startsWith("/crm/")) {
    // Ferramentas internas preservam seus layouts, logins e interações nativas.
    return <>{children}</>;
  }
  return (
    <>
      <SiteHeader />
      <div className="studio-root">{children}</div>
      <SiteFooter />
      <ZenAssistant />
      <CursorFX />
    </>
  );
}
