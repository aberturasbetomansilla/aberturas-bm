"use client"

import { Button } from '@/components/ui/button'
import type { Totals } from '@/app/dashboard/page'

type Props = {
  totals: Totals
  onPrint: () => void
  onSave: () => Promise<void> | void
}

export function Resultado({ totals, onPrint, onSave }: Props) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md dark:bg-black/20">
        <div className="grid grid-cols-3 gap-3 text-center">
          <KPI title="Subtotal" value={formatCurrency(totals.subtotal)} />
          <KPI title="IVA (21%)" value={formatCurrency(totals.iva)} />
          <KPI title="Total estimado" value={formatCurrency(totals.total)} emphasize />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="w-full sm:w-auto" onClick={onPrint}>Imprimir / Exportar</Button>
        <Button className="w-full sm:w-auto" onClick={() => void onSave()}>Guardar presupuesto</Button>
      </div>
    </div>
  )
}

function KPI({ title, value, emphasize = false }: { title: string; value: string; emphasize?: boolean }) {
  return (
    <div className="rounded-lg bg-background/40 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className={emphasize ? 'mt-1 text-xl font-semibold' : 'mt-1 text-lg font-medium'}>{value}</div>
    </div>
  )
}

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
  } catch {
    return `$${n.toFixed(0)}`
  }
}


