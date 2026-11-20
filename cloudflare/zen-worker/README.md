# Zen — Cloudflare Worker

API privada para o assistente do site da Zen Time Pro. O navegador **nunca** fala diretamente com o Worker e nunca recebe o segredo.

## Estado da implantação — 20/11/2026

- **Cloudflare Worker implantado:** `zen-assistant-api`, conta `2f4b2f7fdd7ebe21b581511b4b3192a8`.
- **Endereço configurado:** `https://zen-assistant-api.consultor-douglasaraujo.workers.dev/chat`.
- **Modelo:** `@cf/zai-org/glm-4.7-flash`.
- **Verificado via API Cloudflare:** implantação, binding `AI`, existência de `ZEN_WORKER_SECRET` e habilitação de `workers.dev`.
- **Não verificado:** resposta end-to-end do endpoint e integração do Preview da Vercel, pois o projeto `Zentimepro2` não está exposto nas contas Vercel conectadas.
- **Segredo protegido:** foi gerado no momento do deploy sem gravação no Git e sem expor seu valor. Como segredo não é recuperável pela API, configure um segredo novo e igual **no Worker e na Vercel ao conectar o projeto**, usando ambientes seguros e sem enviá-lo na conversa.
- A versão atualmente implantada é um bundle autocontido gerado do catálogo de 17 tópicos (`src/lib/zen-knowledge.ts`); mudanças futuras nessa base exigem nova implantação do Worker.
- **Não usar** o token Cloudflare previamente compartilhado em mensagem; ele deve permanecer revogado.

## Conta Cloudflare

O Account ID informado já está configurado em `wrangler.jsonc`. Ele é um identificador de conta, não uma credencial de autenticação. A configuração da conta ainda precisa ser autenticada no terminal ou pelo painel Cloudflare.

**Segurança:** qualquer token previamente colado em uma conversa deve ser revogado e substituído. Nunca use o token da Cloudflare como `ZEN_WORKER_SECRET`.

## Implantação manual

1. Acesse sua conta Cloudflare com permissão para criar Workers.
2. Na raiz do repositório, rode `npx wrangler login` e `npx wrangler deploy --config cloudflare/zen-worker/wrangler.jsonc`. O comando usará o Account ID já registrado no arquivo de configuração. Se houver mais de uma conta, confirme que a autenticação tem acesso a essa conta.
3. Configure um segredo longo: `npx wrangler secret put ZEN_WORKER_SECRET --config cloudflare/zen-worker/wrangler.jsonc`. Nunca envie o segredo ao GitHub.
4. Na Vercel, defina **apenas no ambiente server-side** `ZEN_WORKER_URL=https://SEU-WORKER.workers.dev/chat` e `ZEN_WORKER_SECRET` com o mesmo valor.
5. Reimplante a preview. A rota `/api/zen/chat` passa a usar Workers AI; sem configuração, responde com o catálogo local.

Opcional: vincule um namespace KV à variável `ZEN_RATE` no painel do Worker para limitar aproximadamente 15 mensagens/minuto por identificador anonimizado. Para limites rigorosos em alta escala, use Durable Objects ou Rate Limiting dedicado.

Modelo padrão `@cf/zai-org/glm-4.7-flash`, substituível pelo secret/text variable `ZEN_MODEL` depois de testes e confirmação de custos/disponibilidade. **Não inclua dados privados** na base de conhecimento pública em `src/lib/zen-knowledge.ts`.

O Worker usa somente informações curadas do código. Não lê o banco interno e não registra leads. Leitura de páginas e atualização de documentos devem ser aprovadas no catálogo, que mantém preços e status auditáveis.

## Segurança e privacidade

- Endpoint privado com bearer secret servidor→servidor.
- Histórico limitado às últimas mensagens; não armazenado permanentemente.
- Entrada truncada; base de conhecimento factual e links autorizados.
- A rota Next já aplica um limite aproximado de requisições, origem e tamanho.
- Antes de lançar em escala, aplique controle de abuso persistente e monitore consumo de Neurons.
