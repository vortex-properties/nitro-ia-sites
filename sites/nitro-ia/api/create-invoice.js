import { getStripe, json, requireAdmin } from './_stripe.js';

export async function POST(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const stripe = getStripe();
  const body = await request.json();
  const {
    customerId,
    description,
    amountCents,
    currency = 'brl',
    daysUntilDue = 7,
    metadata = {},
  } = body;

  if (!customerId || !description || !Number.isInteger(amountCents) || amountCents <= 0) {
    return json({ error: 'customerId, description and positive integer amountCents are required' }, 400);
  }

  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: daysUntilDue,
    metadata,
    auto_advance: false,
  });

  await stripe.invoiceItems.create({
    customer: customerId,
    invoice: invoice.id,
    amount: amountCents,
    currency,
    description,
  });

  const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
  const sent = await stripe.invoices.sendInvoice(finalized.id);

  return json({
    invoiceId: sent.id,
    status: sent.status,
    hostedInvoiceUrl: sent.hosted_invoice_url,
    invoicePdf: sent.invoice_pdf,
  });
}
