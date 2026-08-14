# Adding a New Business Site

Use este procedimento quando uma nova empresa precisar de landing page/site institucional neste repositório.

## 1. Defina o slug

Exemplo:

```text
empresa-exemplo
```

Crie:

```text
sites/empresa-exemplo/
```

## 2. Estrutura mínima

```text
sites/empresa-exemplo/
├── index.html
├── 404.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── robots.txt
├── favicon.ico
└── vercel.json
```

Inclua páginas legais conforme o modelo comercial e os dados realmente tratados pelo site. Não copie termos jurídicos sem revisar se continuam verdadeiros para a nova empresa.

## 3. Não compartilhar assets por padrão

Logo, CSS, imagens e scripts específicos pertencem à pasta da empresa. Isso evita acoplamento acidental entre marcas.

Extraia ativos comuns apenas quando houver repetição comprovada e custo real de manutenção duplicada.

## 4. Criar projeto na Vercel

Importe o mesmo repositório `vortex-properties/nitro-ia-sites`, mas configure um projeto Vercel separado e escolha:

```text
Root Directory: sites/empresa-exemplo
```

Cada empresa pode então ter domínio, preview deployments e configurações próprias.

## 5. Checklist antes de publicar

- nome da empresa correto;
- e-mail/WhatsApp corretos;
- links funcionando;
- favicon e Open Graph;
- mobile testado;
- páginas legais coerentes;
- nenhum segredo no código;
- nenhuma promessa/case inventado;
- domínio apontado para o projeto correto.

## 6. Quando NÃO usar este repo

Se a nova propriedade já nasce como aplicação/software com backend, autenticação, banco ou lifecycle próprio, crie um repositório dedicado desde o início.
