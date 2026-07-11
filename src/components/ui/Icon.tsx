import { memo } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  BadgeCheck,
  Coffee,
  Cpu,
  Gem,
  Globe,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Megaphone,
  PenTool,
  Rocket,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  Zap,
} from 'lucide-react'

const iconRegistry = {
  BadgeCheck,
  Coffee,
  Cpu,
  Gem,
  Globe,
  HeartHandshake,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Megaphone,
  PenTool,
  Rocket,
  Smartphone,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  Zap,
} as const

export type IconName = keyof typeof iconRegistry

interface IconProps extends LucideProps {
  name: IconName
}

function IconBase({ name, ...props }: IconProps) {
  const LucideIcon = iconRegistry[name]
  if (!LucideIcon) return null
  return <LucideIcon {...props} />
}

export const Icon = memo(IconBase)
