import type { QRCode, QRStatus, QRStatusFilter } from "@/lib/types/qr"

export const QR_PUBLIC_BASE_PATH = "/q"

export const QR_STATUS_LABELS: Record<QRStatus, string> = {
  available: "Disponible",
  active: "Activo",
  inactive: "Inactivo",
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  return configured || "https://aberturas-bm.vercel.app"
}

export function getQrPublicUrl(code: string): string {
  return `${getSiteUrl()}${QR_PUBLIC_BASE_PATH}/${code}`
}

export function normalizeQrCode(code: string): string {
  return code.trim().toUpperCase()
}

export function getQrStats(codes: QRCode[]) {
  return {
    total: codes.length,
    available: codes.filter((item) => item.status === "available").length,
    active: codes.filter((item) => item.status === "active").length,
    inactive: codes.filter((item) => item.status === "inactive").length,
  }
}

export function filterQrCodes(
  codes: QRCode[],
  filter: QRStatusFilter,
  query: string,
): QRCode[] {
  const normalizedQuery = query.trim().toLowerCase()

  return codes.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter
    if (!matchesFilter) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const haystack = `${item.code} ${item.business_name ?? ""}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}
