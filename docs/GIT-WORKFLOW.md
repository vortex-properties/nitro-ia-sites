# Git Workflow

## Objetivo

Manter mudanças rastreáveis e reversíveis sem burocracia desnecessária.

## Mudança pequena e de baixo risco

Exemplos: typo, telefone, texto simples, imagem.

Fluxo aceitável:

```text
alterar → conferir → commit → main
```

## Mudança visual/estrutural relevante

Exemplos: redesign, nova seção, mudança de navegação, JS novo, páginas legais.

Prefira:

```text
branch → alterações → Preview Vercel → revisão → merge em main
```

## Nomes de branch

```text
feat/nitro-new-section
fix/nitro-mobile-nav
content/nitro-copy-update
```

## Commits

Mensagens específicas, por exemplo:

```text
feat(nitro): add diagnostic section
fix(nitro): repair mobile navigation
content(nitro): update commercial copy
docs: update deployment guide
```

Não precisa perseguir perfeição de Conventional Commits; o objetivo é permitir entender o histórico sem abrir cada diff.

## Escopo

Uma mudança na Nitro deve ficar preferencialmente em `sites/nitro-ia/**`. Evite commits que alterem várias empresas sem necessidade.

## Rollback com segurança

Para desfazer algo publicado, prefira **revert** do commit em vez de reescrever histórico compartilhado.

## Fonte de verdade

O conteúdo publicado deve corresponder ao Git. Se uma alteração foi feita direto na Vercel ou em outro lugar, traga-a para o repositório ou descarte-a; não mantenha dois estados concorrentes.
