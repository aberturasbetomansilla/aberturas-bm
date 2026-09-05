"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  LogOut,
  PauseCircle,
  Pencil,
  QrCode,
  Search,
  Settings2,
} from "lucide-react"

import { logoutAdmin, setQrStatus } from "@/app/admin/qr/actions"
import { QRFormDialog } from "@/components/admin/qr-form-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { filterQrCodes, getQrPublicUrl, getQrStats, QR_STATUS_LABELS } from "@/lib/qr"
import type { QRCode, QRStatusFilter } from "@/lib/types/qr"

type QRDashboardProps = {
  initialCodes: QRCode[]
}

const FILTERS: { id: QRStatusFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "available", label: "Disponibles" },
  { id: "active", label: "Activos" },
  { id: "inactive", label: "Inactivos" },
]

export function QRDashboard({ initialCodes }: QRDashboardProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<QRStatusFilter>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"configure" | "edit">("configure")
  const [selectedQr, setSelectedQr] = useState<QRCode | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  const stats = useMemo(() => getQrStats(initialCodes), [initialCodes])
  const visibleCodes = useMemo(
    () => filterQrCodes(initialCodes, filter, query),
    [initialCodes, filter, query],
  )

  function openDialog(qr: QRCode, mode: "configure" | "edit") {
    setSelectedQr(qr)
    setDialogMode(mode)
    setDialogOpen(true)
  }

  async function copyText(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 2000)
    } catch {
      setMessage("No se pudo copiar al portapapeles.")
    }
  }

  async function handleDeactivate(qr: QRCode) {
    setPendingId(qr.id)
    const result = await setQrStatus(qr.id, "inactive")
    setPendingId(null)
    setMessage(result.success ? `${qr.code} quedó inactivo.` : result.error ?? "No se pudo desactivar")
    if (result.success) {
      router.refresh()
    }
  }

  async function handleLogout() {
    await logoutAdmin()
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-aluminum">
            Aberturas BM
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Gestión de QR</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Asigná un negocio a cada placa impresa. El código físico no cambia.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="self-start">
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total QR" value={stats.total} />
        <StatCard label="Disponibles" value={stats.available} />
        <StatCard label="Activos" value={stats.active} />
        <StatCard label="Inactivos" value={stats.inactive} />
      </div>

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por código o negocio"
            className="bg-white/70 pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((item) => (
            <Button
              key={item.id}
              type="button"
              variant={filter === item.id ? "default" : "outline"}
              onClick={() => setFilter(item.id)}
              className={filter === item.id ? "bg-primary text-white hover:bg-primary-dark" : ""}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {message ? (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-3 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {message}
        </div>
      ) : null}

      <div className="space-y-4 lg:hidden">
        {visibleCodes.length === 0 ? (
          <EmptyState />
        ) : (
          visibleCodes.map((qr) => (
            <article key={qr.id} className="glass-strong rounded-2xl p-5">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold">{qr.code}</p>
                  <p className="text-sm text-muted-foreground">
                    {qr.business_name || "Sin negocio asignado"}
                  </p>
                </div>
                <StatusBadge status={qr.status} />
              </div>

              <div className="mb-4 space-y-2 text-sm">
                <p className="break-all text-muted-foreground">
                  <span className="font-medium text-foreground">URL QR: </span>
                  {getQrPublicUrl(qr.code)}
                </p>
                {qr.destination_url ? (
                  <p className="break-all text-muted-foreground">
                    <span className="font-medium text-foreground">Destino: </span>
                    {qr.destination_url}
                  </p>
                ) : null}
                <p className="text-muted-foreground">
                  Actualizado: {formatDate(qr.updated_at)}
                </p>
              </div>

              <QRActions
                qr={qr}
                copiedKey={copiedKey}
                pendingId={pendingId}
                onConfigure={() => openDialog(qr, "configure")}
                onEdit={() => openDialog(qr, "edit")}
                onCopyDestination={() =>
                  qr.destination_url
                    ? copyText(`${qr.id}-dest`, qr.destination_url)
                    : undefined
                }
                onDeactivate={() => handleDeactivate(qr)}
              />
            </article>
          ))
        )}
      </div>

      <div className="glass-strong hidden overflow-hidden rounded-2xl lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>QR</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Negocio</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Actualizado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleCodes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <EmptyState />
                </TableCell>
              </TableRow>
            ) : (
              visibleCodes.map((qr) => (
                <TableRow key={qr.id}>
                  <TableCell className="font-semibold">{qr.code}</TableCell>
                  <TableCell>
                    <StatusBadge status={qr.status} />
                  </TableCell>
                  <TableCell>{qr.business_name || "—"}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-xs text-muted-foreground">
                      URL QR: {getQrPublicUrl(qr.code)}
                    </p>
                    {qr.destination_url ? (
                      <p className="truncate text-xs text-muted-foreground">
                        Destino: {qr.destination_url}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Sin destino</p>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(qr.updated_at)}
                  </TableCell>
                  <TableCell>
                    <QRActions
                      qr={qr}
                      copiedKey={copiedKey}
                      pendingId={pendingId}
                      compact
                      onConfigure={() => openDialog(qr, "configure")}
                      onEdit={() => openDialog(qr, "edit")}
                      onCopyDestination={() =>
                        qr.destination_url
                          ? copyText(`${qr.id}-dest`, qr.destination_url)
                          : undefined
                      }
                      onDeactivate={() => handleDeactivate(qr)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <QRFormDialog
        qr={selectedQr}
        mode={dialogMode}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={setMessage}
      />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-strong rounded-2xl p-4 md:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-aluminum">{label}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: QRCode["status"] }) {
  const className =
    status === "active"
      ? "border-transparent bg-primary text-white"
      : status === "inactive"
        ? "border-transparent bg-destructive/10 text-destructive"
        : "border-transparent bg-muted text-muted-foreground"

  return <Badge className={className}>{QR_STATUS_LABELS[status]}</Badge>
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <QrCode className="h-8 w-8 text-aluminum" />
      <p className="font-medium">No hay QR para mostrar</p>
      <p className="text-sm text-muted-foreground">Probá con otro filtro o búsqueda.</p>
    </div>
  )
}

function formatDate(value: string) {
  return format(new Date(value), "dd/MM/yyyy HH:mm", { locale: es })
}

type QRActionsProps = {
  qr: QRCode
  copiedKey: string | null
  pendingId: string | null
  compact?: boolean
  onConfigure: () => void
  onEdit: () => void
  onCopyDestination?: () => void
  onDeactivate: () => void
}

function QRActions({
  qr,
  copiedKey,
  pendingId,
  compact = false,
  onConfigure,
  onEdit,
  onCopyDestination,
  onDeactivate,
}: QRActionsProps) {
  const buttonClass = compact ? "h-8 px-2.5 text-xs" : "w-full sm:w-auto"

  return (
    <div className={compact ? "flex flex-wrap justify-end gap-2" : "grid grid-cols-2 gap-2"}>
      {qr.status === "available" ? (
        <Button
          type="button"
          onClick={onConfigure}
          className={`bg-primary text-white hover:bg-primary-dark ${buttonClass}`}
        >
          <Settings2 className="h-4 w-4" />
          Configurar
        </Button>
      ) : (
        <Button type="button" variant="outline" onClick={onEdit} className={buttonClass}>
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      )}

      <Button asChild variant="outline" className={buttonClass}>
        <a href={`/q/${qr.code}`} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4" />
          Probar QR
        </a>
      </Button>

      {qr.destination_url ? (
        <Button
          type="button"
          variant="outline"
          onClick={onCopyDestination}
          className={buttonClass}
        >
          <Copy className="h-4 w-4" />
          {copiedKey === `${qr.id}-dest` ? "Copiado" : "Copiar URL"}
        </Button>
      ) : null}

      {qr.status === "active" ? (
        <Button
          type="button"
          variant="outline"
          disabled={pendingId === qr.id}
          onClick={onDeactivate}
          className={buttonClass}
        >
          <PauseCircle className="h-4 w-4" />
          Desactivar
        </Button>
      ) : null}
    </div>
  )
}
