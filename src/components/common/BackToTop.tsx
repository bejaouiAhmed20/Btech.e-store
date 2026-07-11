import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'

export function BackToTop() {
  const visible = useScrolled(480)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          whileHover={{ y: -4 }}
          onClick={scrollTop}
          aria-label="Retour en haut"
          className="fixed bottom-6 end-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white shadow-lift transition-colors hover:bg-primary-600"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
