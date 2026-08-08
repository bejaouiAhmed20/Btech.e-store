// supabase/functions/create-order/index.ts
//
// Deno Edge Function. Deploy with:
//   supabase functions deploy create-order
//
// This function is the ONLY writer of the `orders` table for customer-facing
// order creation. It never trusts a price submitted by the browser: the
// authoritative price/name/currency always come from TRUSTED_TEMPLATES below.
//
// Required secrets (set with `supabase secrets set`, see docs/SUPABASE_SETUP.md):
//   SUPABASE_URL              — auto-provided by the Supabase runtime
//   SUPABASE_SERVICE_ROLE_KEY — auto-provided by the Supabase runtime
// Neither is ever exposed to the frontend.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

/**
 * Trusted, server-side template price map. This intentionally duplicates a
 * subset of src/data/templates.ts (name/price/currency only). If this
 * duplication becomes hard to maintain, replace it with a `templates` table
 * (see project brief §11) — either way, the browser must never be the
 * source of truth for price.
 */
const TRUSTED_TEMPLATES: Record<string, { name: string; price: number; currency: string }> = {
  'volto-green': { name: 'Volto Green', price: 199, currency: 'DT' },
  'la-lanterne': { name: 'La Lanterne', price: 199, currency: 'DT' },
  'mohamed-amin-wedding': { name: 'Mohamed & Amin Wedding', price: 139, currency: 'DT' },
  'bella-vista': { name: 'Bella Vista', price: 149, currency: 'DT' },
  'cafe-lumiere': { name: 'Café Lumière', price: 199, currency: 'DT' },
  'chene-et-sauge': { name: 'Chêne & Sauge', price: 149, currency: 'DT' },
  'olivier-jasmin': { name: 'Olivier & Jasmin', price: 129, currency: 'DT' },
  'wonder-land': { name: 'Wonder Land', price: 129, currency: 'DT' },
  'ahmed-maram-wedding': { name: 'Ahmed & Maram Wedding', price: 99, currency: 'DT' },
  'simple-wedding-invitation': { name: 'Simple Wedding Invitation', price: 99, currency: 'DT' },
}

interface CreateOrderPayload {
  templateId?: unknown
  customerName?: unknown
  customerEmail?: unknown
  customerPhone?: unknown
  customizationDetails?: unknown
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  let payload: CreateOrderPayload
  try {
    payload = await req.json()
  } catch {
    return jsonResponse({ error: 'invalid_payload', message: 'Corps de requête invalide.' }, 400)
  }

  const { templateId, customerName, customerEmail, customerPhone, customizationDetails } = payload

  // ── Validate the payload (mirrors the frontend Zod schema; never trust the client) ──
  if (
    !isNonEmptyString(templateId, 100) ||
    !isNonEmptyString(customerName, 80) ||
    !isNonEmptyString(customerEmail, 254) ||
    !isNonEmptyString(customerPhone, 20)
  ) {
    return jsonResponse(
      { error: 'invalid_payload', message: 'Certaines informations du formulaire sont invalides.' },
      400,
    )
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test((customerEmail as string).trim())) {
    return jsonResponse({ error: 'invalid_payload', message: 'Adresse e-mail invalide.' }, 400)
  }

  if (
    customizationDetails !== undefined &&
    (typeof customizationDetails !== 'string' || customizationDetails.length > 2000)
  ) {
    return jsonResponse({ error: 'invalid_payload', message: 'Message de personnalisation invalide.' }, 400)
  }

  const trustedTemplate = TRUSTED_TEMPLATES[templateId as string]
  if (!trustedTemplate) {
    return jsonResponse({ error: 'unknown_template', message: "Ce modèle n'existe pas." }, 400)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

  // ── Determine the authenticated user (if any) from the caller's own JWT ──
  // We never accept a user id from the request body — only from a verified
  // Supabase session token, so the browser cannot spoof order ownership.
  let userId: string | null = null
  const authHeader = req.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length)
    const { data: userData } = await supabaseAdmin.auth.getUser(token)
    userId = userData.user?.id ?? null
  }

  const { data: inserted, error } = await supabaseAdmin
    .from('orders')
    .insert({
      user_id: userId,
      template_id: templateId as string,
      template_name: trustedTemplate.name,
      template_price: trustedTemplate.price,
      template_currency: trustedTemplate.currency,
      customer_name: (customerName as string).trim(),
      customer_email: (customerEmail as string).trim().toLowerCase(),
      customer_phone: (customerPhone as string).trim(),
      customization_details: customizationDetails ? (customizationDetails as string).trim() : null,
    })
    .select('id, reference, status, created_at')
    .single()

  if (error || !inserted) {
    console.error('create-order insert failed:', error?.message)
    return jsonResponse(
      { error: 'insert_failed', message: "Impossible d'enregistrer votre commande pour le moment." },
      500,
    )
  }

  return jsonResponse(
    {
      id: inserted.id,
      reference: inserted.reference,
      status: inserted.status,
      createdAt: inserted.created_at,
    },
    200,
  )
})
