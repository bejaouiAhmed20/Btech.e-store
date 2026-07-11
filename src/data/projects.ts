/**
 * @file projects.ts
 * @description Single source of truth for all portfolio projects displayed in the "Projets" section.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SUPPORTED VALUES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `type` — The broad nature of the deliverable (one value per project):
 *   • "website"    — A public-facing website or landing page
 *   • "web-app"    — A web application with backend logic (dashboards, CRMs, etc.)
 *   • "branding"   — Logo, identity system, visual brand guidelines
 *   • "print"      — Printed materials (business cards, flyers, packaging, etc.)
 *
 * `category` — One or more tags describing the domain/industry (array, can be combined):
 *   • "restaurant"         — Restaurant website or digital solution
 *   • "cafe-resto"         — Café or casual dining concept
 *   • "menu"               — Digital or QR menu included in the project
 *   • "wedding invitation" — Wedding invitation website or digital card
 *   • "branding"           — Brand identity / logo design project
 *   • "graphic-design"     — Print or graphic design assets
 *   • "web-app"            — Full-stack web application
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW PROJECT
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Copy the object template below and fill in all required fields.
 * 2. Pick `type` from the supported values above (one string).
 * 3. Pick one or more `category` values from the list above (string array).
 * 4. If you need a brand-new category or type, also update:
 *    - src/data/portfolio.ts           → portfolioFilters array
 *    - src/types/index.ts              → PortfolioCategory union type
 *    - src/i18n/locales/fr/translation.json → portfolio.filters object
 *
 * Template:
 * {
 *   name: "Project Name",
 *   type: "website",
 *   category: ["restaurant"],
 *   url: "https://example.com",
 *   image: "https://...",
 * }
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Broad nature of the deliverable. */
export type ProjectType = 'website' | 'web-app' | 'branding' | 'print'

/**
 * Domain / industry tags.
 * A project can belong to multiple categories simultaneously.
 */
export type ProjectCategory =
  | 'restaurant'
  | 'cafe-resto'
  | 'menu'
  | 'wedding invitation'
  | 'branding'
  | 'graphic-design'
  | 'web-app'

export interface Project {
  /** Display name shown in the portfolio card. */
  name: string

  /**
   * Broad nature of the deliverable.
   * See ProjectType above for all supported values.
   */
  type: ProjectType

  /**
   * Domain/industry tags — a project can belong to multiple categories.
   * See ProjectCategory above for all supported values.
   */
  category: ProjectCategory[]

  /** Live project URL — opens in a new tab with rel="noreferrer noopener". */
  url: string

  /**
   * Hero image URL.
   * Prefer high-quality images (1200 × 800 px minimum).
   * The project name is used as the alt text automatically.
   */
  image: string

  /** Price of the project. */
  price: number

  /** Currency of the price. */
  currency: string

  /** Optional badge to display (e.g., 'promo' or 'new'). */
  badge?: 'promo' | 'new'

  /** Previous price before promo (shown with strikethrough on promo items). */
  pp?: number
}

/**
 * ══════════════════════════════════════════════════════════
 * ALL PORTFOLIO PROJECTS — SINGLE SOURCE OF TRUTH
 * Edit this array to add, update, or remove projects.
 * ══════════════════════════════════════════════════════════
 */
export const projects: Project[] = [
  {
    name: 'La Lanterne',
    type: 'website',
    category: ['restaurant', 'menu'],
    url: 'https://lalanterne.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710574/Screenshot_2026-07-10_194707_nglptu.png',
    price: 199,
    currency: 'DT',
    badge: 'promo',
    pp: 349,
  },
  {
    name: 'Mohamed Wedding',
    type: 'website',
    category: ['wedding invitation'],
    url: 'https://weddingmohamed.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710575/Screenshot_2026-07-10_194650_sb9p9x.png',
    price: 99,
    currency: 'DT',
    badge: 'new',
  },
  {
    name: 'Bella Vista',
    type: 'website',
    category: ['restaurant', 'menu'],
    url: 'https://shop-menu-test.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710577/Screenshot_2026-07-10_194723_wv6rpb.png',
    price: 149,
    currency: 'DT',
    badge: 'promo',
    pp: 299,
  },
  {
    name: 'Cafe Lumière',
    type: 'website',
    category: ['cafe-resto', 'menu'],
    url: 'https://cafelumier.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710575/Screenshot_2026-07-10_194743_lezrcp.png',
    price: 299,
    currency: 'DT',
    badge: 'new',
  },
  {
    name: 'Chêne & Sauge',
    type: 'website',
    category: ['cafe-resto', 'menu'],
    url: 'https://chene-and-sauge.netlify.app/',
    image:
      'https://res.cloudinary.com/zrhkws3p/image/upload/v1783710577/Screenshot_2026-07-10_195817_ksttmc.png',
    price: 149,
    currency: 'DT',
  },
  {
  name: "Olivier & Jasmin",
  type: "website",
  category: ["restaurant", "cafe-resto", "menu"],
  url: 'https://oliver-jasmin.netlify.app',
  image: 'https://res.cloudinary.com/zrhkws3p/image/upload/v1783763256/Screenshot_2026-07-11_103947_qwkeen.png',
  price: 399,
  currency: "DT",
  badge: "promo",
  pp: 599,
},
{
  name: 'Wedding Simple',
  type: 'website',
  category: ['wedding invitation'],
  url: 'https://simpleweddinginviatation.netlify.app/',
  image: 'https://res.cloudinary.com/zrhkws3p/image/upload/v1783770829/Screenshot_2026-07-11_125308_keduuo.png',
  currency: 'DT',
  price: 99,
  badge: "promo",
  pp: 199,
}


]
