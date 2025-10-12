"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Ruler, Upload } from "lucide-react"
import { motion } from "framer-motion"

export default function PresupuestoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoAbertura: "",
    medidas: "",
    descripcion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with API to send quote request
    console.log("Quote request:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoAbertura: "",
        medidas: "",
        descripcion: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-strong rounded-3xl p-12">
            <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-sans font-bold mb-4">Solicitud Enviada</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Gracias por tu interés. Nos pondremos en contacto contigo en las próximas 24 horas para brindarte un
              presupuesto personalizado.
            </p>
            <Button size="lg" onClick={() => setSubmitted(false)} className="bg-primary hover:bg-primary-dark">
              Enviar Otra Solicitud
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Ruler className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">Presupuesto Personalizado</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contanos sobre tu proyecto y te enviaremos un presupuesto detallado sin compromiso
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Juan Pérez"
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="juan@ejemplo.com"
                  className="bg-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                placeholder="+54 9 11 1234-5678"
                className="bg-white/50"
              />
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <Label htmlFor="tipoAbertura">Tipo de Abertura *</Label>
              <Select value={formData.tipoAbertura} onValueChange={(value) => handleChange("tipoAbertura", value)}>
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Selecciona el tipo de abertura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ventana-corrediza">Ventana Corrediza</SelectItem>
                  <SelectItem value="ventana-banderola">Ventana Banderola</SelectItem>
                  <SelectItem value="ventana-proyectante">Ventana Proyectante</SelectItem>
                  <SelectItem value="puerta-balcon">Puerta Balcón</SelectItem>
                  <SelectItem value="puerta-doble">Puerta Doble Hoja</SelectItem>
                  <SelectItem value="frente-integral">Frente Integral</SelectItem>
                  <SelectItem value="mampara">Mampara</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medidas">Medidas Aproximadas</Label>
              <Input
                id="medidas"
                value={formData.medidas}
                onChange={(e) => handleChange("medidas", e.target.value)}
                placeholder="Ej: 1.50m x 1.20m"
                className="bg-white/50"
              />
              <p className="text-sm text-muted-foreground">Si no conoces las medidas exactas, podemos visitarte</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción del Proyecto *</Label>
              <Textarea
                id="descripcion"
                required
                value={formData.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                placeholder="Contanos sobre tu proyecto: ubicación, cantidad de aberturas, características especiales, etc."
                rows={6}
                className="bg-white/50 resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="archivo">Adjuntar Imagen o Plano (Opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer bg-white/30">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Arrastra un archivo o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, PDF hasta 10MB</p>
                <input type="file" id="archivo" className="hidden" accept="image/*,.pdf" />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-dark text-white py-6 text-lg">
              Enviar Solicitud de Presupuesto
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Al enviar este formulario, aceptas que nos pongamos en contacto contigo para brindarte un presupuesto
              personalizado.
            </p>
          </form>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Sin Compromiso</h3>
            <p className="text-sm text-muted-foreground">Presupuesto gratuito y sin obligación de compra</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Respuesta Rápida</h3>
            <p className="text-sm text-muted-foreground">Te contactamos en menos de 24 horas</p>
          </div>
          <div className="text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Asesoramiento Incluido</h3>
            <p className="text-sm text-muted-foreground">Te ayudamos a elegir la mejor solución</p>
          </div>
        </div>
      </div>
    </div>
  )
}
