import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
import { pricingPlans } from '@/data/pricing'
import { scrollToId, cn } from '@/lib/utils'

export function Pricing() {
  return (
    <section id="pricing" className="snap-section bg-ink-50/60 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Tarifs"
          title="Des offres simples et transparentes pour chaque étape."
          subtitle="Choisissez l'offre adaptée à votre entreprise aujourd'hui — chaque offre peut évoluer avec vous."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {pricingPlans.map((plan) => {
            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={cn(
                  'relative flex flex-col gap-6 rounded-3xl border p-8 shadow-soft transition-shadow',
                  plan.popular
                    ? 'border-primary-300 bg-white shadow-lift ring-2 ring-primary-500/20'
                    : 'border-ink-100 bg-white hover:shadow-lift',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 start-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lift">
                    <Star size={12} fill="currentColor" strokeWidth={0} />
                    Le plus populaire
                  </span>
                )}

                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl',
                    plan.popular
                      ? 'bg-gradient-to-br from-primary-600 to-accent-500 text-white'
                      : 'bg-accent-50 text-accent-600',
                  )}
                >
                  <Icon name={plan.icon as IconName} size={22} />
                </span>

                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-900">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2 border-t border-ink-100 pt-6">
                  {plan.price !== null ? (
                    <>
                      <span className="text-sm text-ink-500">À partir de</span>
                      <span className="font-display text-4xl font-bold text-ink-900">{plan.price}</span>
                      <span className="text-sm font-medium text-ink-500">{plan.currency}</span>
                    </>
                  ) : (
                    <span className="font-display text-3xl font-bold text-ink-900">
                      Sur devis
                    </span>
                  )}
                </div>

                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-600">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => scrollToId('contact')}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center text-sm text-ink-500 max-w-3xl mx-auto leading-relaxed"
        >
          Les prix indiqués sont des tarifs de départ. Le prix final dépend des fonctionnalités, du design et des besoins spécifiques de votre projet. Demandez votre devis gratuitement et sans engagement.
        </motion.p>
      </Container>
    </section>
  )
}
