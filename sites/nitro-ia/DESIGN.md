# Nitro IA — Direction 02: COMMAND CENTER

> Estado: conceito interativo implementado, versão de comparação **V2.2 / Command Center**.
> Branch: \`feat/nitro-v2-command-center\` (base independente \`feat/nitro-v2-motion\`, commit \`f4f8b10\`).
> Não corresponde a um sistema Nitro real em produção nem a dados de clientes.

## Conceito

**Nitro IA como centro de orquestração.** Enquanto a alternativa **Fluxo Vivo** acompanha o caminho de uma oportunidade em capítulos, o **Command Center** coloca o visitante na posição de operador.

A composição é uma única identidade visual: grafite esverdeado, creme escuro, laranja Nitro como energia de transmissão, tipografia Instrument Sans e metadados IBM Plex Mono. O diagrama geométrico e suas conexões são o elemento de grande escala. Não há imagens de clientes, métricas ou cases fictícios.

## Narrativa e principais superfícies

1. **Hero — Intelligence at the center:** headline editorial com CTA comercial real e mapa de topologia. Quatro módulos clicáveis orbitam um núcleo Nitro. A seleção muda linhas de sinais, estados de botões e o módulo escolhido.
2. **Sistema operacional — Controle total:** demonstração conceitual explorável em quatro módulos (Captura, Inteligência, Integração, Execução). A mesma escolha sincroniza topologia do hero, módulo e trilha de etapas. Visualização não está conectada a APIs ou CRM.
3. **Soluções — Continuidade:** blocos editoriais explicam como informação compartilhada evita contextos quebrados.
4. **Método — Critério e execução:** etapas de diagnóstico, arquitetura, implementação e medição sem promessas não validadas.
5. **Contato — Conversão:** CTA explícito para o WhatsApp existente, sem esconder a ação primária.

## Comportamentos implementados

- Seleção sincronizada entre mapa do hero e painel de comandos, por clique/toque e teclado.
- Simulação de uma sequência conceitual de quatro estados (3,7 s/estado) com pausa/reprodução.
- Botão de avançar manualmente o módulo; seleção explícita pausa autoplay.
- Desenho de rota por SVG/CSS e estados de botão acessíveis \`aria-pressed\`.
- Autoplay pausa quando as interfaces deixam de estar visíveis ou quando a aba é ocultada.
- Modo tela cheia pelo Fullscreen API em desktop; botão é omitido quando indisponível.
- Respeito a \`prefers-reduced-motion\`: remove loops e mantém seleção manual.
- Conteúdo estático legível sem JS; sem scroll hijacking, WebGL, áudio, frameworks ou dependência externa de JavaScript.

## Arquivos

- \`index.html\` — narrativa, cabeçalho, menu, controles e arquitetura semântica.
- \`assets/css/command.css\` — direção visual completa; não importa estilos da alternativa anterior.
- \`assets/js/command.js\` — módulos sincronizados, ciclo de demonstração, pausa, Fullscreen API e controles.
- \`assets/js/landing.js\` — menu móvel original reutilizado.
- Páginas jurídicas e seus assets continuam independentes e inalterados.

## Integridade comercial

A Nitro ainda não tem vertical, ICP, workflow, oferta e promessa comercial específica canonizados. Portanto a UI é explicitamente identificada como **modelo conceitual**; não exibe contagens, volume, uptime, eventos de cliente, conversões, integração funcional com terceiros ou receita inventada.

## QA e comparação

A validação foi executada no Edge local por Playwright usando as suítes:
- \`C:\Users\Fabricio Lima\Documents\Codex\nitro-command-qa-20261114.cjs\`
- \`C:\Users\Fabricio Lima\Documents\Codex\nitro-command-interaction-20261114.cjs\`

Breakpoints verificados: 1440×900, 1280×800, 1024×768, 820×1180, 390×844, 375×812, 320×700 e mobile com reduced motion. Capturas em \`C:\Users\Fabricio Lima\Documents\Codex\nitro-command-shots-20261114\`.

Os motores nativos Taste Skill e Impeccable retornaram indisponibilidade 404/429 nesta sessão; usaram-se os playbooks instalados e validação real com Edge/Playwright em vez de alegar execução dos detectores locais.

## Publicação

Não substituir \`main\` nem \`feat/nitro-ia-v2\` sem revisão visual e autorização. Esta é uma variante independente para comparação; a direção 01 Fluxo Vivo continua preservada em \`feat/nitro-v2-fluxo-vivo\`.
