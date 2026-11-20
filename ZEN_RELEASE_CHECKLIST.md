# Zen Time Pro 2.0 — checklist de lançamento (Preview)

Branch: `feat/experiencia-imersiva-2026` — não mesclar na produção sem validação.

## Recursos já implementados em código
- Interface pública redesenhada: home, Serviços, Portfólio, Preços, Sobre, Contato.
- Seis páginas específicas de SEO preservadas com novos painéis interativos.
- Header, footer e cursor contextual compartilhados, com comportamento para mobile e movimento reduzido.
- Mascote Zen vetorial com expressões e assistente de conversa com perguntas e sugestões.
- Catálogo oficial local como fallback e API `/api/zen/chat` para ponte com Cloudflare Worker.
- Fluxo de briefing / contato vinculado ao endpoint existente `/api/leads` e CRM.
- Galeria com Foncare em imagem existente, outros sites públicos em iframe e links diretos; privado TFA nunca exibido automaticamente.
- Script oficial Cloudflare Browser Run para capturas reais desktop/mobile e manifesto `public/portfolio/captures.json`.

## Ativação externa necessária
- [ ] Implantar `cloudflare/zen-worker/` na conta Cloudflare.
- [ ] Criar segredo privado `ZEN_WORKER_SECRET` no Worker e na Vercel (nunca no repositório).
- [ ] Configurar `ZEN_WORKER_URL` na Vercel Preview e conferir retorno `mode: ai`.
- [ ] Habilitar KV/rate limiting e monitorar o consumo de Workers AI.
- [ ] Rodar `npm run portfolio:capture` com credenciais da Cloudflare em ambiente privado.
- [ ] Revisar os PNGs gerados e publicar capturas reais aprovadas, sem dados privados.
- [ ] Validar se os sites aceitam iframe; quando bloquearem, utilizar somente captura validada ou link direto.
- [ ] Confirmar disponibilidade e elegibilidade da Black Friday R$ 297 + domínio e detalhes dos planos.
- [ ] Verificar que o CRM no Preview está configurado e grava leads; usar somente dados fictícios no teste.

## Validação técnica
- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`
- [ ] `npm run test:zen`
- [ ] `npm run build` com variáveis de Preview de teste.
- [ ] `PREVIEW_URL=https://...vercel.app npm run test:preview`.
- [ ] Testar menus, links, galerias, preços, formulários, Zen, ESC/foco e iframe no celular e desktop.
- [ ] Testar fluxo de error handling: Cloudflare indisponível, CRM indisponível, email inválido.
- [ ] Avaliar Core Web Vitals, navegação via teclado e `prefers-reduced-motion`.
- [ ] Verificar a versão publicada antes de qualquer merge na branch de produção.

## Observações
- O GitHub Actions atual encerra as execuções antes de registrar as etapas de job; não há confirmação de build neste ambiente.
- O Worker não foi implantado por este commit (a conta Cloudflare ainda não está conectada a ferramentas deste chat).
- O sistema não grava leads por conversar: só após envio consentido do formulário.
