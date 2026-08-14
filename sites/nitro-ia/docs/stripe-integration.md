# Stripe integration — Nitro IA

## Objetivo

Cobrar serviços B2B personalizados da Nitro IA com Stripe Billing e Stripe Invoicing, mantendo a landing page estática e adicionando apenas Vercel Functions em `/api`.

## Modelo recomendado

1. Criar um `Customer` para cada empresa cliente.
2. Registrar CPF/CNPJ do cliente como Tax ID quando aplicável.
3. Cobrança de implementação/setup: criar e enviar uma Invoice avulsa.
4. Mensalidade/retainer: criar uma Subscription usando um Price recorrente previamente cadastrado no Stripe Dashboard.
5. Processar eventos Stripe via webhook para sincronizar status de pagamento, inadimplência, renovação e cancelamento com o CRM/operação.
6. Não habilitar Stripe Tax automaticamente para a operação brasileira sem confirmar elegibilidade e tratamento fiscal aplicável. A invoice da Stripe não substitui a emissão fiscal brasileira quando houver obrigação de NFSe/NFS-e.

## Endpoints adicionados

### `POST /api/create-customer`

Cria um Customer Stripe. Endpoint administrativo protegido por `NITRO_BILLING_ADMIN_TOKEN`.

Payload exemplo:

```json
{
  "name": "Empresa Exemplo Ltda",
  "email": "financeiro@empresa.com",
  "phone": "+5511999999999",
  "taxIdType": "br_cnpj",
  "taxId": "00000000000000",
  "metadata": {
    "crm_company_id": "abc123"
  }
}
```

### `POST /api/create-invoice`

Cria uma invoice B2B avulsa e envia ao cliente por e-mail.

Payload exemplo:

```json
{
  "customerId": "cus_...",
  "description": "Implementação Nitro IA — Projeto X",
  "amountCents": 1000000,
  "currency": "brl",
  "daysUntilDue": 7,
  "metadata": {
    "contract_id": "ctr_123"
  }
}
```

`amountCents` usa a menor unidade da moeda. Em BRL, `1000000` = R$ 10.000,00.

### `POST /api/create-subscription`

Cria uma assinatura recorrente com cobrança por invoice (`send_invoice`). O `priceId` deve existir previamente no Stripe Dashboard.

Payload exemplo:

```json
{
  "customerId": "cus_...",
  "priceId": "price_...",
  "quantity": 1,
  "daysUntilDue": 7,
  "metadata": {
    "contract_id": "ctr_123"
  }
}
```

### `POST /api/stripe-webhook`

Recebe eventos Stripe e valida a assinatura com `STRIPE_WEBHOOK_SECRET`.

Eventos iniciais tratados:

- `invoice.paid`
- `invoice.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Neste scaffold, os eventos apenas são registrados nos logs. O passo seguinte é persistir/sincronizar esses estados com ClickUp/CRM/Business Brain ou outra fonte operacional.

## Variáveis de ambiente

Configure no projeto Vercel em Development/Preview/Production conforme necessário:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NITRO_BILLING_ADMIN_TOKEN
```

Nunca coloque a Secret Key no frontend, HTML, GitHub, query string ou código cliente.

Comece com `sk_test_...`. Só use `sk_live_...` depois de testar o fluxo completo em modo de teste.

## Configuração no Stripe Dashboard

1. Preencha os dados jurídicos/bancários da conta Stripe.
2. Configure branding de invoices e e-mails.
3. Crie um Product para o serviço recorrente da Nitro.
4. Crie um Price recorrente (por exemplo, mensal) e copie o `price_...`.
5. Em Developers → Webhooks, crie endpoint para:
   `https://SEU-DOMINIO/api/stripe-webhook`
6. Selecione apenas os eventos realmente usados.
7. Copie o signing secret `whsec_...` para `STRIPE_WEBHOOK_SECRET` na Vercel.

## Segurança

Os endpoints de criação de cobrança não são endpoints públicos de checkout. Eles representam operações administrativas e exigem:

```http
Authorization: Bearer <NITRO_BILLING_ADMIN_TOKEN>
```

O webhook não usa esse token; ele é autenticado pela assinatura criptográfica da Stripe.

Para produção, adicione idempotência/persistência de `event.id` antes de ligar os eventos a ações que tenham side effects (CRM, provisionamento, e-mail, etc.).

## Stripe Tax

O código atual não define `automatic_tax`. Isso é proposital.

A elegibilidade e cobertura do Stripe Tax dependem do país-base da empresa e do tipo de venda. Para uma operação baseada no Brasil, não assuma que Stripe Tax resolve os tributos brasileiros ou emissão de NFSe. Trate Stripe Tax e documento fiscal brasileiro como responsabilidades distintas até validação contábil/fiscal.

## Fluxo operacional sugerido para a Nitro

### Projeto high-ticket

```text
Contrato fechado
  ↓
Create Customer
  ↓
Invoice de implementação
  ↓
invoice.paid
  ↓
Kickoff / provisionamento
```

### Retainer recorrente

```text
Customer existente
  ↓
Create Subscription com price mensal
  ↓
Stripe gera invoices recorrentes
  ↓
webhook atualiza CRM/operação
  ↓
renovação / falha / cancelamento
```

## Próximas melhorias

1. Sincronizar Customer IDs, Invoice IDs e Subscription IDs com o CRM.
2. Persistir `event.id` para idempotência de webhook.
3. Implementar uma UI administrativa simples ou automação interna para gerar cobranças sem curl.
4. Adicionar Quotes se a Nitro quiser transformar proposta comercial em invoice/subscription dentro do Stripe.
5. Definir processo fiscal/NFSe separado com contador e provedor compatível, se necessário.
6. Só depois considerar pagamento self-service na landing page; para venda consultiva high-ticket, ele não é o gargalo inicial.

## Referências oficiais

- https://docs.stripe.com/billing
- https://docs.stripe.com/invoicing
- https://docs.stripe.com/webhooks
- https://docs.stripe.com/tax
- https://docs.stripe.com/tax/supported-countries
- https://vercel.com/docs/functions
