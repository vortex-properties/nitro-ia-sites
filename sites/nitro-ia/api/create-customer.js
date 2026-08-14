import { getStripe, json, requireAdmin } from './_stripe.js';

const ALLOWED_TAX_ID_TYPES = new Set(['br_cpf', 'br_cnpj']);

export async function POST(request) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const stripe = getStripe();
  const body = await request.json();
  const { name, email, phone, taxId, taxIdType, metadata = {} } = body;

  if (!name || !email) {
    return json({ error: 'name and email are required' }, 400);
  }

  if (taxIdType && !ALLOWED_TAX_ID_TYPES.has(taxIdType)) {
    return json({ error: 'taxIdType must be br_cpf or br_cnpj' }, 400);
  }

  const customer = await stripe.customers.create({
    name,
    email,
    phone: phone || undefined,
    metadata,
  });

  if (taxId && taxIdType) {
    await stripe.customers.createTaxId(customer.id, {
      type: taxIdType,
      value: taxId,
    });
  }

  return json({ customerId: customer.id });
}
