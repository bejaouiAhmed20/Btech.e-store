import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, className, hover = true, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow duration-300',
        hover && 'hover:shadow-lift hover:border-primary-200',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
