import assert from "node:assert/strict";
import { findZenKnowledge, zenCatalogReply, zenWhatsAppLink, ZEN_KNOWLEDGE } from "../src/lib/zen-knowledge.ts";

assert.ok(ZEN_KNOWLEDGE.length >= 15, "Catálogo incompleto");
assert.equal(findZenKnowledge("Qual é o valor da promoção Black Friday?")[0].id, "promocao");
assert.ok(zenCatalogReply("Quanto custa um site?", "/precos").links.length > 0);
assert.ok(zenCatalogReply("CRM para acompanhar leads", "/servicos").message.includes("CRM"));
assert.ok(findZenKnowledge("Quero um sistema de agenda").some(e => e.id === "agenda"));
assert.ok(zenWhatsAppLink("Olá!").startsWith("https://wa.me/5511991650950?text="));
assert.ok(zenCatalogReply("", "/").mode === "catalog");
for (const entry of ZEN_KNOWLEDGE) {
  assert.ok(entry.title && entry.content && entry.links.length, entry.id + " sem conteúdo");
  for (const link of entry.links) assert.ok(link.href.startsWith("/") || link.href.startsWith("https://"), "Link inválido em " + entry.id);
}
console.log("✓  Catálogo Zen, links, promoção, CRM e fallback válidos");
