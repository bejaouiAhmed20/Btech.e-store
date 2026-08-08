import { z } from 'zod'

/**
 * Base fields collected for every order, guest or authenticated.
 * Password fields are added conditionally via `.superRefine` below so that
 * a guest order never requires a password.
 */
const baseOrderFields = {
  customerName: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(80, 'Le nom est trop long'),
  customerEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email("Veuillez saisir une adresse e-mail valide"),
  customerPhone: z
    .string()
    .trim()
    .min(8, 'Veuillez saisir un numéro de téléphone valide')
    .max(20, 'Veuillez saisir un numéro de téléphone valide')
    .regex(/^[+\d\s()-]+$/, 'Le numéro de téléphone ne doit contenir que des chiffres et symboles usuels'),
  customizationDetails: z
    .string()
    .trim()
    .max(2000, 'Merci de limiter votre message à 2000 caractères')
    .optional()
    .or(z.literal('')),
  createAccount: z.boolean(),
  password: z.string().optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}

export const orderFormSchema = z
  .object(baseOrderFields)
  .superRefine((values, ctx) => {
    if (!values.createAccount) return

    if (!values.password || values.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'Le mot de passe doit contenir au moins 8 caractères',
      })
    }

    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Les mots de passe ne correspondent pas',
      })
    }
  })

export type OrderFormSchema = z.infer<typeof orderFormSchema>

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Veuillez saisir une adresse e-mail valide'),
  password: z.string().min(1, 'Veuillez saisir votre mot de passe'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().toLowerCase().email('Veuillez saisir une adresse e-mail valide'),
})

export type RequestPasswordResetSchema = z.infer<typeof requestPasswordResetSchema>

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Les mots de passe ne correspondent pas',
      })
    }
  })

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
