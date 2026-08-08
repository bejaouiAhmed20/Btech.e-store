import type { Session, User } from '@supabase/supabase-js'

export interface CustomerProfile {
  id: string
  fullName: string | null
  phone: string | null
}

export interface SignUpInput {
  email: string
  password: string
  fullName: string
  phone: string
}

export interface SignUpResult {
  /** True when Supabase returned an active session (no email confirmation required). */
  hasSession: boolean
}

export interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (input: SignUpInput) => Promise<SignUpResult>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
