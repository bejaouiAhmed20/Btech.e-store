import { useCallback, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { OrderForm, type OrderSuccessState } from '@/features/orders/components/OrderForm'
import type { WebsiteTemplate } from '@/data/templates'

interface OrderModalProps {
  template: WebsiteTemplate | null
  onClose: () => void
}

export function OrderModal({ template, onClose }: OrderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<OrderSuccessState | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    if (isSubmitting) return
    onClose()
    // Reset after the close animation has had time to run.
    setTimeout(() => setResult(null), 300)
  }, [isSubmitting, onClose])

  return (
    <Modal isOpen={!!template} onClose={handleClose} labelledBy="order-modal-title">
      {template && !result && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50 p-4">
            <img
              src={template.image}
              alt={template.name}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p id="order-modal-title" className="truncate font-display text-base font-semibold text-ink-900">
                {template.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-500">
                {template.category.join(' · ')}
              </p>
            </div>
            <div className="shrink-0 text-right">
              {template.badge === 'promo' && template.previousPrice && (
                <p className="text-xs text-red-500 line-through">
                  {template.previousPrice} {template.currency}
                </p>
              )}
              <p className="text-lg font-extrabold text-primary-600">
                {template.price} {template.currency}
              </p>
            </div>
          </div>

          <OrderForm template={template} onSuccess={setResult} onSubmittingChange={setIsSubmitting} />
        </div>
      )}

      {template && result && (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={28} />
          </span>
          <h3 id="order-modal-title" className="font-display text-xl font-semibold text-ink-900">
            Votre commande a bien été enregistrée
          </h3>
          <p className="font-mono text-sm text-ink-500">Référence : {result.order.reference}</p>
          <p className="max-w-sm text-sm text-ink-600">
            Notre équipe vous contactera prochainement pour confirmer les détails de votre projet.
          </p>


          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" onClick={handleClose}>
              Fermer
            </Button>
            {user && (
              <Button
                onClick={() => {
                  handleClose()
                  navigate('/account')
                }}
              >
                Voir mes commandes
              </Button>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
