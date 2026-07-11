import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white shadow-lift hover:bg-primary-700 focus-visible:outline-primary-700',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800',
  outline: 'border border-ink-200 text-ink-900 hover:border-accent-500 hover:text-accent-600',
  ghost: 'text-ink-700 hover:bg-ink-100',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, icon, iconPosition = 'end', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === 'start' && icon}
        {children}
        {icon && iconPosition === 'end' && icon}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
