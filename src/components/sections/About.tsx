import { motion } from 'framer-motion'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from '@/animations/variants'
import { teamValues } from '@/data/values'
import { useCountUp } from '@/hooks/useCountUp'
import { STATS } from '@/constants/site'

function StatCounter({
  value,
  suffix,
  label,
  index,
}: {
  value: number
  suffix: string
  label: string
  index: number
}) {
  const { ref, value: current } = useCountUp(value)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col gap-1 rounded-2xl border border-white/60 bg-white/70 p-5 text-center shadow-soft backdrop-blur"
    >
      <span className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</span>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="snap-section relative overflow-hidden bg-ink-50/60 py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Left: story + mission/vision + values */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6"
        >
          <Badge>À propos de BTech</Badge>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
            Nous construisons des identités numériques dont les entreprises sont fières.
          </h2>
          <p className="text-base text-ink-500 sm:text-lg">
            BTech est une agence de solutions numériques qui aide les entreprises de toute taille à établir une présence puissante et fiable, en ligne comme hors ligne.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-600">
                Mission
              </p>
              <p className="text-sm text-ink-600">
                Notre mission : offrir à chaque client l'identité numérique d'une grande marque, sans la complexité.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
              <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-600">
                Vision
              </p>
              <p className="text-sm text-ink-600">
                Notre vision : devenir le partenaire digital de référence des entreprises ambitieuses en Tunisie et au-delà.
              </p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-wrap gap-3 pt-2"
          >
            {teamValues.map((value) => (
              <motion.div
                key={value.id}
                variants={fadeUp}
                className="flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2 shadow-soft"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                  <Icon name={value.icon as IconName} size={14} />
                </span>
                <span className="text-sm font-medium text-ink-700">{value.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: floating stats panel */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary-100 via-accent-50 to-transparent blur-2xl" />
          <div className="grid grid-cols-2 gap-4 rounded-[2rem] border border-white bg-white/50 p-6 shadow-lift backdrop-blur-xl sm:p-8">
            {STATS.map((stat, index) => (
              <StatCounter
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
