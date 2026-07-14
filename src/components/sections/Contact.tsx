import { motion } from 'framer-motion'
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from '@/components/sections/ContactForm'
import { ContactIllustration } from '@/components/sections/ContactIllustration'
import { SITE } from '@/constants/site'
import { fadeUp, slideInRight, viewportOnce } from '@/animations/variants'

const infoItems = [
  {
    icon: MapPin,
    id: 'address',
    value: SITE.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`,
  },
  { icon: Mail, id: 'email', value: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: Phone,
    id: 'phone',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s+/g, '')}`,
  },
  { icon: Globe, id: 'website', value: SITE.website, href: `https://${SITE.website}` },
]

export function Contact() {
  return (
    <section id="contact" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Contactez-nous"
          title="Construisons ensemble quelque chose de formidable."
          subtitle="Parlez-nous de votre projet et notre équipe vous répondra sous un jour ouvré."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-1 flex flex-col gap-8 lg:order-1">
            <ContactForm />
          </div>

          <div className="order-2 flex flex-col gap-8 lg:order-2">
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <ContactIllustration />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2"
            >
              {infoItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id === 'email' || item.id === 'phone' ? undefined : '_blank'}
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 bg-white p-4 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-hover group"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                    <item.icon size={16} />
                  </span>
                  <span className="text-xs font-medium text-ink-600 transition-colors duration-300 group-hover:text-primary-600 break-all px-1">
                    {item.value}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
