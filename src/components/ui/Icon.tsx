import { memo } from 'react'
// Removed LucideProps import due to missing type declarations
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

type LucideProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
  color?: string
  strokeWidth?: number | string
}

interface IconProps extends LucideProps {
  name: IconName
}

function IconBase({ name, ...props }: IconProps) {
  const LucideIcon = iconRegistry[name]
  if (!LucideIcon) return null
  return <LucideIcon {...props} />
}

export const Icon = memo(IconBase)
