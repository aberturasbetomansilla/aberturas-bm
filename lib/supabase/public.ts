import { createClient } from "@supabase/supabase-js"

import { getSupabaseEnv } from "@/lib/supabase/env"
import type { Database } from "@/lib/types/qr"

export function createPublicSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseEnv()

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase no está configurado")
  }

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
