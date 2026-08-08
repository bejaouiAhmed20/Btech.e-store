import { supabase } from '@/lib/supabase'
import type { SignUpInput, SignUpResult } from '@/features/auth/types'

export class AuthServiceError extends Error {}

function mapAuthError(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('already registered') || lower.includes('already exists')) {
    return 'Un compte existe déjà avec cette adresse e-mail. Essayez de vous connecter.'
  }
  if (lower.includes('invalid login credentials')) {
    return 'Adresse e-mail ou mot de passe incorrect.'
  }

  if (lower.includes('rate limit')) {
    return 'Trop de tentatives. Veuillez patienter quelques instants avant de réessayer.'
  }
  if (lower.includes('network')) {
    return 'Problème de connexion réseau. Veuillez réessayer.'
  }
  return 'Une erreur est survenue. Veuillez réessayer.'
}

export async function signUpWithEmail(input: SignUpInput): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        full_name: input.fullName,
        phone: input.phone,
      },
    },
  })

  if (error) {
    console.error('signUp failed:', error.message)
    throw new AuthServiceError(mapAuthError(error.message))
  }

  return { hasSession: Boolean(data.session) }
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.error('signIn failed:', error.message)
    throw new AuthServiceError(mapAuthError(error.message))
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('signOut failed:', error.message)
    throw new AuthServiceError('La déconnexion a échoué. Veuillez réessayer.')
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  if (error) {
    console.error('resetPasswordForEmail failed:', error.message)
    throw new AuthServiceError(mapAuthError(error.message))
  }
}

export async function updatePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    console.error('updateUser failed:', error.message)
    throw new AuthServiceError(mapAuthError(error.message))
  }
}
