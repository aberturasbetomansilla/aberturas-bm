"use client"

import { useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AluminumColor, AluminumLine, BudgetData, GlassType, OpeningType } from '@/app/dashboard/page'

type Props = {
  value: BudgetData
  onChange: (next: BudgetData) => void
}

export function Formulario({ value, onChange }: Props) {
  const setField = useCallback(
    <K extends keyof BudgetData>(key: K, val: BudgetData[K]) => {
      onChange({ ...value, [key]: val })
    },
    [onChange, value],
  )

  const toggleAccessory = useCallback(
    (name: string, checked: boolean) => {
      const list = new Set(value.accessories)
      if (checked) list.add(name)
      else list.delete(name)
      onChange({ ...value, accessories: Array.from(list) })
    },
    [onChange, value],
  )

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5 backdrop-blur-md dark:bg-black/20">
        <CardHeader>
          <CardTitle>Datos del cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm">Nombre del cliente</label>
              <Input value={value.customerName} onChange={(e) => setField('customerName', e.target.value)} placeholder="Ej. Juan Pérez" />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Teléfono / Email</label>
              <Input value={value.customerContact} onChange={(e) => setField('customerContact', e.target.value)} placeholder="Ej. 11 5555 5555 / cliente@mail.com" />
            </div>
            <div className="space-y-1 md:col-span-1">
              <label className="text-sm">Obra / dirección (opcional)</label>
              <Input value={value.siteAddress} onChange={(e) => setField('siteAddress', e.target.value)} placeholder="Ej. Calle 123, CABA" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md dark:bg-black/20">
        <CardHeader>
          <CardTitle>Datos de la abertura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm">Tipo de abertura</label>
              <Select value={value.openingType} onValueChange={(v) => setField('openingType', v as OpeningType)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ventana corrediza">Ventana corrediza</SelectItem>
                  <SelectItem value="Puerta balcón">Puerta balcón</SelectItem>
                  <SelectItem value="Ventana proyectante">Ventana proyectante</SelectItem>
                  <SelectItem value="Frente vidriado">Frente vidriado</SelectItem>
                  <SelectItem value="Mosquitero">Mosquitero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm">Línea de aluminio</label>
              <Select value={value.line} onValueChange={(v) => setField('line', v as AluminumLine)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Módena">Módena</SelectItem>
                  <SelectItem value="A30">A30</SelectItem>
                  <SelectItem value="Herrero">Herrero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm">Tipo de vidrio</label>
              <Select value={value.glassType} onValueChange={(v) => setField('glassType', v as GlassType)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Simple">Simple</SelectItem>
                  <SelectItem value="DVH">DVH</SelectItem>
                  <SelectItem value="Laminado">Laminado</SelectItem>
                  <SelectItem value="Esmerilado">Esmerilado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <div className="space-y-1">
              <label className="text-sm">Ancho (cm)</label>
              <Input inputMode="numeric" value={value.widthCm} onChange={(e) => setField('widthCm', e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 120" />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Alto (cm)</label>
              <Input inputMode="numeric" value={value.heightCm} onChange={(e) => setField('heightCm', e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 100" />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Cantidad</label>
              <Input inputMode="numeric" value={value.quantity} onChange={(e) => setField('quantity', e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 1" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-4">
            <div className="space-y-1">
              <label className="text-sm">Color del aluminio</label>
              <Select value={value.color} onValueChange={(v) => setField('color', v as AluminumColor)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blanco">Blanco</SelectItem>
                  <SelectItem value="Anodizado">Anodizado</SelectItem>
                  <SelectItem value="Negro">Negro</SelectItem>
                  <SelectItem value="Gris grafito">Gris grafito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <div className="text-sm mb-2">Accesorios adicionales</div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {['Cierre multipunto', 'Cortavientos', 'Cortina', 'Traba seguridad', 'Burlete extra', 'Vidrio templado'].map((acc) => (
                  <label key={acc} className="inline-flex items-center gap-2 text-sm">
                    <Checkbox checked={value.accessories.includes(acc)} onCheckedChange={(c) => toggleAccessory(acc, Boolean(c))} />
                    <span>{acc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md dark:bg-black/20">
        <CardHeader>
          <CardTitle>Cálculo del presupuesto (simulado)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm">Costo base (editable)</label>
              <Input inputMode="numeric" value={value.baseCost} onChange={(e) => setField('baseCost', e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 100000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Margen comercial (%)</label>
              <Input inputMode="numeric" value={value.marginPercent} onChange={(e) => setField('marginPercent', e.target.value === '' ? '' : Number(e.target.value))} placeholder="Ej. 30" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


