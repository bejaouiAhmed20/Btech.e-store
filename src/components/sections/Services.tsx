import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Icon, type IconName } from '@/components/ui/Icon'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
import { services } from '@/data/services'

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          subtitle={t('services.subtitle')}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <Icon name={service.icon as IconName} size={22} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-600"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">{t(service.titleKey)}</h3>
                <p className="flex-1 text-sm text-ink-500">{t(service.descriptionKey)}</p>
                <ul className="flex flex-col gap-2 border-t border-ink-100 pt-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-ink-500">
                      <Check size={14} className="text-accent-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
