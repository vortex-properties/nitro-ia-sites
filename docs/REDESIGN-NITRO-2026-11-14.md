# Nitro IA — redesign institucional (2026-11-14)

## Objetivo
Transformar a landing institucional em uma experiência B2B premium sem inventar prova social, cases, métricas ou resultados.

## Direção visual
- Identidade: near-black `#0b0d0c`, superfícies creme `#f3f1eb`, laranja Nitro `#ff8a5b`.
- Tipografia: Instrument Sans, DM Sans e IBM Plex Mono.
- Homepage: composição editorial, painel de workflow em HTML/CSS, cards de atendimento/automação/integração, método em cinco etapas, seção B2B tipográfica e contato.
- UX: menu responsivo, painel com três tabs acessíveis por teclado, microinterações e suporte a movimento reduzido.
- Não foram criados clientes, preços, indicadores, depoimentos, garantias ou integrações específicas não comprovadas.

## Arquivos alterados
- `sites/nitro-ia/index.html` — nova landing.
- `sites/nitro-ia/assets/css/landing.css` — sistema visual e responsividade.
- `sites/nitro-ia/assets/js/landing.js` — menu e tabs.
- `sites/nitro-ia/assets/css/legal-polish.css` — sistema visual complementar das páginas legais.
- `sites/nitro-ia/termos/index.html`, `privacidade/index.html` e `cancelamento-e-reembolso/index.html` — apenas referências de estilo e marca; corpo jurídico preservado.
- Os arquivos antigos `styles.css` e `main.js` permanecem íntegros.

## Contexto comercial e compatibilidade
- Público: empresas brasileiras B2B.
- Mercado, vertical, workflow específico, ICP e oferta comercial ainda não foram canonizados no Business Brain. A antiga hipótese de clínicas de estética não é apresentada como escolha atual.
- WhatsApp, e-mail e páginas jurídicas preservados.
- Âncoras legadas preservadas: `#o-que-fazemos`, `#como-funciona`, `#aplicacoes`.

## Validação local
- Servidor HTTP de pré-visualização: `http://127.0.0.1:8137/` no PC autorizado.
- Edge + Playwright: 1440×900, 1024×768, 820×1180, 768×1024, 390×844, 375×812 e 320×700.
- Sem overflow horizontal, erros de JavaScript, imagens quebradas nem âncoras inválidas.
- Verificados menu móvel, Escape, clique e teclado dos painéis.
- Três páginas jurídicas verificadas no desktop e no celular: status HTTP 200, estilo carregado, menu funcional, sem overflow ou erros.
- Screenshots locais: `C:\Users\Fabricio Lima\Documents\Codex\nitro-site-shots-20261114`.
- O verificador original do Taste Skill Local MCP não ficou disponível (resposta 429); os testes de navegador foram executados por Playwright/Edge.

## Publicação
Alterações na branch local `design/nitro-aaa-redesign`, ainda sem commit, push, merge ou deploy. Revisar no navegador antes de publicar. O Root Directory na Vercel é `sites/nitro-ia`.

## Próximas melhorias respaldadas por evidência
Publicar cases, indicadores, demonstrações de implementação real ou detalhes de oferta somente com comprovação, consentimento quando aplicável e decisão comercial consolidada.
