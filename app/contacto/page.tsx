"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    content: "+54 9 11 1234-5678",
    link: "tel:+5491112345678",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@aberturabm.com",
    link: "mailto:info@aberturabm.com",
  },
  {
    icon: MapPin,
    title: "Dirección",
    content: "Buenos Aires, Argentina",
    link: "#",
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun - Vie: 8:00 - 18:00\nSáb: 9:00 - 13:00",
    link: "#",
  },
]

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with API to send contact message
    console.log("Contact form:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ nombre: "", email: "", mensaje: "" })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-sans font-bold mb-6">Contactanos</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Estamos aquí para responder tus consultas y ayudarte con tu proyecto
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-sans font-bold mb-6">Información de Contacto</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Comunicate con nosotros por cualquiera de estos medios. Respondemos todas las consultas en el menor tiempo
              posible.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow block"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{info.content}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
              onClick={() => window.open("https://wa.me/5491112345678", "_blank")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contactar por WhatsApp
            </Button>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 md:p-12"
        >
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-sans font-bold mb-2">Mensaje Enviado</h3>
              <p className="text-muted-foreground">Te responderemos a la brevedad. Gracias por contactarnos.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-sans font-bold mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    placeholder="Tu nombre"
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
                    placeholder="tu@email.com"
                    className="bg-white/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje *</Label>
                  <Textarea
                    id="mensaje"
                    required
                    value={formData.mensaje}
                    onChange={(e) => handleChange("mensaje", e.target.value)}
                    placeholder="Escribe tu consulta aquí..."
                    rows={6}
                    className="bg-white/50 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-dark text-white">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensaje
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl overflow-hidden"
      >
        <div className="relative h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.50804877493!2d-58.51520919999999!3d-34.6156625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación BM Carpintería"
          />
        </div>
      </motion.div>
    </div>
  )
}
