import type { Metadata } from "next"

import { QRDashboard } from "@/components/admin/qr-dashboard"
import { getSupabaseEnv } from "@/lib/supabase/env"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { QRCode } from "@/lib/types/qr"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Gestión de QR | Aberturas BM",
  robots: { index: false, follow: false },
}

export default async function AdminQrPage() {
  if (!getSupabaseEnv().isConfigured) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="glass-strong mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold">Supabase no está configurado</h1>
          <p className="text-muted-foreground">
            Agregá las variables de entorno en Vercel o en tu archivo .env.local
            para administrar los QR.
          </p>
        </div>
      </div>
    )
  }

  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from("qr_codes")
    .select("*")
    .order("code", { ascending: true })

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="glass-strong mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold">No se pudieron cargar los QR</h1>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  return <QRDashboard initialCodes={(data ?? []) as QRCode[]} />
}
