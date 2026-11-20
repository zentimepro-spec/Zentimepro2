/**
 * Validação HTTP básica de um Preview já publicado.
 * PREVIEW_URL deve apontar explicitamente para a URL de preview autorizada.
 * Não faz POST e não utiliza dados reais.
 */
import assert from "node:assert/strict";
const base = process.env.PREVIEW_URL;
assert.ok(base, "Defina PREVIEW_URL para executar o smoke test.");
const url = new URL(base);
assert.equal(url.protocol, "https:", "Use uma URL HTTPS");
const paths = ["/", "/servicos", "/portfolio", "/precos", "/sobre", "/contato",
  "/servicos/landing-pages", "/servicos/crm-comercial", "/servicos/sistemas-web",
  "/servicos/landing-page-com-whatsapp", "/servicos/sistema-de-agenda-para-profissionais",
  "/servicos/criacao-de-sites-em-sao-paulo"];
let passed = 0;
for (const path of paths) {
  const target = new URL(path, url);
  const res = await fetch(target, { signal: AbortSignal.timeout(18000), redirect: "manual" });
  if (!res.ok) {
    console.error("✗", path, "HTTP", res.status, "(Preview pode estar protegido por autenticação)");
    process.exitCode = 1;
    continue;
  }
  const html = await res.text();
  if (!html.includes("<h1")) {
    console.error("✗", path, "sem H1 no HTML renderizado");
    process.exitCode = 1;
  } else { console.log("✓", path, res.status); passed++; }
}
console.log("Rotas públicas verificadas:", passed, "de", paths.length);
