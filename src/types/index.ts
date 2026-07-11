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

export type PortfolioCategory =
  | 'all'
  | 'websites'
  | 'restaurant'
  | 'coffee-shop'
  | 'cafe-resto'
  | 'wedding'
  | 'web-apps'
  | 'branding'
  | 'graphic-design'

export interface PortfolioProject {
  id: string
  name: string
  category: Exclude<PortfolioCategory, 'all'>
  image: string
  gallery: string[]
  shortDescription: string
  description: string
  technologies: string[]
  challenges: string
  solutions: string
  results: string
  liveUrl?: string
  githubUrl?: string
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
