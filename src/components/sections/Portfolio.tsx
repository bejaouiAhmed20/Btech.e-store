import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, viewportOnce } from '@/animations/variants'
import { portfolioFilters } from '@/data/portfolio'
// ─── Single source of truth ───────────────────────────────────────────────────
import { projects } from '@/data/projects'
import type { PortfolioCategory } from '@/types'
import { cn } from '@/lib/utils'

const FILTER_LABELS: Record<PortfolioCategory, string> = {
  all: 'Tous',
  websites: 'Sites Web',
  restaurant: 'Restaurants',
  'coffee-shop': 'Cafés',
  'cafe-resto': 'Cafés & Restos',
  wedding: 'Mariages',
}

/**
 * Maps a portfolio filter key to the project `type` and `category` values
 * stored in projects.ts.
 */
function matchesFilter(project: (typeof projects)[number], filter: PortfolioCategory): boolean {
  if (filter === 'all') return true
  if (filter === 'websites') return project.type === 'website'
  if (filter === 'coffee-shop') return project.category.includes('cafe-resto')
  if (filter === 'wedding') return project.category.includes('wedding invitation')
  return project.category.includes(filter as unknown as typeof project.category[number])
}

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all')

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [activeFilter],
  )

  const isEmpty = filteredProjects.length === 0

  return (
    <section id="portfolio" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Nos réalisations"
          title="Une sélection de projets qui parlent d'eux-mêmes."
          subtitle="Un aperçu des sites, applications et marques que nous avons contribué à créer."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {portfolioFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                activeFilter === filter
                  ? 'bg-primary-600 text-white shadow-lift'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200',
              )}
            >
              {FILTER_LABELS[filter]}
            </button>
          ))}
        </div>

        {/* Project grid or empty state */}
        <AnimatePresence mode="wait">
          {isEmpty ? (
            /* ── "Bientôt disponible" empty state ──────────────────────────── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-ink-200 bg-ink-50 py-20 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Clock size={28} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-display text-xl font-semibold text-ink-800">
                  Bientôt disponible
                </p>
                <p className="max-w-xs text-sm text-ink-500">
                  De nouveaux projets dans cette catégorie arrivent très prochainement.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Project cards ───────────────────────────────────────────── */
            <motion.div
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.a
                    key={project.url}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="group relative block overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-lift cursor-pointer"
                  >
                    {/* Project image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {project.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          {project.badge === 'promo' ? (
                            <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                              Promo
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                              Nouveau
                            </span>
                          )}
                        </div>
                      )}
                      <img
                        src={project.image}
                        alt={project.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover overlay with live link */}
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5">
                          Démo en ligne <ExternalLink size={12} />
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col gap-3 p-6">
                      {/* Category badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.category.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-primary-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-700"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Project name & Price */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink-900">
                          {project.name}
                        </h3>
                        <span className="font-display text-lg font-bold text-primary-600 shrink-0">
                          {project.price} {project.currency}
                        </span>
                      </div>

                      {/* External link indicator */}
                      <span className="flex items-center gap-1 text-sm font-medium text-accent-600 transition-colors group-hover:text-accent-700">
                        Démo en ligne <ExternalLink size={13} />
                      </span>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  )
}
