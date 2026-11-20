/**
 * Captura verdadeira dos projetos PUBLICOS usando Cloudflare Browser Run.
 * Execucao local/CI autorizada: CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN
 * Exclui sistemas privados. Nunca tente capturar telas com credenciais de clientes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!account || !token) {
  console.error("Configure CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN nas variáveis do ambiente.");
  process.exit(1);
}

const targets = [
  { id: "foncare", url: "https://www.foncare.com.br" },
  { id: "zentable", url: "https://www.zentable.com.br" },
  { id: "musas", url: "https://promodasmusas.vercel.app" },
  // TFA Operacional não será capturado automaticamente: pode conter dados internos.
];

const views = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const outputDir = join(process.cwd(), "public", "portfolio");
await mkdir(outputDir, { recursive: true });
let completed = 0;
const captures = { foncare: { desktop: "/portfolio-foncare.png" } };
for (const target of targets) {
  for (const view of views) {
    const endpoint = "https://api.cloudflare.com/client/v4/accounts/" + encodeURIComponent(account) + "/browser-rendering/screenshot";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: target.url,
        viewport: { width: view.width, height: view.height },
        screenshotOptions: { fullPage: false },
        gotoOptions: { waitUntil: "networkidle", timeout: 25000 },
      }),
      signal: AbortSignal.timeout(45000),
    });

    if (!res.ok) {
      console.error("Erro na captura", target.id, view.name, res.status, (await res.text()).slice(0, 350));
      continue;
    }
    const data = Buffer.from(await res.arrayBuffer());
    // API deve retornar PNG binário, não uma resposta JSON de erro.
    const png = data.length > 8 && data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    if (!png) {
      console.error("A resposta não contém PNG válido:", target.id, view.name);
      continue;
    }
    const filename = target.id + "-" + view.name + ".png";
    await writeFile(join(outputDir, filename), data);
    captures[target.id] ||= {};
    captures[target.id][view.name] = "/portfolio/" + filename;
    console.log("Captura real gravada:", filename);
    completed++;
  }
}
await writeFile(join(outputDir, "captures.json"), JSON.stringify(captures, null, 2) + "\n");
console.log("Total de capturas:", completed);
if (!completed) process.exitCode = 1;
