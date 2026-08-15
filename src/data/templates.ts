/**
 * @file templates.ts
 * @description Single source of truth for every sellable website template shown in the
 * "Projets" section and orderable through the order flow.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW TEMPLATE
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Copy an existing object below and fill in every required field.
 * 2. `id` must be a permanent, stable, kebab-case identifier. It is stored on
 *    every order (see supabase/migrations) — never reuse or repurpose an id
 *    once it has shipped, and never derive it from the array index or the url.
 * 3. `category` accepts one or more tags from `TemplateCategory`. If you need a
 *    new category, also add it to `TemplateCategory` and `CATEGORY_FILTERS` below.
 */

/** Broad nature of the deliverable. */
export type TemplateType = 'website' | 'web-app' | 'branding' | 'print'

/** Domain / industry tags. A template can belong to multiple categories. */
export type TemplateCategory =
  | 'restaurant'
  | 'cafe-resto'
  | 'cafe'
  | 'menu'
  | 'wedding invitation'
  | 'branding'
  | 'graphic-design'
  | 'web-app'
  | 'business'

export interface WebsiteTemplate {
  /** Permanent, stable identifier. Never the array index or the demo URL. */
  id: string
  /** URL-safe slug, currently identical to `id`, kept distinct for future flexibility. */
  slug: string
  /** Display name shown on the card and in the order summary. */
  name: string
  /** Broad nature of the deliverable. */
  type: TemplateType
  /** Domain/industry tags — a template can belong to multiple categories. */
  category: TemplateCategory[]
  /** Live demo URL — opens in a new tab with rel="noreferrer noopener". */
  demoUrl: string
  /** Hero image URL, minimum 1200x800px preferred. */
  image: string
  /** Internal reference price (used for emails/orders only — not shown directly in UI). */
  price: number
  /** Starting price displayed publicly on cards and in the order modal. */
  startingPrice: number
  /** Currency code/label, e.g. "DT". */
  currency: string
  /** Optional badge, e.g. 'promo', 'new', or 'soldes'. */
  badge?: 'promo' | 'new' | 'soldes'
  /** Previous price before promo/soldes (shown with strikethrough). */
  previousPrice?: number
  /** Short description shown in the order modal summary, optional. */
  description?: string
}

/**
 * ══════════════════════════════════════════════════════════
 * ALL WEBSITE TEMPLATES — SINGLE SOURCE OF TRUTH
 * Edit this array to add, update, or remove templates.
 * ══════════════════════════════════════════════════════════
 */
