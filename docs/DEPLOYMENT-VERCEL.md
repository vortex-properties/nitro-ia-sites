# Deployment — Vercel

## Nitro IA

### Primeira configuração

1. Na Vercel, escolha **Add New → Project**.
2. Importe `vortex-properties/nitro-ia-sites`.
3. Configure:

```text
Root Directory: sites/nitro-ia
Framework Preset: Other / Static
Build Command: vazio
Output Directory: vazio
Install Command: vazio
```

4. Faça o deploy.
5. Depois conecte o domínio em **Project → Settings → Domains**.

O arquivo `sites/nitro-ia/vercel.json` contém configurações específicas do site.

## Produção vs Preview

- `main` → produção, quando configurado assim no projeto;
- branches/PRs → Preview Deployments;
- teste mudanças relevantes no Preview antes de mergear.

## Novo site no mesmo repo

Crie **outro projeto Vercel** apontando para o mesmo repositório, alterando apenas o Root Directory:

```text
sites/<novo-slug>
```

Isso mantém deploy e domínio isolados sem obrigar um repo novo para cada landing estática.

## Rollback

Duas rotas seguras:

1. **Vercel:** promover/redeployar um deployment anterior conhecido como bom.
2. **Git:** reverter o commit defeituoso e deixar a Vercel publicar o novo estado.

Evite editar produção manualmente fora do Git; o repositório deve continuar sendo a fonte de verdade do site.

## Variáveis e segredos

Se futuramente um site usar variáveis:

- configure-as em Vercel Project Settings;
- nunca salve valores secretos no repo;
- um `.env.example` pode documentar nomes sem valores sensíveis.
