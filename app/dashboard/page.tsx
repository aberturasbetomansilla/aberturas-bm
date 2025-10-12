"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Formulario } from '@/components/presupuestos/Formulario'
import { Resumen } from '@/components/presupuestos/Resumen'
import { Resultado } from '@/components/presupuestos/Resultado'

export default function PresupuestosPage() {
  const [budgetData, setBudgetData] = useState<BudgetData>(getInitialBudget())

  // Simulated calculation based on baseCost and marginPercent only
  const totals = useMemo(() => calculateTotals(budgetData.baseCost, budgetData.marginPercent), [budgetData.baseCost, budgetData.marginPercent])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Generador de Presupuestos | Aberturas BM</h1>
          <Button asChild variant="outline">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-white/10 bg-white/5 backdrop-blur-lg dark:bg-black/20">
            <CardHeader>
              <CardTitle>Datos y Configuración</CardTitle>
            </CardHeader>
            <CardContent>
              <Formulario value={budgetData} onChange={setBudgetData} />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="border-white/10 bg-white/5 backdrop-blur-lg dark:bg-black/20">
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
              </CardHeader>
              <CardContent>
                <Resultado totals={totals} onPrint={() => window.print()} onSave={async () => {
                  // TODO: conectar con API para guardar presupuesto
                  // await saveBudgetToAPI(budgetData)
                  alert('Guardado simulado. (TODO: conectar con API)')
                }} />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-lg dark:bg-black/20">
              <CardHeader>
                <CardTitle>Resumen del Presupuesto</CardTitle>
              </CardHeader>
              <CardContent>
                <Resumen value={budgetData} totals={totals} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Types ---
export type BudgetData = {
  // Cliente
  customerName: string
  customerContact: string
  siteAddress: string
  // Abertura
  openingType: OpeningType
  line: AluminumLine
  widthCm: number | ''
  heightCm: number | ''
  quantity: number | ''
  glassType: GlassType
  color: AluminumColor
  accessories: string[]
  // Cálculo simulado
  baseCost: number | ''
  marginPercent: number | ''
}

export type OpeningType = 'Ventana corrediza' | 'Puerta balcón' | 'Ventana proyectante' | 'Frente vidriado' | 'Mosquitero'
export type AluminumLine = 'Módena' | 'A30' | 'Herrero'
export type GlassType = 'Simple' | 'DVH' | 'Laminado' | 'Esmerilado'
export type AluminumColor = 'Blanco' | 'Anodizado' | 'Negro' | 'Gris grafito'

export type Totals = {
  subtotal: number
  iva: number
  total: number
}

function getInitialBudget(): BudgetData {
  return {
    customerName: '',
    customerContact: '',
    siteAddress: '',
    openingType: 'Ventana corrediza',
    line: 'Módena',
    widthCm: '',
    heightCm: '',
    quantity: 1,
    glassType: 'Simple',
    color: 'Blanco',
    accessories: [],
    baseCost: '',
    marginPercent: 30,
  }
}

export function calculateTotals(baseCostInput: number | '', marginPercentInput: number | ''): Totals {
  const base = Number(baseCostInput) || 0
  const margin = (Number(marginPercentInput) || 0) / 100
  const subtotal = Math.max(0, base + base * margin)
  const iva = subtotal * 0.21
  const total = subtotal + iva
  return { subtotal, iva, total }
}

// TODO: función preparada para futura integración con API
async function saveBudgetToAPI(_data: BudgetData) {
  // Implementar POST a `/api/presupuestos` en el futuro
}


