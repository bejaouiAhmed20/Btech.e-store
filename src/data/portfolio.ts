import type { PortfolioProject } from '@/types'

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'nova-finance',
    name: 'Nova Finance',
    category: 'websites',
    image: 'https://picsum.photos/seed/nova-finance/900/700',
    gallery: [
      'https://picsum.photos/seed/nova-finance-1/1200/800',
      'https://picsum.photos/seed/nova-finance-2/1200/800',
      'https://picsum.photos/seed/nova-finance-3/1200/800',
    ],
    shortDescription: 'Un site vitrine orienté conversion pour une startup fintech.',
    description:
      "Nova Finance avait besoin d'un site capable d'inspirer confiance aux clients professionnels tout en restant accessible aux investisseurs particuliers. Nous avons conçu une expérience épurée et centrée sur les données.",
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    challenges: 'Expliquer simplement un produit financier complexe sans perdre en crédibilité.',
    solutions:
      'Blocs de contenu modulaires, visualisations de données animées et système typographique strict.',
    results: '+64% de demandes de démo dès le premier trimestre après le lancement.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'orbit-crm',
    name: 'Orbit CRM',
    category: 'web-apps',
    image: 'https://picsum.photos/seed/orbit-crm/900/700',
    gallery: [
      'https://picsum.photos/seed/orbit-crm-1/1200/800',
      'https://picsum.photos/seed/orbit-crm-2/1200/800',
      'https://picsum.photos/seed/orbit-crm-3/1200/800',
    ],
    shortDescription: 'Un tableau de bord CRM sur mesure pour une équipe commerciale en pleine croissance.',
    description:
      'Orbit devait remplacer trois fichiers Excel déconnectés par une source unique de vérité. Nous avons conçu un tableau de bord par rôle avec pipelines, rapports automatisés et collaboration en temps réel.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    challenges: 'Migrer des années de données non structurées sans interrompre les opérations quotidiennes.',
    solutions: 'Un outil de migration progressive et une interface reprenant les habitudes des tableurs.',
    results: 'Temps de reporting commercial réduit de 6 heures à 20 minutes par semaine.',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 'lumen-branding',
    name: 'Lumen Studio',
    category: 'branding',
    image: 'https://picsum.photos/seed/lumen-branding/900/700',
    gallery: [
      'https://picsum.photos/seed/lumen-branding-1/1200/800',
      'https://picsum.photos/seed/lumen-branding-2/1200/800',
      'https://picsum.photos/seed/lumen-branding-3/1200/800',
    ],
    shortDescription: "Identité de marque complète pour un studio d'architecture et de design intérieur.",
    description:
      "Lumen voulait une marque reflétant à la fois précision et chaleur. Nous avons créé un système d'identité complet, du logo à la signalétique en passant par la papeterie.",
    technologies: ['Illustrator', 'Figma', 'Charte graphique'],
    challenges: "Équilibrer minimalisme et chaleur pour un studio centré sur l'humain.",
    solutions: 'Un logotype géométrique associé à une palette de couleurs et matières chaleureuse.',
    results: 'La nouvelle identité a triplé le nombre de demandes de projets entrantes.',
  },
  {
    id: 'saffron-restaurant',
    name: 'Saffron Table',
    category: 'restaurant',
    image: 'https://picsum.photos/seed/saffron-restaurant/900/700',
    gallery: [
      'https://picsum.photos/seed/saffron-restaurant-1/1200/800',
      'https://picsum.photos/seed/saffron-restaurant-2/1200/800',
      'https://picsum.photos/seed/saffron-restaurant-3/1200/800',
    ],
    shortDescription: 'Site de restaurant avec menu digital et commande par QR code.',
    description:
      "Un restaurant gastronomique avait besoin d'un site et d'une expérience de commande sans contact à la hauteur de l'élégance de sa salle.",
    technologies: ['React', 'Commande QR', 'Tailwind CSS'],
    challenges:
      'Présenter un menu saisonnier changeant fréquemment, sans intervention constante du développeur.',
    solutions:
      'Un CMS léger permettant au personnel de mettre à jour plats, prix et disponibilité en temps réel.',
    results: 'Panier moyen en hausse de 22% après le lancement de la commande QR.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'brew-coffee',
    name: 'Brew & Co.',
    category: 'coffee-shop',
    image: 'https://picsum.photos/seed/brew-coffee/900/700',
    gallery: [
      'https://picsum.photos/seed/brew-coffee-1/1200/800',
      'https://picsum.photos/seed/brew-coffee-2/1200/800',
      'https://picsum.photos/seed/brew-coffee-3/1200/800',
    ],
    shortDescription: 'Branding complet, menus et site web pour une chaîne de cafés spécialisés.',
    description:
      "Brew & Co. ouvrait sa troisième adresse et avait besoin d'une identité cohérente sur les menus, la signalétique et le site.",
    technologies: ['Branding', 'React', 'Design print'],
    challenges: 'Garder une identité cohérente sur trois espaces physiques très différents.',
    solutions: 'Un système de marque flexible avec des règles claires pour signalétique, print et digital.',
    results: 'Déploiement de la nouvelle identité sur tous les points de vente en six semaines.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'atlas-print-suite',
    name: 'Atlas Print Suite',
    category: 'graphic-design',
    image: 'https://picsum.photos/seed/atlas-print/900/700',
    gallery: [
      'https://picsum.photos/seed/atlas-print-1/1200/800',
      'https://picsum.photos/seed/atlas-print-2/1200/800',
      'https://picsum.photos/seed/atlas-print-3/1200/800',
    ],
    shortDescription: 'Cartes de visite, flyers et packaging pour une marque lifestyle.',
    description: 'Une gamme complète de supports print pensée pour se démarquer en rayon comme dans la main.',
    technologies: ['Illustrator', 'InDesign', 'Production print'],
    challenges: 'Concevoir un packaging visible en rayon avec un budget serré.',
    solutions: 'Un packaging typographique fort combiné à une impression économique en une seule couleur.',
    results: 'La refonte du packaging a généré +15% de conversion en rayon.',
  },
  {
    id: 'pulse-fitness',
    name: 'Pulse Fitness App',
    category: 'web-apps',
    image: 'https://picsum.photos/seed/pulse-fitness/900/700',
    gallery: [
      'https://picsum.photos/seed/pulse-fitness-1/1200/800',
      'https://picsum.photos/seed/pulse-fitness-2/1200/800',
      'https://picsum.photos/seed/pulse-fitness-3/1200/800',
    ],
    shortDescription: "Plateforme de réservation et d'abonnement pour une chaîne de salles de sport.",
    description:
      "Pulse avait besoin d'un système de réservation gérant les créneaux de cours, les abonnements et les paiements sur plusieurs salles.",
    technologies: ['React', 'TypeScript', 'Stripe', 'Node.js'],
    challenges: 'Disponibilité des cours en temps réel avec des pics de demande imprévisibles.',
    solutions: "Un parcours de réservation en UI optimiste appuyé sur un système de file d'attente.",
    results: 'Zéro double-réservation enregistrée durant la première année.',
    liveUrl: 'https://example.com',
  },
  {
    id: 'meridian-identity',
    name: 'Meridian Legal',
    category: 'branding',
    image: 'https://picsum.photos/seed/meridian-legal/900/700',
    gallery: [
      'https://picsum.photos/seed/meridian-legal-1/1200/800',
      'https://picsum.photos/seed/meridian-legal-2/1200/800',
      'https://picsum.photos/seed/meridian-legal-3/1200/800',
    ],
    shortDescription: "Identité corporate et site web pour un cabinet d'avocats.",
    description:
      "Meridian voulait moderniser son image tout en conservant le sérieux attendu d'un cabinet juridique.",
    technologies: ['Branding', 'React', 'Figma'],
    challenges: 'Moderniser une marque traditionnelle sans déstabiliser les clients historiques.',
    solutions: 'Une identité serif raffinée associée à une présence digitale sobre et contemporaine.',
    results: 'La refonte de marque a été un facteur clé dans la signature de deux grands comptes.',
    liveUrl: 'https://example.com',
  },
]

export const portfolioFilters = [
  'all',
  'websites',
  'restaurant',
  'coffee-shop',
  'cafe-resto',
  'wedding',
] as const
