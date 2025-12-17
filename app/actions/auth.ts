'use server'

import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'

export type AuthState = {
  error?: string
}

export async function register(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState | void> {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/login')
}

export async function login(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState | void> {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.toLowerCase().includes('confirm')) {
      return { error: 'Email belum dikonfirmasi. Silakan cek email Anda.' }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
