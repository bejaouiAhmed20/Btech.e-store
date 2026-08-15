import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { orderFormSchema, type OrderFormSchema } from '@/features/orders/orderSchema'
import { createOrder, OrderServiceError } from '@/features/orders/orderService'
import { signUpWithEmail } from '@/features/auth/authService'
import { AuthServiceError } from '@/features/auth/authService'
import { useAuth } from '@/features/auth/useAuth'
import { sendOrderEmail } from '@/services/emailService'
import type { WebsiteTemplate } from '@/data/templates'
import type { CreateOrderResponse } from '@/features/orders/types'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20'

export interface OrderSuccessState {
  order: CreateOrderResponse
  accountCreated: boolean
}

interface OrderFormProps {
  template: WebsiteTemplate
  onSuccess: (result: OrderSuccessState) => void
  onSubmittingChange?: (isSubmitting: boolean) => void
}

export function OrderForm({ template, onSuccess, onSubmittingChange }: OrderFormProps) {
  const { user } = useAuth()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customizationDetails: '',
      createAccount: false,
      password: '',
      confirmPassword: '',
    },
  })

  const createAccount = watch('createAccount')

  useEffect(() => {
    onSubmittingChange?.(isSubmitting)
  }, [isSubmitting, onSubmittingChange])

  const onSubmit = async (values: OrderFormSchema) => {
    setSubmitError(null)

    try {
      let accountCreated = false

      // Create the account first (if requested) so the order can be submitted as
      // authenticated when Supabase returns an active session immediately.
      if (values.createAccount && values.password) {
        try {
          await signUpWithEmail({
            email: values.customerEmail,
            password: values.password,
            fullName: values.customerName,
            phone: values.customerPhone,
          })
          accountCreated = true
        } catch (error) {
          const message =
            error instanceof AuthServiceError
              ? error.message
              : 'La création du compte a échoué. Veuillez réessayer.'
          setSubmitError(message)
          return
        }
      }

      const order = await createOrder({
        templateId: template.id,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        customizationDetails: values.customizationDetails || undefined,
      })

      try {
        await sendOrderEmail({
          command_code: order.reference,
          from_name: values.customerName,
          from_email: values.customerEmail,
          to_email: 'bteche.store@outlook.com',
          phone: values.customerPhone,
          template_name: template.name,
          template_category: template.category.join(', '),
          template_price: `${template.price} ${template.currency}`,
          description: values.customizationDetails || 'No specific details provided',
        });
      } catch (emailError) {
        // We log the error but we don't fail the order submission if the email fails
        console.error('Failed to send notification email:', emailError);
      }

      onSuccess({ order, accountCreated })
    } catch (error) {
      const message =
        error instanceof OrderServiceError
          ? error.message
          : "Impossible d'enregistrer votre commande pour le moment. Veuillez réessayer."
      setSubmitError(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="customerName" className="mb-1.5 block text-sm font-medium text-ink-700">
          Nom complet
        </label>
        <input
          id="customerName"
          type="text"
          autoComplete="name"
          placeholder="Jean Dupont"
          className={cn(inputClass, errors.customerName && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
          aria-invalid={!!errors.customerName}
          aria-describedby={errors.customerName ? 'customerName-error' : undefined}
          {...register('customerName')}
        />
        {errors.customerName && (
          <p id="customerName-error" className="mt-1 text-xs text-red-500">
            {errors.customerName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="customerEmail" className="mb-1.5 block text-sm font-medium text-ink-700">
            Adresse e-mail
          </label>
          <input
            id="customerEmail"
            type="email"
            autoComplete="email"
            placeholder="jean@entreprise.com"
            className={cn(inputClass, errors.customerEmail && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            aria-invalid={!!errors.customerEmail}
            aria-describedby={errors.customerEmail ? 'customerEmail-error' : undefined}
            {...register('customerEmail')}
          />
          {errors.customerEmail && (
            <p id="customerEmail-error" className="mt-1 text-xs text-red-500">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="customerPhone" className="mb-1.5 block text-sm font-medium text-ink-700">
            Numéro de téléphone
          </label>
          <input
            id="customerPhone"
            type="tel"
            autoComplete="tel"
            placeholder="+216 00 000 000"
            className={cn(inputClass, errors.customerPhone && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
            aria-invalid={!!errors.customerPhone}
            aria-describedby={errors.customerPhone ? 'customerPhone-error' : undefined}
            {...register('customerPhone')}
          />
          {errors.customerPhone && (
            <p id="customerPhone-error" className="mt-1 text-xs text-red-500">
              {errors.customerPhone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="customizationDetails" className="mb-1.5 block text-sm font-medium text-ink-700">
          Détails ou demandes de personnalisation
        </label>
        <textarea
          id="customizationDetails"
          rows={4}
          placeholder="Nom de votre entreprise, couleurs préférées, pages nécessaires, logo disponible, sections du menu QR, date du mariage, langues souhaitées..."
          className={cn(inputClass, 'resize-none', errors.customizationDetails && 'border-red-400')}
          aria-invalid={!!errors.customizationDetails}
          aria-describedby={errors.customizationDetails ? 'customizationDetails-error' : undefined}
          {...register('customizationDetails')}
        />
        {errors.customizationDetails && (
          <p id="customizationDetails-error" className="mt-1 text-xs text-red-500">
            {errors.customizationDetails.message}
          </p>
        )}
      </div>

      {/* Only show account creation option to guests */}
      {!user && (
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink-100 bg-ink-50 p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-primary-600 focus:ring-primary-600/40"
            {...register('createAccount')}
          />
          <span className="text-sm text-ink-700">
            <span className="font-medium text-ink-900">Créer un compte pour suivre ma commande</span>
            <br />
            Retrouvez l'état de votre commande à tout moment depuis « Mon compte ».
          </span>
        </label>
      )}

      {createAccount && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              className={cn(inputClass, errors.password && 'border-red-400 focus:border-red-500 focus:ring-red-500/20')}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-ink-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Ressaisissez le mot de passe"
              className={cn(
                inputClass,
                errors.confirmPassword && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              )}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      )}

      {submitError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        className="self-start"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Confirmer ma commande'}
      </Button>
    </form>
  )
}
