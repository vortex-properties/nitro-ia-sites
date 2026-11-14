# Nitro IA — Design System e Motion Direction

> Superfície: landing institucional B2B. Modo: **Persuade**.
> Estado: V2.1 Motion Edition, branch \`feat/nitro-v2-motion\`, novembro de 2026.

## Objetivo
A Nitro vende diagnóstico e implementação de IA em workflows empresariais. Sua apresentação deve mostrar **um processo operacional conectado**, não um chatbot genérico, estatísticas inventadas ou uma ferramenta específica que ainda não é comercialmente adotada.

## Identidade
- **Plano de fundo**: near-black \`#0b0d0c\`, cinza-verde \`#111714\`, creme \`#f3f1eb\` e branco quente \`#fffefa\`.
- **Acento**: laranja \`#ff8a5b\`; o vermelho queimado \`#be4724\` é usado em superfícies claras.
- **Tipo**: Instrument Sans para a narrativa, IBM Plex Mono para estados ou identificação técnica.
- **Composição**: grandes títulos tipográficos, quadro do workflow no hero, conteúdo editorial alternando escuro e claro, arte de marca em laranja.

## Tese do movimento
**Processos ganhando continuidade.** A interação central deve contar como uma entrada é entendida, encaminhada e executada. O movimento representa a transferência de contexto entre estágios, não uma decoração arbitrária.

### Ritmo
1. **Focal**: o quadro operacional no hero muda entre entrada → interpretação → execução, a cada 1.75 s. Há controles de pausar, reproduzir e avançar. Os estados são demonstração visual, não dados reais de cliente.
2. **Continuidade**: as três abas da seção de arquitetura revelam a mudança de estado com transições de máscara/posição. A seleção é exclusivamente iniciada pelo usuário.
3. **Leitura**: barra de progresso mínima no topo e uma linha que avança no método de cinco etapas, sem travar a rolagem.
4. **Feedback**: os diagramas dos cards respondem ao hover, sem deslocar o layout inteiro.
5. **Marca**: a tipografia do painel laranja recebe uma única aparição de entrada, sem ocultar conteúdo se o JavaScript falhar.

### Regras de performance e acessibilidade
- Sem bibliotecas de animação adicionais, canvas pesado, WebGL, scroll hijacking, dependências remotas de JS ou efeitos sonoros.
- Animações automáticas pausam quando a área sai da viewport ou quando a guia perde visibilidade.
- \`prefers-reduced-motion\` desliga movimento decorativo e autoplay; os estágios continuam acessíveis manualmente.
- Botões e abas operam por teclado e são descritos em português; sem layout shift provocado por animações.
- Estados padrão permanecem legíveis com JavaScript desabilitado.
- Respeitar o fato de que mercado, ICP, oferta e workflow comerciais específicos da Nitro ainda não foram canonizados.

## Implementação
- \`index.html\`: estrutura semântica e controles.
- \`assets/css/landing.css\`: identidade V2 e responsividade de base.
- \`assets/js/landing.js\`: menu, seleção e acessibilidade de abas.
- \`assets/css/motion.css\`: camada progressiva de motion V2.1.
- \`assets/js/motion.js\`: estados do workflow, controles, leitura da viewport, pausa e acompanhamento da rolagem.

## Validação executada
- Edge + Playwright: desktop 1440×900, 1024×768; tablets 820×1180 e 768×1024; telefones 390×844, 375×812 e 320×700.
- Suite de interação: autoplay, pausa, avanço, retomada, interrupção fora de tela, abas, linha do método, navegação móvel e redução de movimento.
- Resultados observados: sem exceções de JavaScript, sem overflow horizontal e sem imagens quebradas.
- Capturas em \`C:\Users\Fabricio Lima\Documents\Codex\nitro-motion-qa-20261114\`; testes em \`C:\Users\Fabricio Lima\Documents\Codex\nitro-motion-qa-20261114.cjs\`.
- Motores MCP locais Taste/Impeccable: indisponíveis nesta sessão (429). Foram consultados seus playbooks instalados e realizado teste real via Edge/Playwright, sem alegar execução dos detectores nativos.

## Publicação
Trabalho local, não substitui \`feat/nitro-ia-v2\` nem \`main\`. Confirmar visualmente antes de push, PR ou deploy.
