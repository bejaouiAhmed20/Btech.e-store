import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, PackageOpen, AlertCircle, Loader2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/common/Seo'
import { useAuth } from '@/features/auth/useAuth'
import { supabase } from '@/lib/supabase'
import { claimMyGuestOrders, fetchMyOrders, OrderServiceError } from '@/features/orders/orderService'
import { OrderCard } from '@/features/orders/components/OrderCard'
import type { CustomerOrder } from '@/features/orders/types'

type LoadState = 'loading' | 'error' | 'ready'

export default function Account() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<{ fullName: string | null; phone: string | null } | null>(null)
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [state, setState] = useState<LoadState>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    if (!user) return
    let isMounted = true

    async function load() {
      setState('loading')
      setErrorMessage(null)
      try {
        // Idempotent — safe to run on every account-page load.
        await claimMyGuestOrders()

        const [profileResult, myOrders] = await Promise.all([
          supabase.from('profiles').select('full_name, phone').eq('id', user!.id).maybeSingle(),
          fetchMyOrders(),
        ])

        if (!isMounted) return
        const profileRow = profileResult.data as { full_name: string | null; phone: string | null } | null
        setProfile({ fullName: profileRow?.full_name ?? null, phone: profileRow?.phone ?? null })
        setOrders(myOrders)
        setState('ready')
      } catch (error) {
        if (!isMounted) return
        setErrorMessage(
          error instanceof OrderServiceError ? error.message : 'Impossible de charger votre compte pour le moment.',
        )
        setState('error')
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [user?.id])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
    } finally {
      setIsSigningOut(false)
    }
  }

  if (!user) return null

  return (
    <>
      <Seo title="Mon compte — BTech" description="Suivez vos commandes et gérez votre compte BTech." />
      <section className="min-h-screen py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge>Mon compte</Badge>
              <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
                {profile?.fullName || user.email}
              </h1>
              <p className="mt-2 text-sm text-ink-500">{user.email}</p>
              {profile?.phone && <p className="text-sm text-ink-500">{profile.phone}</p>}
            </div>

            <Button
              variant="outline"
              onClick={handleSignOut}
              disabled={isSigningOut}
              icon={isSigningOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            >
              Se déconnecter
            </Button>
          </div>

          <div>
            <h2 className="mb-5 font-display text-xl font-semibold text-ink-900">Mes commandes</h2>

            <AnimatePresence mode="wait">
              {state === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-ink-50 py-20 text-ink-500"
                >
                  <Loader2 size={20} className="animate-spin" />
                  <span>Chargement de vos commandes...</span>
                </motion.div>
              )}

              {state === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 rounded-3xl border border-red-100 bg-red-50 py-16 text-center text-red-600"
                >
                  <AlertCircle size={28} />
                  <p className="text-sm">{errorMessage}</p>
                </motion.div>
              )}

              {state === 'ready' && orders.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-ink-50 py-20 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <PackageOpen size={28} />
                  </span>
                  <p className="font-display text-lg font-semibold text-ink-800">
                    Vous n'avez encore aucune commande.
                  </p>
                  <p className="max-w-xs text-sm text-ink-500">
                    Parcourez nos modèles de sites et lancez votre première commande.
                  </p>
                </motion.div>
              )}

              {state === 'ready' && orders.length > 0 && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </>
  )
}
