import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon, type IconName } from '@/components/ui/Icon'
import { HeroVisual } from '@/components/sections/HeroVisual'
import { TRUST_INDICATORS } from '@/constants/site'
import { scrollToId } from '@/lib/utils'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '200px 0px 200px 0px' })

  return (
    <section
      id="home"
      ref={sectionRef}
      className="snap-section relative isolate overflow-hidden pt-32 pb-20 sm:pt-40"
    >
      {/* Soft backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white" />
        <div className="grid-fade-mask absolute inset-0 bg-[linear-gradient(to_right,#ece9fe_1px,transparent_1px),linear-gradient(to_bottom,#ece9fe_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />
        <motion.div
          className="absolute -top-16 start-[8%] h-72 w-72 rounded-full bg-primary-300/30 blur-3xl"
          animate={isInView ? { y: [0, 30, 0], x: [0, 20, 0] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 end-[6%] h-80 w-80 rounded-full bg-accent-300/25 blur-3xl"
          animate={isInView ? { y: [0, -24, 0], x: [0, -16, 0] } : {}}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>Agence digitale premium</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl text-balance font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl"
          >
            Des expériences numériques qui font grandir votre entreprise.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-lg text-balance text-lg text-ink-500"
          >
            Sites web, applications, branding, logos, design graphique et marketing digital — tout ce dont votre entreprise a besoin pour se démarquer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" icon={<ArrowRight size={18} />} onClick={() => scrollToId('contact')}>
              Commencer un projet
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToId('portfolio')}>
              Voir nos réalisations
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2 lg:justify-start"
          >
            {TRUST_INDICATORS.map((item) => (
              <span key={item.id} className="flex items-center gap-2 text-sm font-medium text-ink-600">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                  <Icon name={item.icon as IconName} size={15} />
                </span>
                {item.label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  )
}
