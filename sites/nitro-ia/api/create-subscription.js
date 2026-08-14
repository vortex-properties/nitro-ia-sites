import { getStripe, json, requireAdmin } from './_stripe.js';

export async function POST(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const stripe = getStripe();
  const body = await request.json();
  const {
    customerId,
    priceId,
    quantity = 1,
    daysUntilDue = 7,
    metadata = {},
  } = body;

  if (!customerId || !priceId || !Number.isInteger(quantity) || quantity <= 0) {
    return json({ error: 'customerId, priceId and positive integer quantity are required' }, 400);
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId, quantity }],
    collection_method: 'send_invoice',
    days_until_due: daysUntilDue,
    metadata,
  });

  return json({
    subscriptionId: subscription.id,
    status: subscription.status,
    latestInvoiceId:
      typeof subscription.latest_invoice === 'string'
        ? subscription.latest_invoice
        : subscription.latest_invoice?.id || null,
  });
}
