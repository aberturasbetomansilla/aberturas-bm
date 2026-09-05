import type { Metadata } from "next"
import { QrCode } from "lucide-react"

import { AdminLoginForm } from "@/components/admin/login-form"
import { getSupabaseEnv } from "@/lib/supabase/env"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Ingreso al panel QR | Aberturas BM",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  const { isConfigured } = getSupabaseEnv()

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="glass-strong w-full max-w-md rounded-3xl p-8 md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <QrCode className="h-7 w-7 text-primary" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-aluminum">
            Aberturas BM
          </p>
          <h1 className="text-3xl font-bold">Panel de QR</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ingresá con tu cuenta de administrador para gestionar las placas.
          </p>
        </div>

        {!isConfigured ? (
          <p className="mb-6 rounded-xl bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            Configurá <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para habilitar el acceso.
          </p>
        ) : null}

        <AdminLoginForm isConfigured={isConfigured} />
      </div>
    </div>
  )
}
