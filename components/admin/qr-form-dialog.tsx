"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { configureQrCode, updateQrCode } from "@/app/admin/qr/actions"
import { getQrPublicUrl } from "@/lib/qr"
import type { QRCode, QRStatus } from "@/lib/types/qr"
import { qrConfigureSchema, qrEditSchema } from "@/lib/validations/qr"

type QRFormDialogProps = {
  qr: QRCode | null
  mode: "configure" | "edit"
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (message: string) => void
}

export function QRFormDialog({
  qr,
  mode,
  open,
  onOpenChange,
  onSuccess,
}: QRFormDialogProps) {
  const router = useRouter()
  const [businessName, setBusinessName] = useState("")
  const [destinationUrl, setDestinationUrl] = useState("")
  const [status, setStatus] = useState<QRStatus>("active")
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!qr) {
      return
    }

    setBusinessName(qr.business_name ?? "")
    setDestinationUrl(qr.destination_url ?? "")
    setStatus(mode === "configure" ? "active" : qr.status)
    setError(null)
  }, [qr, mode, open])

  if (!qr) {
    return null
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!qr) {
      return
    }

    setError(null)

    const payload = {
      business_name: businessName,
      destination_url: destinationUrl,
      status,
    }

    const parsed =
      mode === "configure"
        ? qrConfigureSchema.safeParse(payload)
        : qrEditSchema.safeParse(payload)

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisá los datos ingresados")
      return
    }

    setIsSaving(true)

    const result =
      mode === "configure"
        ? await configureQrCode(qr.id, {
            business_name: payload.business_name,
            destination_url: payload.destination_url,
          })
        : await updateQrCode(qr.id, payload)

    setIsSaving(false)

    if (!result.success) {
      setError(result.error ?? "No se pudo guardar")
      return
    }

    onSuccess(
      mode === "configure"
        ? `${qr.code} quedó configurado y activo.`
        : `${qr.code} se actualizó correctamente.`,
    )
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "configure" ? "Configurar QR" : "Editar QR"}
          </DialogTitle>
          <DialogDescription>
            El código físico no cambia. Solo se actualiza el destino de{" "}
            <span className="font-semibold text-foreground">{qr.code}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="qr-code">Código QR</Label>
            <Input id="qr-code" value={qr.code} readOnly className="bg-muted" />
            <p className="text-xs text-muted-foreground">{getQrPublicUrl(qr.code)}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-name">Nombre del negocio</Label>
            <Input
              id="business-name"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              placeholder="Panadería El Sol"
              className="bg-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination-url">URL de destino</Label>
            <Input
              id="destination-url"
              type="url"
              value={destinationUrl}
              onChange={(event) => setDestinationUrl(event.target.value)}
              placeholder="https://maps.google.com/..."
              className="bg-white/50"
            />
            <p className="text-xs text-muted-foreground">
              Pegá aquí el enlace de Google Maps del negocio. También acepta
              WhatsApp, Instagram u otra URL HTTPS.
            </p>
          </div>

          {mode === "edit" ? (
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as QRStatus)}>
                <SelectTrigger id="status" className="w-full bg-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-white hover:bg-primary-dark sm:w-auto"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Guardar configuración
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
