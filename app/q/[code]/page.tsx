import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { QRStatusPage } from "@/components/qr/qr-status-page"
import { normalizeQrCode } from "@/lib/qr"
import { getSupabaseEnv } from "@/lib/supabase/env"
import { createPublicSupabaseClient } from "@/lib/supabase/public"

export const dynamic = "force-dynamic"
export const revalidate = 0

type QRPageProps = {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: QRPageProps): Promise<Metadata> {
  const { code } = await params
  return {
    title: `${normalizeQrCode(code)} | Aberturas BM`,
    robots: { index: false, follow: false },
  }
}

export default async function PublicQRPage({ params }: QRPageProps) {
  const { code: rawCode } = await params
  const code = normalizeQrCode(rawCode)

  if (!getSupabaseEnv().isConfigured) {
    return <QRStatusPage kind="unavailable" code={code} />
  }

  const lookup = await findQrCode(code)

  if (lookup.kind === "error") {
    return <QRStatusPage kind="unavailable" code={code} />
  }

  if (lookup.kind === "missing") {
    return <QRStatusPage kind="not-found" code={code} />
  }

  const qr = lookup.qr

  if (qr.status === "available") {
    return <QRStatusPage kind="available" code={qr.code} />
  }

  if (qr.status === "inactive") {
    return <QRStatusPage kind="inactive" code={qr.code} />
  }

  if (qr.status === "active" && qr.destination_url) {
    redirect(qr.destination_url)
  }

  return <QRStatusPage kind="available" code={qr.code} />
}

async function findQrCode(code: string) {
  try {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from("qr_codes")
      .select("code, status, destination_url")
      .eq("code", code)
      .maybeSingle()

    if (error) {
      return { kind: "error" as const }
    }

    if (!data) {
      return { kind: "missing" as const }
    }

    return { kind: "found" as const, qr: data }
  } catch {
    return { kind: "error" as const }
  }
}
