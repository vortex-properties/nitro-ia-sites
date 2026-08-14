# Vortex Properties — Landing Pages

Repositório privado da organização `vortex-properties` para hospedar landing pages e sites institucionais leves das empresas/propriedades da Vortex.

## Modelo mental

```text
GitHub Organization: vortex-properties
└── Repository: nitro-ia-sites
    └── sites/
        ├── nitro-ia/
        ├── futura-empresa-a/
        └── futura-empresa-b/
```

A **organização** é o guarda-chuva de propriedade e permissões. Este **repositório** é o contêiner de sites estáticos/landing pages. Cada diretório em `sites/` representa uma propriedade web independente e pode ter seu próprio projeto na Vercel, domínio e histórico de deploy.

## Regra de arquitetura

Use este repositório enquanto a propriedade for essencialmente um site institucional/landing page estático ou de baixa complexidade.

Crie um repositório próprio quando uma propriedade passar a ter aplicação real, backend, banco de dados, autenticação, grande volume de código, equipe/permissões próprias ou ciclo de release independente. Não transforme este repo em monorepo de produtos.

## Estrutura atual

```text
.
├── README.md
├── docs/
│   ├── ORGANIZATION-GUIDE.md
│   ├── ADDING-A-NEW-BUSINESS.md
│   ├── DEPLOYMENT-VERCEL.md
│   └── GIT-WORKFLOW.md
└── sites/
    └── nitro-ia/
        ├── index.html
        ├── 404.html
        ├── termos/
        ├── privacidade/
        ├── cancelamento-e-reembolso/
        ├── assets/
        ├── robots.txt
        ├── site.webmanifest
        ├── favicon.ico
        └── vercel.json
```

## Nitro IA

A primeira propriedade publicada neste repositório é a landing institucional da **Nitro IA**.

Para deploy na Vercel, configure o **Root Directory** do projeto como:

```text
sites/nitro-ia
```

Não há build step. É um site estático.

## Fluxo operacional

1. Alterar arquivos apenas dentro da pasta da propriedade relevante.
2. Conferir localmente ou em Preview Deployment.
3. Fazer commit com mensagem específica.
4. Push/merge em `main` publica a versão de produção quando a Vercel estiver conectada ao branch.
5. Se algo quebrar, usar o histórico do Git/Vercel para voltar ao último estado válido.

Leia os documentos em [`docs/`](./docs/) antes de adicionar uma nova empresa ou alterar a estratégia de organização.

## Convenção de nomes

- pastas de sites: `kebab-case` — ex.: `nitro-ia`, `empresa-x`;
- arquivos: nomes descritivos e estáveis;
- commits: `tipo(escopo): ação` quando útil — ex.: `feat(nitro): add privacy page`;
- assets específicos ficam dentro do próprio site, não em uma pasta global por padrão.

## Segurança

Nunca commitar:

- senhas;
- tokens de API;
- chaves privadas;
- `.env` com segredos;
- dados pessoais de clientes;
- credenciais da Vercel, Stripe, GitHub ou provedores de IA.

Segredos pertencem ao gerenciador de variáveis do provedor correspondente.

## Princípio

A estrutura deve reduzir atrito de publicar e manter sites. Só abstrair ou compartilhar componentes quando houver repetição real entre propriedades; não criar infraestrutura antecipadamente.