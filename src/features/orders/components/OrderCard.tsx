import { getTemplateById } from '@/data/templates'
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge'
import type { CustomerOrder } from '@/features/orders/types'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function OrderCard({ order }: { order: CustomerOrder }) {
  const template = getTemplateById(order.templateId)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:flex-row sm:items-start">
      {template && (
        <img
          src={template.image}
          alt={order.templateName}
          className="h-20 w-full shrink-0 rounded-xl object-cover sm:h-20 sm:w-28"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-ink-900">{order.templateName}</h3>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
          <span className="font-mono">{order.reference}</span>
          <span>{formatDate(order.createdAt)}</span>
          <span className="font-semibold text-primary-600">
            {order.templatePrice} {order.templateCurrency}
          </span>
        </div>

        {order.customizationDetails && (
          <p className="whitespace-pre-line text-sm text-ink-600">{order.customizationDetails}</p>
        )}
      </div>
    </div>
  )
}