export const templates: WebsiteTemplate[] = [
  {
    id: 'volto-green',
    slug: 'volto-green',
    name: 'Volto Green',
    type: 'website',
    category: ['business'],
    demoUrl: 'https://www.voltogreen.com/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1784022985/Screenshot_2026-07-14_105514_kowxxq.png',
    price: 399,
    startingPrice: 449,
    previousPrice: 650,
    currency: 'DT',
    badge: 'promo',
  },
  {
    id: 'la-lanterne',
    slug: 'la-lanterne',
    name: 'La Lanterne',
    type: 'website',
    category: ['restaurant', 'menu'],
    demoUrl: 'https://lalanterne.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710574/Screenshot_2026-07-10_194707_nglptu.png',
    price: 349,
    startingPrice: 389,
    previousPrice: 550,
    currency: 'DT',
    badge: 'soldes',
  },
  {
    id: 'mohamed-amin-wedding',
    slug: 'mohamed-amin-wedding',
    name: 'Mohamed & Amin Wedding',
    type: 'website',
    category: ['wedding invitation'],
    demoUrl: 'https://weddingmohamed.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1784227270/Screenshot_2026-07-16_194059_l86yje.png',
    price: 169,
    startingPrice: 189,
    previousPrice: 280,
    currency: 'DT',
    badge: 'promo',
  },
  {
    id: 'bella-vista',
    slug: 'bella-vista',
    name: 'Bella Vista',
    type: 'website',
    category: ['restaurant', 'menu'],
    demoUrl: 'https://shop-menu-test.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710577/Screenshot_2026-07-10_194723_wv6rpb.png',
    price: 299,
    startingPrice: 329,
    previousPrice: 480,
    currency: 'DT',
    badge: 'promo',
  },
  {
    id: 'cafe-lumiere',
    slug: 'cafe-lumiere',
    name: 'Café Lumière',
    type: 'website',
    category: ['cafe-resto', 'menu'],
    demoUrl: 'https://cafelumier.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710575/Screenshot_2026-07-10_194743_lezrcp.png',
    price: 329,
    startingPrice: 369,
    previousPrice: 520,
    currency: 'DT',
    badge: 'soldes',
  },
  {
    id: 'chene-et-sauge',
    slug: 'chene-et-sauge',
    name: 'Chêne & Sauge',
    type: 'website',
    category: ['cafe-resto', 'menu', 'cafe'],
    demoUrl: 'https://chene-and-sauge.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710577/Screenshot_2026-07-10_195817_ksttmc.png',
    price: 279,
    startingPrice: 309,
    previousPrice: 420,
    currency: 'DT',
    badge: 'promo',
  },
  {
    id: 'olivier-jasmin',
    slug: 'olivier-jasmin',
    name: 'Olivier & Jasmin',
    type: 'website',
    category: ['restaurant', 'cafe-resto', 'menu', 'cafe'],
    demoUrl: 'https://oliver-jasmin.netlify.app',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783763256/Screenshot_2026-07-11_103947_qwkeen.png',
    price: 249,
    startingPrice: 279,
    previousPrice: 390,
    currency: 'DT',
    badge: 'soldes',
  },
  {
    id: 'wonder-land',
    slug: 'wonder-land',
    name: 'Wonder Land',
    type: 'website',
    category: ['restaurant', 'cafe-resto', 'menu', 'cafe'],
    demoUrl: 'https://wonderlandwebsite.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1784226844/Screenshot_2026-07-16_193339_dnfzia.png',
    price: 249,
    startingPrice: 279,
    previousPrice: 390,
    currency: 'DT',
    badge: 'promo',
  },
  {
    id: 'ahmed-maram-wedding',
    slug: 'ahmed-maram-wedding',
    name: 'Ahmed & Maram Wedding',
    type: 'website',
    category: ['wedding invitation'],
    demoUrl: 'https://simpleweddinginvitationv2.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1784025586/Screenshot_2026-07-14_113913_w0jaug.png',
    price: 169,
    startingPrice: 189,
    previousPrice: 280,
    currency: 'DT',
    badge: 'soldes',
  },
  {
    id: 'simple-wedding-invitation',
    slug: 'simple-wedding-invitation',
    name: 'Simple Wedding Invitation',
    type: 'website',
    category: ['wedding invitation'],
    demoUrl: 'https://simpleweddinginviatation.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1784025586/Screenshot_2026-07-14_113933_ivwzb7.png',
    price: 169,
    startingPrice: 189,
    previousPrice: 280,
    currency: 'DT',
    badge: 'promo',
  },
]

/** Portfolio-section filter keys, in display order. */
export const templateFilters = ['all', 'websites', 'restaurant', 'coffee-shop', 'cafe-resto', 'wedding'] as const

export type TemplateFilter = (typeof templateFilters)[number]

export const TEMPLATE_FILTER_LABELS: Record<TemplateFilter, string> = {
  all: 'Tous',
  websites: 'Sites Web',
  restaurant: 'Restaurants',
  'coffee-shop': 'Cafés',
  'cafe-resto': 'Cafés & Restos',
  wedding: 'Mariages',
}

export function matchesTemplateFilter(template: WebsiteTemplate, filter: TemplateFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'websites') return template.type === 'website'
  if (filter === 'coffee-shop') return template.category.includes('cafe-resto')
  if (filter === 'wedding') return template.category.includes('wedding invitation')
  return template.category.includes(filter as TemplateCategory)
}

export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return templates.find((template) => template.id === id)
}
