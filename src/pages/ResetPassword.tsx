import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Loader2, KeyRound } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/common/Seo'
import { updatePasswordSchema, type UpdatePasswordSchema } from '@/features/orders/orderSchema'
import { updatePassword, AuthServiceError } from '@/features/auth/authService'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: UpdatePasswordSchema) => {
    setFormError(null)
    try {
      await updatePassword(values.password)
      setSuccess(true)
      setTimeout(() => navigate('/account', { replace: true }), 1800)
    } catch (error) {
      setFormError(error instanceof AuthServiceError ? error.message : 'Une erreur est survenue.')
    }
  }

  return (
    <>
      <Seo title="Nouveau mot de passe — BTech" description="Choisissez un nouveau mot de passe pour votre compte BTech." />
      <section className="flex min-h-screen items-center justify-center py-24">
        <Container className="flex max-w-md flex-col gap-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold text-ink-900">Nouveau mot de passe</h1>
            <p className="mt-2 text-sm text-ink-500">Choisissez un nouveau mot de passe pour votre compte.</p>
          </div>

          {success ? (
            <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-700">
              Votre mot de passe a été mis à jour. Redirection en cours...
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={cn(inputClass, errors.password && 'border-red-400')}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={cn(inputClass, errors.confirmPassword && 'border-red-400')}
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {formError && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                icon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </Button>
            </form>
          )}
        </Container>
      </section>
    </>
  )
}
