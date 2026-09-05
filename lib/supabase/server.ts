import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

import { getSupabaseEnv } from "@/lib/supabase/env"
import type { Database } from "@/lib/types/qr"

export async function createServerSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseEnv()

  if (!isConfigured || !url || !anonKey) {
    throw new Error("Supabase no está configurado")
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Server Components cannot write cookies; middleware refreshes the session.
        }
      },
    },
  })
}
