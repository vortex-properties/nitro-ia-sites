# Organization Guide — vortex-properties

## Objetivo

`vortex-properties` é o guarda-chuva GitHub para propriedades web institucionais das empresas. A organização controla propriedade, acesso e agrupamento; os repositórios controlam código e histórico.

## Estrutura adotada agora

`nitro-ia-sites` funciona como contêiner de sites estáticos/landing pages:

```text
sites/<slug-da-empresa>/
```

Cada site é tratado como uma unidade de deploy independente na Vercel usando **Root Directory**.

## Quando manter um site neste repo

Mantenha aqui quando for principalmente:

- landing page;
- site institucional;
- páginas legais;
- microsite estático;
- front-end simples sem ciclo de produto próprio.

## Quando criar repo próprio

Separe quando houver um ou mais destes sinais:

- backend/API relevante;
- autenticação;
- banco de dados;
- aplicação com releases frequentes;
- equipe/permissões próprias;
- dependências complexas;
- risco operacional diferente;
- necessidade clara de CI/CD separado.

A regra é isolamento por necessidade real, não por estética arquitetural.

## Convenções

- organização: propriedade macro;
- repo: unidade de código/governança;
- `sites/<slug>`: unidade de site/deploy estático;
- slug em `kebab-case`;
- assets ficam dentro do site que os usa;
- nenhum segredo no Git.

## Exemplo futuro

```text
vortex-properties/
├── nitro-ia-sites/
│   └── sites/
│       ├── nitro-ia/
│       └── outra-landing/
└── produto-complexo-x/   # repo próprio quando houver justificativa
```

## Princípio de evolução

Não criar pacote compartilhado, framework interno ou design-system package apenas porque duas pastas parecem semelhantes. Primeiro acumular repetição real; depois extrair o que de fato se repete.
