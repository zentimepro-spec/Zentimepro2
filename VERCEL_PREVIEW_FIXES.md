# Zen Time Pro — Correções do Preview (20/11/2026)

## Projeto identificado
- Projeto Vercel indicado pelo proprietário: `zentimepro2-gd3f`
- Equipe/slug: `douglas-araujo-ecossistema-zens-projects`
- Link: https://vercel.com/douglas-araujo-ecossistema-zens-projects/zentimepro2-gd3f

## Alterações no GitHub
- Os arquivos SVG `public/cursor-zen-arrow.svg` e `public/cursor-zen-hand.svg` substituem o efeito de cursor animado. Não dependem de JS, preservam o cursor de texto e os dispositivos de toque.
- O componente CursorFX foi retirado da navegação e removido.
- A captura real de Promo das Musas está em `public/portfolio/musas-desktop.avif`; a home já referencia exatamente este arquivo.
- `next/image` com `unoptimized` utiliza a cópia local diretamente, sem reprocessar no serviço de otimização de imagens da Vercel.
- O CSS apresenta a captura sem corte, preservando o enquadramento real.

## Deploys
O GitHub registra três status distintos da Vercel para o mesmo repositório:
- `zentimepro2-gd3f`
- `zentimepro2-ece8`
- `zentimepro2`

Os três registraram falha no commit de 20/11/2026. O conector da Vercel autoriza leitura de `zentable`, mas retorna 404 ao consultar os três projetos acima, inclusive o link fornecido explicitamente. Assim **não foi possível ler os logs, modificar as configurações do projeto ou executar um redeploy**. O problema pode envolver limites de builds por muitos projetos vinculados ao mesmo branch; confirmar pelos logs antes de alterar qualquer configuração.

## Verificações quando a conexão for corrigida
1. Autorizar o projeto `zentimepro2-gd3f` na conexão da Vercel deste chat.
2. Vercel → projeto → Deployments → último erro → Build Logs (confirmar a causa real).
3. Conferir se projetos antigos `zentimepro2-ece8` e `zentimepro2` ainda precisam gerar builds para cada commit.
4. Implantar somente o branch `feat/experiencia-imersiva-2026`.
5. Conferir `/portfolio/musas-desktop.avif` (HTTP 200) e `/cursor-zen-arrow.svg` (HTTP 200), depois testar a home.
6. Executar `npm ci && npm run lint && npx tsc --noEmit && npm run build` antes de mesclar.
