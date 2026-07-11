import { Mail, MapPin, Phone, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { FOOTER_LINKS, SITE } from '@/constants/site'
import { services } from '@/data/services'
import { scrollToId } from '@/lib/utils'
import btechLogo from '@/assets/images/btech_logo.png'

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M17 14c-.3.4-1.5 1-2 1-.5 0-1-.2-2.3-.7-1.7-.6-3.2-1.9-3.8-2.6-.6-.7-.9-1.6-.9-2.5 0-1.2.6-1.8.8-2 .2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4.1.3.6 1.5.7 1.7.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.4.4-.6.6-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 1 .3.2.5.3.6.4.1.2.1.8-.2 1.2z" />
    </svg>
  )
}

const socialLinks = [
  { href: SITE.social.facebook, icon: FacebookIcon, label: 'Facebook' },
  { href: SITE.social.instagram, icon: InstagramIcon, label: 'Instagram' },
  { href: SITE.social.whatsapp, icon: WhatsAppIcon, label: 'WhatsApp' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-300">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <img
            src={btechLogo}
            alt="BTech logo"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="max-w-xs text-sm leading-relaxed text-ink-400">
            BTech est une agence de solutions numériques qui crée des sites web, applications et marques modernes pour les entreprises ambitieuses.
          </p>
          <div className="flex gap-2 pt-2">
            {socialLinks.map(({ href, icon: SocialIcon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-300 transition-colors hover:bg-accent-500 hover:text-white"
              >
                <SocialIcon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Liens rapides
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {FOOTER_LINKS.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToId(section.id)}
                  className="transition-colors hover:text-accent-400"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.id}>
                <button
                  onClick={() => scrollToId('services')}
                  className="transition-colors hover:text-accent-400"
                >
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent-400" /> Tunis, Tunisie
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-accent-400" /> {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-accent-400" /> {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="shrink-0 text-accent-400" /> {SITE.website}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} BTech. Tous droits réservés.
          </p>
          <p>Conçu et développé avec soin par BTech.</p>
        </Container>
      </div>
    </footer>
  )
}
