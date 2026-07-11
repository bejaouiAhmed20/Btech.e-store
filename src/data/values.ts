import type { TeamValue } from '@/types'

export const teamValues: TeamValue[] = [
  {
    id: 'creativity',
    icon: 'Lightbulb',
    titleKey: 'about.values.creativity.title',
    descriptionKey: 'about.values.creativity.description',
  },
  {
    id: 'innovation',
    icon: 'Rocket',
    titleKey: 'about.values.innovation.title',
    descriptionKey: 'about.values.innovation.description',
  },
  {
    id: 'professionalism',
    icon: 'BadgeCheck',
    titleKey: 'about.values.professionalism.title',
    descriptionKey: 'about.values.professionalism.description',
  },
  {
    id: 'quality',
    icon: 'Gem',
    titleKey: 'about.values.quality.title',
    descriptionKey: 'about.values.quality.description',
  },
  {
    id: 'support',
    icon: 'HeartHandshake',
    titleKey: 'about.values.support.title',
    descriptionKey: 'about.values.support.description',
  },
]

export const whyChooseItems = [
  { id: 'premium', icon: 'Gem' },
  { id: 'fast', icon: 'Zap' },
  { id: 'performance', icon: 'Cpu' },
  { id: 'responsive', icon: 'Smartphone' },
  { id: 'seo', icon: 'TrendingUp' },
  { id: 'support247', icon: 'LifeBuoy' },
  { id: 'tech', icon: 'Sparkles' },
  { id: 'pricing', icon: 'Wallet' },
] as const

export const faqItems = [
  { id: 'cost' },
  { id: 'timeline' },
  { id: 'maintenance' },
  { id: 'responsive' },
  { id: 'freeQuote' },
] as const
