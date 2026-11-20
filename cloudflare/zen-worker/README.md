# Zen — Cloudflare Worker

API privada para o assistente do site da Zen Time Pro. O navegador **nunca** fala diretamente com o Worker e nunca recebe o segredo.

## Implantação manual

1. Acesse sua conta Cloudflare com permissão para criar Workers.
2. Na raiz do repositório, rode `npx wrangler login` e `npx wrangler deploy --config cloudflare/zen-worker/wrangler.jsonc`.
3. Configure um segredo longo: `npx wrangler secret put ZEN_WORKER_SECRET --config cloudflare/zen-worker/wrangler.jsonc`. Nunca envie o segredo ao GitHub.
4. Na Vercel, defina **apenas no ambiente server-side** `ZEN_WORKER_URL=https://SEU-WORKER.workers.dev/chat` e `ZEN_WORKER_SECRET` com o mesmo valor.
5. Reimplante a preview. A rota `/api/zen/chat` passa a usar Workers AI; sem configuração, responde com o catálogo local.

Opcional: vincule um namespace KV à variável `ZEN_RATE` no painel do Worker para limitar aproximadamente 15 mensagens/minuto por identificador anonimizado. Para limites rigorosos em alta escala, use Durable Objects ou Rate Limiting dedicado.

Model padrão `@cf/meta/llama-3.1-8b-instruct`, substituível pelo secret/text variable `ZEN_MODEL` depois de testes e confirmação de custos/disponibilidade. **Não inclua dados privados** na base de conhecimento pública em `src/lib/zen-knowledge.ts`.

O Worker usa somente informações curadas do código. Não lê o banco interno e não registra leads. Leitura de páginas e atualização de documentos devem ser aprovadas no catálogo, que mantém preços e status auditáveis.

## Segurança e privacidade

- Endpoint privado com bearer secret servidor→servidor.
- Histórico limitado às últimas mensagens; não armazenado permanentemente.
- Entrada truncada; base de conhecimento factual e links autorizados.
- A rota Next já aplica um limite aproximado de requisições, origem e tamanho.
- Antes de lançar em escala, aplique controle de abuso persistente e monitore consumo de Neurons.
