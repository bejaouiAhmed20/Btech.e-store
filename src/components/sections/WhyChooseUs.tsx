import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Icon, type IconName } from '@/components/ui/Icon'
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants'
import { whyChooseItems } from '@/data/values'

export function WhyChooseUs() {
  return (
    <section id="why" className="snap-section bg-ink-50/60 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Pourquoi choisir BTech" title="L'avantage de travailler avec BTech." />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 text-white">
                <Icon name={item.icon as IconName} size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink-900">
                {item.title}
              </h3>
              <p className="text-sm text-ink-500">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
