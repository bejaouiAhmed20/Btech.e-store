export interface PricingPlan {
  id: 'starter' | 'professional' | 'enterprise'
  icon: 'Rocket' | 'Sparkles' | 'LayoutDashboard'
  price: number | null
  currency: string
  featureCount: number
  popular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  { id: 'starter', icon: 'Rocket', price: 399, currency: 'DT', featureCount: 9 },
  { id: 'professional', icon: 'Sparkles', price: 899, currency: 'DT', featureCount: 11, popular: true },
  { id: 'enterprise', icon: 'LayoutDashboard', price: null, currency: 'DT', featureCount: 12 },
]
