import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Loader2, LogIn } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/common/Seo'
import { useAuth } from '@/features/auth/useAuth'
import { loginSchema, requestPasswordResetSchema, type LoginSchema } from '@/features/orders/orderSchema'
import { requestPasswordReset, AuthServiceError } from '@/features/auth/authService'
import { cn } from '@/lib/utils'

const inputClass =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20'

export default function Login() {
  const { user, isLoading, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState<string | null>(null)
  const [mode, setMode] = useState<'login' | 'reset'>('login')
  const [resetMessage, setResetMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isSubmitting: isResetSubmitting },
  } = useForm({
    resolver: zodResolver(requestPasswordResetSchema),
    defaultValues: { email: '' },
  })

  // Avoid a redirect loop: don't decide anything until auth has initialized.
  if (!isLoading && user) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/account'
    return <Navigate to={redirectTo} replace />
  }

  const onSubmit = async (values: LoginSchema) => {
    setFormError(null)
    try {
      await signIn(values.email, values.password)
      const redirectTo = (location.state as { from?: string } | null)?.from ?? '/account'
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setFormError(error instanceof AuthServiceError ? error.message : 'Une erreur est survenue.')
    }
  }

  const onRequestReset = async (values: { email: string }) => {
    setResetMessage(null)
    setFormError(null)
    try {
      await requestPasswordReset(values.email)
      setResetMessage(
        'Si un compte existe avec cette adresse, un e-mail de réinitialisation vient de vous être envoyé.',
      )
    } catch (error) {
      setFormError(error instanceof AuthServiceError ? error.message : 'Une erreur est survenue.')
    }
  }

  return (
    <>
      <Seo title="Connexion — BTech" description="Connectez-vous à votre compte BTech pour suivre vos commandes." />
      <section className="flex min-h-screen items-center justify-center py-24">
        <Container className="flex max-w-md flex-col gap-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-semibold text-ink-900">
              {mode === 'login' ? 'Se connecter' : 'Mot de passe oublié ?'}
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              {mode === 'login'
                ? 'Accédez à votre espace pour suivre vos commandes.'
                : 'Recevez un e-mail pour réinitialiser votre mot de passe.'}
            </p>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={cn(inputClass, errors.email && 'border-red-400')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className={cn(inputClass, errors.password && 'border-red-400')}
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

              {formError && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                icon={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setMode('reset')
                  setFormError(null)
                }}
                className="text-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Mot de passe oublié ?
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit(onRequestReset)} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="reset-email" className="mb-1.5 block text-sm font-medium text-ink-700">
                  Adresse e-mail
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  className={cn(inputClass, resetErrors.email && 'border-red-400')}
                  aria-invalid={!!resetErrors.email}
                  {...registerReset('email')}
                />
                {resetErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{resetErrors.email.message}</p>
                )}
              </div>

              {resetMessage && (
                <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {resetMessage}
                </p>
              )}
              {formError && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </p>
              )}

              <Button type="submit" size="lg" disabled={isResetSubmitting} aria-busy={isResetSubmitting}>
                {isResetSubmitting ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
              </Button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-center text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Retour à la connexion
              </button>
            </form>
          )}

          <Link to="/" className="text-center text-sm text-ink-500 hover:text-ink-700">
            ← Retour à l'accueil
          </Link>
        </Container>
      </section>
    </>
  )
}
