import { createBrowserClient } from "@supabase/ssr"

import { getSupabaseEnv } from "@/lib/supabase/env"
import type { Database } from "@/lib/types/qr"

export function createBrowserSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseEnv()

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase no está configurado")
  }

  return createBrowserClient<Database>(url, anonKey)
}
