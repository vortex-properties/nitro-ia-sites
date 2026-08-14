import { getStripe, json } from './_stripe.js';

export async function POST(request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, 500);
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return json({ error: 'Missing stripe-signature header' }, 400);
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    return json({ error: `Invalid webhook signature: ${error.message}` }, 400);
  }

  switch (event.type) {
    case 'invoice.paid':
    case 'invoice.payment_failed':
    case 'invoice.overdue':
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      console.log('[stripe-webhook]', event.type, event.data.object.id);
      break;
    default:
      console.log('[stripe-webhook] unhandled', event.type);
  }

  return json({ received: true });
}
