import { supabase } from '@/lib/supabase'
import type { CreateOrderInput, CreateOrderResponse, CustomerOrder } from '@/features/orders/types'
import type { Database } from '@/types/database'

export class OrderServiceError extends Error {}

const FRIENDLY_MESSAGES: Record<string, string> = {
  invalid_payload: 'Certaines informations du formulaire sont invalides. Veuillez vérifier vos réponses.',
  unknown_template: "Ce modèle de site n'est plus disponible. Veuillez rafraîchir la page.",
  rate_limited: 'Trop de tentatives. Veuillez patienter quelques instants avant de réessayer.',
}

function toFriendlyMessage(code: string | undefined, fallback: string): string {
  if (code && FRIENDLY_MESSAGES[code]) return FRIENDLY_MESSAGES[code]
  return fallback
}

/**
 * Submits an order through the `create-order` Edge Function. The function is the
 * only trusted writer of `orders` — it determines the authoritative template price
 * and, when available, attaches the authenticated user id itself. The browser
 * never sends a price.
 */
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResponse> {
  const { data: sessionData } = await supabase.auth.getSession()

  const { data, error } = await supabase.functions.invoke<{
    id: string
    reference: string
    status: CreateOrderResponse['status']
    createdAt: string
  }>('create-order', {
    body: input,
    headers: sessionData.session ? { Authorization: `Bearer ${sessionData.session.access_token}` } : undefined,
  })

  if (error) {
    throw new OrderServiceError(
      toFriendlyMessage(undefined, "Impossible d'enregistrer votre commande pour le moment. Veuillez réessayer."),
    )
  }

  if (!data) {
    throw new OrderServiceError("Impossible d'enregistrer votre commande pour le moment. Veuillez réessayer.")
  }

  return {
    id: data.id,
    reference: data.reference,
    status: data.status,
    createdAt: data.createdAt,
  }
}

function mapOrderRow(row: Database['public']['Tables']['orders']['Row']): CustomerOrder {
  return {
    id: row.id,
    reference: row.reference,
    userId: row.user_id,
    templateId: row.template_id,
    templateName: row.template_name,
    templatePrice: row.template_price,
    templateCurrency: row.template_currency,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    customizationDetails: row.customization_details,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Fetches the authenticated customer's own orders, newest first. RLS enforces ownership. */
export async function fetchMyOrders(): Promise<CustomerOrder[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new OrderServiceError('Impossible de charger vos commandes pour le moment.')
  }

  return (data ?? []).map(mapOrderRow)
}

/**
 * Attaches any previous guest orders matching the authenticated, verified email
 * to the current account. Safe to call on every account-page load — it is
 * idempotent server-side (see supabase/migrations).
 */
export async function claimMyGuestOrders(): Promise<number> {
  const { data, error } = await supabase.rpc('claim_my_guest_orders')
  if (error) {
    // Non-fatal: the account page still works, it just won't show newly-claimed
    // guest orders until the next successful call.
    return 0
  }
  return data ?? 0
}
