import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(6, 'Please enter a valid phone number')
    .max(20, 'Please enter a valid phone number'),
  company: z.string().trim().max(100).optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().trim().min(10, 'Please provide a few more details').max(2000),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
