# Nitro IA — Direção 03 / Editorial Cinemático

> Status: variante completa, revisada e independente.
> Base: \`feat/nitro-v2-motion\` / commit \`f4f8b10\`.
> Branch: \`feat/nitro-v2-editorial-cinematico\`.
> Não substituir a produção nem as outras duas alternativas sem aprovação.

## Princípio criativo

**Uma landing como filme editorial de design.** A Nitro não está vendendo dashboards ou um produto validado específico: sua direção é implementar IA para resolver gargalos em workflows reais. A narrativa precisa ser premium sem simular resultados, clientes, eventos operacionais ou integrações em funcionamento.

### Diferenças

- **Fluxo Vivo (1):** o visitante acompanha um workflow, em cinco capítulos.
- **Command Center (2):** o visitante controla uma topologia operacional e seus módulos.
- **Editorial Cinemático (3):** o visitante sente uma transformação visual abstrata: Fragmentação → Convergência → Continuidade. Menos painéis, mais tipografia monumental, forma, contraste e ritmo.

## Identidade visual

- Cores: near-black \`#111714\`, papel \`#f1efe6\`, verde \`#657668\`, laranja Nitro \`#ff8c64\`, laranja escuro \`#b84927\`.
- Fonte de narrativa: Instrument Sans; metadados: IBM Plex Mono.
- Linguagem: cartazes tipográficos com grandes campos de cor, diagramas geométricos próprios em SVG/CSS, linhas editoriais, grades discretas e espaço negativo.

## Momentos principais

1. **Hero cinematográfico** com headline “O trabalho precisa fluir” e escultura geométrica autoral de três linhas de contexto convergindo. Uma única entrada de headline e desenho inicial da linha, com respeito a movimento reduzido.
2. **Premissa** como uma página de revista, articulando o problema da descontinuidade.
3. **Filme interativo em 3 atos** com palco sticky em desktop, atualizações baseadas na rolagem nativa e links diretos aos atos:
   - I / Fragmentação: quatro fragmentos visuais dispersos;
   - II / Convergência: regras e etapas alinhadas;
   - III / Continuidade: uma única linha contínua sobre o laranja Nitro.
4. **Soluções abstratas** em três cartazes sem resultados simulados.
5. **Manifesto** tipográfico com um único grande campo de cor.
6. **Método** em quatro linhas editoriais.
7. **Convite** final com CTA real para o WhatsApp.

## Regras técnicas

- Sem WebGL, bibliotecas de animação, áudio, cursores customizados, scroll hijack ou métricas fictícias.
- O scroll avança os atos por \`requestAnimationFrame\`, alterando apenas um dataset e uma barra de progresso.
- Controles de cada ato são links; navegação por teclado preservada.
- No mobile (até 760 px), os três atos se tornam cartazes independentes, sem sticky ou motion oneroso.
- \`prefers-reduced-motion\` elimina movimento decorativo e mantém todas as cenas e interações legíveis.
- **Sem JavaScript:** regra explícita em \`<noscript>\` exibe todos os atos em ordem, legíveis e sem rolagem capturada.
- Não copiar provas sociais, pricing ou ofertas não confirmadas: o Business Brain mantém vertical, ICP, workflow e oferta específicos da Nitro em descoberta.

## Arquivos

- \`sites/nitro-ia/index.html\` — markup semântico, narrativa e atos.
- \`sites/nitro-ia/assets/css/editorial.css\` — design completo, responsividade e motion.
- \`sites/nitro-ia/assets/js/editorial.js\` — progresso da página, scroll de três atos e navegação entre capítulos.
- \`sites/nitro-ia/assets/js/landing.js\` — menu móvel existente, reutilizado.
- As páginas jurídicas e seus arquivos foram preservados sem edição.

## Validação

- Preview local: \`http://127.0.0.1:8139/\`.
- Edge via Playwright: 1440×900, 1024×768, 820×1180, 768×1024, 390×844, 375×812, 320×700, e mobile em modo reduzir movimento.
- 44 verificações na suíte principal (troca de atos, seletor de capítulo, ausência de overflow, âncoras, recursos, menu, erros JS).
- 20 verificações adicionais (dimensões das seções, 3 atos sem JavaScript em desktop/mobile).
- Capturas: \`C:\Users\Fabricio Lima\Documents\Codex\nitro-editorial-shots-20261114\`.
- Suítes de QA: \`nitro-editorial-qa-20261114.cjs\` e \`nitro-editorial-final-20261114.cjs\` em \`Documents\Codex\`.
- O motor nativo Taste/Impeccable retornou indisponibilidade (429/404). Foram lidos os playbooks instalados e a validação real foi executada com Edge/Playwright; nenhum detector nativo foi alegado como executado.

## Próximo passo

Revisar visualmente lado a lado com as outras duas direções no workspace local. Não realizar push/merge/deploy de nenhuma variante sem decisão explícita sobre qual caminho seguir.
