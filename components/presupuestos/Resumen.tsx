"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BudgetData, Totals } from '@/app/dashboard/page'

type Props = {
  value: BudgetData
  totals: Totals
}

export function Resumen({ value, totals }: Props) {
  return (
    <div className="space-y-4 text-sm">
      <Section title="Cliente">
        <DL>
          <DT>Nombre</DT><DD>{value.customerName || '-'}</DD>
          <DT>Contacto</DT><DD className="break-all">{value.customerContact || '-'}</DD>
          <DT>Obra / dirección</DT><DD className="break-words">{value.siteAddress || '-'}</DD>
        </DL>
      </Section>

      <Section title="Abertura">
        <DL>
          <DT>Tipo</DT><DD><Badge variant="secondary">{value.openingType}</Badge></DD>
          <DT>Línea</DT><DD><Badge variant="outline">{value.line}</Badge></DD>
          <DT>Medidas</DT><DD>{`${value.widthCm || 0} x ${value.heightCm || 0} cm`}</DD>
          <DT>Cantidad</DT><DD>{`${value.quantity || 0}`}</DD>
          <DT>Vidrio</DT><DD><Badge>{value.glassType}</Badge></DD>
          <DT>Color</DT><DD><Badge variant="secondary">{value.color}</Badge></DD>
          <DT>Accesorios</DT>
          <DD>
            {value.accessories.length ? (
              <div className="flex flex-wrap gap-1.5">
                {value.accessories.map((a) => (
                  <Badge key={a} variant="outline">{a}</Badge>
                ))}
              </div>
            ) : (
              '-'
            )}
          </DD>
        </DL>
      </Section>

      <Section title="Cálculo (simulado)">
        <DL>
          <DT>Costo base</DT><DD>{formatCurrency(Number(value.baseCost) || 0)}</DD>
          <DT>Margen</DT><DD>{`${Number(value.marginPercent) || 0}%`}</DD>
          <DT>Subtotal</DT><DD>{formatCurrency(totals.subtotal)}</DD>
          <DT>IVA (21%)</DT><DD>{formatCurrency(totals.iva)}</DD>
          <DT>Total</DT><DD className="font-semibold">{formatCurrency(totals.total)}</DD>
        </DL>
      </Section>

      <Card className="print:hidden border-white/10 bg-white/5 backdrop-blur-md dark:bg-black/20">
        <CardContent className="py-4 text-muted-foreground text-xs">
          Este resumen es una simulación para uso interno. No reemplaza un presupuesto formal.
        </CardContent>
      </Card>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md dark:bg-black/20">
      <CardContent className="py-4">
        <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
        {children}
      </CardContent>
    </Card>
  )
}

function DL({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[140px_1fr] items-start gap-x-4 gap-y-2 md:grid-cols-[180px_1fr]">{children}</div>
}

function DT({ children }: { children: React.ReactNode }) {
  return <div className="text-muted-foreground">{children}</div>
}

function DD({ children, className = '' as string }: { children: React.ReactNode; className?: string }) {
  return <div className={`min-w-0 ${className}`}>{children}</div>
}

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
  } catch {
    return `$${n.toFixed(0)}`
  }
}


