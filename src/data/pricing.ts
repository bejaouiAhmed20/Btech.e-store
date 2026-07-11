export interface PricingPlan {
  id: 'starter' | 'professional' | 'enterprise'
  icon: 'Rocket' | 'Sparkles' | 'LayoutDashboard'
  price: number | null
  currency: string
  popular?: boolean
  name: string
  description: string
  cta: string
  features: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    icon: 'Rocket',
    price: 399,
    currency: 'DT',
    name: 'Essentiel',
    description: 'Idéal pour les petites entreprises qui souhaitent être présentes en ligne avec un site simple et professionnel.',
    cta: 'Demander un devis',
    features: [
      "Site professionnel jusqu'à 3 pages",
      "Adapté aux téléphones, tablettes et ordinateurs",
      "Formulaire pour recevoir les demandes de vos clients",
      "Boutons vers vos réseaux sociaux (Facebook, Instagram, TikTok, LinkedIn, etc.)",
      "Bouton WhatsApp pour être contacté directement",
      "Optimisation de base pour être visible sur Google",
      "Site sécurisé avec HTTPS",
      "Mise en ligne du site incluse",
      "1 mois de support offert",
    ],
  },
  {
    id: 'professional',
    icon: 'Sparkles',
    price: 899,
    currency: 'DT',
    popular: true,
    name: 'Business',
    description: 'Pour les entreprises qui souhaitent un site plus complet, moderne et personnalisé pour développer leur activité.',
    cta: 'Commencer mon projet',
    features: [
      "Site professionnel jusqu'à 7 pages",
      "Design personnalisé selon votre marque",
      "Disponible en français et en arabe",
      "Animations modernes et fluides",
      "Formulaires personnalisés selon vos besoins",
      "Boutons vers vos réseaux sociaux (Facebook, Instagram, TikTok, LinkedIn, etc.)",
      "Bouton WhatsApp pour faciliter le contact avec vos clients",
      "Intégration de Google Maps",
      "Optimisation avancée pour Google",
      "Site rapide et optimisé pour tous les appareils",
      "3 mois de support offert",
    ],
  },
  {
    id: 'enterprise',
    icon: 'LayoutDashboard',
    price: null,
    currency: 'DT',
    name: 'Sur mesure',
    description: "Pour les entreprises qui ont besoin d'une plateforme ou d'une application avec des fonctionnalités spécifiques.",
    cta: 'Discuter de mon projet',
    features: [
      "Application web entièrement personnalisée",
      "Espace client ou espace administrateur",
      "Création de comptes et connexion sécurisée",
      "Gestion et stockage des données",
      "Système de réservation ou de commande selon vos besoins",
      "Paiement en ligne si nécessaire",
      "Boutons et liens vers vos réseaux sociaux",
      "Intégration WhatsApp et autres moyens de contact",
      "Connexion avec d'autres services et outils",
      "Solution conçue pour évoluer avec votre entreprise",
      "Mise en ligne et accompagnement technique",
      "Support personnalisé selon votre projet",
    ],
  },
]
