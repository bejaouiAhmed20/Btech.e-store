import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home as HomeIcon } from 'lucide-react'
import { Seo } from '@/components/common/Seo'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title={`404 · BTech`} description="La page que vous recherchez n'existe pas ou a été déplacée." />
      <section className="flex min-h-screen items-center justify-center bg-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gradient font-display text-8xl font-bold sm:text-9xl"
          >
            404
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl"
          >
            Page introuvable
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md text-ink-500"
          >
            La page que vous recherchez n'existe pas ou a été déplacée.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/">
              <Button icon={<HomeIcon size={16} />}>Retour à l'accueil</Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
