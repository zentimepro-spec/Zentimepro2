# Prévias verificáveis do Portfólio

## O que está disponível hoje
- Foncare: captura real já presente em `public/portfolio-foncare.png`.
- Zentable e Promo das Musas: a galeria utiliza uma visualização ao vivo dos sites públicos via iframe, com acesso direto ao endereço original. O embed pode ser impedido por `X-Frame-Options` ou CSP; não há imagem inventada.
- TFA Operacional: somente resumo e link de acesso, sem expor telas internas.

## Como gerar as capturas reais
A captura automatizada está em `scripts/capture-portfolio.mjs`, usando o serviço oficial Cloudflare Browser Run. São necessárias permissões de Browser Rendering na conta. Não coloque tokens no repositório.

```sh
export CLOUDFLARE_ACCOUNT_ID="(identificador de sua conta)"
export CLOUDFLARE_API_TOKEN="(token com permissão específica)"
node scripts/capture-portfolio.mjs
```

O script cria PNGs em `public/portfolio/` para Foncare, Zentable e Promo das Musas, em desktop e mobile. Revise visualmente se renderizaram corretamente e publique os arquivos na branch de preview. Após aprovação, a galeria pode utilizar os arquivos estáticos como prévia principal — sem depender de iframe.

**TFA e outros sistemas com acesso restrito**: utilize somente ambiente de demonstração autorizado, dados inteiramente fictícios e capturas aprovadas. A automação não deve tentar login em contas de clientes.

Possíveis falhas: bloqueio de acesso, limite de minutos do plano Cloudflare, mudança da API, cookies ou páginas protegidas. Não é permitido inventar screenshots quando uma captura falha.
