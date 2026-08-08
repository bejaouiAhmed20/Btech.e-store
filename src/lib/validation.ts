import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(80),
  email: z.string().trim().email('Veuillez saisir une adresse e-mail valide'),
  phone: z
    .string()
    .trim()
    .min(6, 'Veuillez saisir un numéro de téléphone valide')
    .max(20, 'Veuillez saisir un numéro de téléphone valide'),
  company: z.string().trim().max(100).optional().or(z.literal('')),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  budget: z.string().min(1, 'Veuillez sélectionner une fourchette de budget'),
  message: z.string().trim().min(10, 'Merci de fournir un peu plus de détails').max(2000),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
