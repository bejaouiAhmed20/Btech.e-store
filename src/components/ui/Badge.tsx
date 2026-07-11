import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-accent-500/15 bg-accent-50 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-accent-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
