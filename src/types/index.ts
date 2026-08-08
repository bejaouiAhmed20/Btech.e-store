export type ServiceCategory =
  | 'web-development'
  | 'web-applications'
  | 'branding'
  | 'restaurant'
  | 'coffee-shop'
  | 'graphic-design'
  | 'digital-marketing'
  | 'ui-ux'

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
  category: ServiceCategory
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface TeamValue {
  id: string
  icon: string
  title: string
  description: string
}

export interface ContactFormValues {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  budget: string
  message: string
}
