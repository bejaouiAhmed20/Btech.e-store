import { ORDER_STATUS_LABELS, type OrderStatus } from '@/features/orders/types'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  contacted: 'bg-sky-50 text-sky-700',
  confirmed: 'bg-primary-50 text-primary-700',
  in_progress: 'bg-violet-50 text-violet-700',
  completed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-600',
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        STATUS_STYLES[status],
      )}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  )
}
