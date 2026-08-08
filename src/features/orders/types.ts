import type { OrderStatus } from '@/types/database'

export type { OrderStatus }

export interface CustomerOrder {
  id: string
  reference: string
  userId: string | null
  templateId: string
  templateName: string
  templatePrice: number
  templateCurrency: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customizationDetails: string | null
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface CreateOrderInput {
  templateId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customizationDetails?: string
}

export interface CreateOrderResponse {
  id: string
  reference: string
  status: OrderStatus
  createdAt: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'En attente',
  contacted: 'Contacté',
  confirmed: 'Confirmé',
  in_progress: 'En cours',
  completed: 'Terminé',
  cancelled: 'Annulé',
}
