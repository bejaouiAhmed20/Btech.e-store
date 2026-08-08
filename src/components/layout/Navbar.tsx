import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { NAV_SECTIONS } from '@/constants/site'
import { useScrolled } from '@/hooks/useScrolled'
import { useActiveSection } from '@/hooks/useActiveSection'
import { scrollToId, cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/useAuth'
import btechLogo from '@/assets/images/btech_logo.png'

export function Navbar() {
  const scrolled = useScrolled(40)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useActiveSection(NAV_SECTIONS.map((s) => s.id))
  const solid = scrolled || mobileOpen
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoading, signOut } = useAuth()

  const isHome = location.pathname === '/'

  /**
   * Section links must work from any route: on the home page they scroll
   * directly; from any other route they navigate to `/#section` and let
   * useScrollToHash (mounted on Home) handle the actual scroll once the
   * sections exist in the DOM.
   */
  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    if (id === 'home') {
      if (isHome) {
        scrollToId('home')
      } else {
        navigate('/')
      }
      return
    }
    if (isHome) {
      scrollToId(id)
    } else {
      navigate(`/#${id}`)
    }
  }

  const handleSignOut = async () => {
    setMobileOpen(false)
    await signOut()
    navigate('/')
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'glass border-b border-ink-100/80 shadow-soft' : 'bg-transparent',
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between py-3">
        <button
          onClick={() => handleNavClick('home')}
          aria-label="BTech — Retour à l'accueil"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <img
            src={btechLogo}
            alt="BTech logo"
            className="h-10 w-auto object-contain"
          />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-colors',
                solid ? 'text-ink-600' : 'text-ink-800',
                'hover:text-accent-600',
              )}
            >
              {section.label}
              {isHome && activeId === section.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!isLoading && user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                size="sm"
                variant="outline"
                icon={<User size={14} />}
                onClick={() => navigate('/account')}
              >
                Mon compte
              </Button>
              <Button size="sm" variant="ghost" icon={<LogOut size={14} />} onClick={handleSignOut}>
                Se déconnecter
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => (isLoading ? undefined : navigate('/login'))}
            >
              Se connecter
            </Button>
          )}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Basculer le menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden border-t border-ink-100/80 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-start text-base font-medium transition-colors',
                    isHome && activeId === section.id ? 'bg-accent-50 text-accent-700' : 'text-ink-700',
                  )}
                >
                  {section.label}
                </button>
              ))}

              {!isLoading && user ? (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      navigate('/account')
                    }}
                    className="rounded-xl px-4 py-3 text-start text-base font-medium text-ink-700"
                  >
                    Mon compte
                  </button>
                  <Button variant="outline" className="mt-2 w-full" onClick={handleSignOut}>
                    Se déconnecter
                  </Button>
                </>
              ) : (
                <Button
                  className="mt-2 w-full"
                  onClick={() => {
                    setMobileOpen(false)
                    navigate('/login')
                  }}
                >
                  Se connecter
                </Button>
              )}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
