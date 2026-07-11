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
  { id: 'home', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Projets' },
  // { id: 'pricing', label: 'Tarifs' },
  { id: 'contact', label: 'Contact' },
] as const

export const FOOTER_LINKS = [
  { id: 'about', label: 'À propos' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Projets' },
  // { id: 'pricing', label: 'Tarifs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const

export const STATS = [
  { id: 'projects', value: 180, suffix: '+', label: 'Projets réalisés' },
  { id: 'clients', value: 120, suffix: '+', label: "Clients satisfaits" },
  { id: 'years', value: 6, suffix: '+', label: "Années d'expérience" },
  { id: 'satisfaction', value: 98, suffix: '%', label: 'Satisfaction client' },
] as const

export const TRUST_INDICATORS = [
  { id: 'projects', icon: 'Rocket', label: '100+ Projets réalisés' },
  { id: 'delivery', icon: 'Zap', label: 'Livraison rapide' },
  { id: 'support', icon: 'LifeBuoy', label: 'Support professionnel' },
  { id: 'modern', icon: 'Sparkles', label: 'Solutions modernes' },
] as const
