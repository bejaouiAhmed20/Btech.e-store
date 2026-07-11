export const SITE = {
  name: 'BTech',
  tagline: 'Transformer les idées en expériences numériques',
  email: 'hello@btech-e.store',
  phone: '+216 00 000 000',
  address: 'Tunis, Tunisie',
  website: 'www.btech-e.store',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://wa.me/21600000000',
  },
} as const

/** Essential links shown in the navbar — kept short and intentional. */
export const NAV_SECTIONS = [
  { id: 'home', key: 'nav.home' },
  { id: 'services', key: 'nav.services' },
  { id: 'portfolio', key: 'nav.portfolio' },
  { id: 'pricing', key: 'nav.pricing' },
  { id: 'contact', key: 'nav.contact' },
] as const

export const FOOTER_LINKS = [
  { id: 'about', key: 'nav.about' },
  { id: 'services', key: 'nav.services' },
  { id: 'portfolio', key: 'nav.portfolio' },
  { id: 'pricing', key: 'nav.pricing' },
  { id: 'faq', key: 'nav.faq' },
  { id: 'contact', key: 'nav.contact' },
] as const

export const STATS = [
  { id: 'projects', value: 180, suffix: '+', key: 'hero.stats.projects' },
  { id: 'clients', value: 120, suffix: '+', key: 'hero.stats.clients' },
  { id: 'years', value: 6, suffix: '+', key: 'hero.stats.years' },
  { id: 'satisfaction', value: 98, suffix: '%', key: 'hero.stats.satisfaction' },
] as const

export const TRUST_INDICATORS = [
  { id: 'projects', icon: 'Rocket', key: 'hero.trust.projects' },
  { id: 'delivery', icon: 'Zap', key: 'hero.trust.delivery' },
  { id: 'support', icon: 'LifeBuoy', key: 'hero.trust.support' },
  { id: 'modern', icon: 'Sparkles', key: 'hero.trust.modern' },
] as const
