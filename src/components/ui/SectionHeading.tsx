import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { fadeUp, viewportOnce } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  actions?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'mx-auto flex max-w-3xl flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <Badge>{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-balance text-base text-ink-500 sm:text-lg">{subtitle}</p>}
      {actions}
    </motion.div>
  )
}
