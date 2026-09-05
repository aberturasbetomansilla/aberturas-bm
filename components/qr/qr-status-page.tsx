import Link from "next/link"
import { AlertCircle, Clock, QrCode, ShieldOff } from "lucide-react"

import { Button } from "@/components/ui/button"

type QRStatusKind = "not-found" | "available" | "inactive" | "unavailable"

type QRStatusPageProps = {
  kind: QRStatusKind
  code?: string
}

const STATUS_CONTENT: Record<
  QRStatusKind,
  {
    icon: typeof QrCode
    title: string
    description: string
  }
> = {
  "not-found": {
    icon: AlertCircle,
    title: "QR no encontrado",
    description: "Este código no pertenece al sistema de Aberturas BM.",
  },
  available: {
    icon: Clock,
    title: "QR todavía no configurado",
    description:
      "Esta placa ya está impresa, pero el destino todavía no fue asignado. En breve va a redirigir al negocio correspondiente.",
  },
  inactive: {
    icon: ShieldOff,
    title: "QR inactivo",
    description:
      "Este código no se encuentra disponible actualmente. Si creés que se trata de un error, comunicate con Aberturas BM.",
  },
  unavailable: {
    icon: AlertCircle,
    title: "No pudimos verificar este código",
    description:
      "El sistema de QR no está disponible en este momento. Probá de nuevo en unos minutos.",
  },
}

export function QRStatusPage({ kind, code }: QRStatusPageProps) {
  const content = STATUS_CONTENT[kind]
  const Icon = content.icon

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="glass-strong w-full max-w-lg rounded-3xl p-8 text-center md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        {code ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-aluminum">
            {code}
          </p>
        ) : null}
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{content.title}</h1>
        <p className="mb-8 text-muted-foreground leading-relaxed">
          {content.description}
        </p>
        <Button asChild className="bg-primary text-white hover:bg-primary-dark">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
