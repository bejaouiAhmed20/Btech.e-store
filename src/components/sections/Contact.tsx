import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/sections/ContactForm'
import { ContactIllustration } from '@/components/sections/ContactIllustration'
import { SITE } from '@/constants/site'
import { fadeUp, slideInLeft, viewportOnce } from '@/animations/variants'

const infoItems = [
  { icon: MapPin, labelKey: 'contact.info.address' as const, value: SITE.address },
  { icon: Mail, labelKey: 'contact.info.email' as const, value: SITE.email },
  { icon: Phone, labelKey: 'contact.info.phone' as const, value: SITE.phone },
  { icon: Globe, labelKey: 'contact.info.website' as const, value: SITE.website },
]

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-2 lg:order-1"
          >
            <ContactIllustration />
          </motion.div>

          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <ContactForm />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {infoItems.map((item) => (
                <div
                  key={item.labelKey}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 bg-white p-4 text-center shadow-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <item.icon size={16} />
                  </span>
                  <span className="text-xs text-ink-600">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
