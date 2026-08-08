import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Clock, ShoppingCart } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, viewportOnce } from '@/animations/variants'
import {
  templates,
  templateFilters,
  TEMPLATE_FILTER_LABELS,
  matchesTemplateFilter,
  type TemplateFilter,
  type WebsiteTemplate,
} from '@/data/templates'
import { OrderModal } from '@/features/orders/components/OrderModal'
import { cn } from '@/lib/utils'

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<TemplateFilter>('all')
  const [orderTemplate, setOrderTemplate] = useState<WebsiteTemplate | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const filteredTemplates = useMemo(
    () => templates.filter((t) => matchesTemplateFilter(t, activeFilter)),
    [activeFilter],
  )

  const isEmpty = filteredTemplates.length === 0

  const openOrderModal = (template: WebsiteTemplate, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setOrderTemplate(template)
  }

  const closeOrderModal = () => {
    setOrderTemplate(null)
    // Restore focus to the "Commander" button that opened the modal.
    lastTriggerRef.current?.focus()
  }

  return (
    <section id="portfolio" className="snap-section py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Nos réalisations"
          title="Une sélection de projets qui parlent d'eux-mêmes."
          subtitle="Parcourez nos modèles de sites, ouvrez la démo en ligne et commandez celui qui vous correspond."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {templateFilters.map((filter) => (
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
              {TEMPLATE_FILTER_LABELS[filter]}
            </button>
          ))}
        </div>

        {/* Template grid or empty state */}
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
                  De nouveaux modèles dans cette catégorie arrivent très prochainement.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Template cards ───────────────────────────────────────────── */
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
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="group relative flex flex-col rounded-3xl border border-ink-100 bg-white shadow-soft transition-shadow hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                  >
                    {/* Promo badge — outside overflow-hidden so it shows fully */}
                    {template.badge && (
                      <div className="absolute -top-5 -left-5 z-30 rotate-[-15deg] drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105 pointer-events-none">
                        {template.badge === 'promo' ? (
                          <img
                            src="https://res.cloudinary.com/zrhkws3p/image/upload/v1784228046/promo_image_iici0n.png"
                            alt="Promo"
                            className="h-24 w-auto object-contain md:h-28"
                          />
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                            Nouveau
                          </span>
                        )}
                      </div>
                    )}

                    {/* Template image + demo link */}
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Voir la démo de ${template.name} (nouvel onglet)`}
                      className="relative block w-full aspect-[4/3] overflow-hidden rounded-t-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      <img
                        src={template.image}
                        alt={template.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-1.5 rounded-full bg-accent-500 px-4 py-2 text-xs font-semibold text-white">
                          Voir la démo <ExternalLink size={12} />
                        </span>
                      </div>
                    </a>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {/* Category badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {template.category.map((cat) => (
                          <span
                            key={cat}
                            className="rounded-full bg-primary-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-700"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Name & price */}
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-base font-semibold text-ink-900">
                          {template.name}
                        </h3>
                        <span className="flex shrink-0 items-baseline gap-2">
                          {template.badge === 'promo' && template.previousPrice ? (
                            <span className="flex flex-col items-end">
                              <span className="text-[12px] font-medium text-red-500 line-through">
                                {template.previousPrice} {template.currency}
                              </span>
                              <span className="text-[20px] font-extrabold text-primary-600">
                                {template.price} {template.currency}
                              </span>
                            </span>
                          ) : (
                            <span className="text-[20px] font-extrabold text-primary-600">
                              {template.price} {template.currency}
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={template.demoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          Voir la démo <ExternalLink size={13} />
                        </a>
                        <button
                          type="button"
                          onClick={(event) => openOrderModal(template, event.currentTarget)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
                        >
                          Commander <ShoppingCart size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <OrderModal template={orderTemplate} onClose={closeOrderModal} />
    </section>
  )
}
