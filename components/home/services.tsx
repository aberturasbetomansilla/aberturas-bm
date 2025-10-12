"use client"

import { Ruler, Wrench, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Ruler,
    title: "Fabricación a Medida",
    description:
      "Diseñamos y fabricamos aberturas de aluminio personalizadas según tus necesidades exactas. Cada proyecto es único y adaptado a tu espacio.",
  },
  {
    icon: Wrench,
    title: "Instalación Profesional",
    description:
      "Nuestro equipo especializado garantiza una instalación perfecta, con atención al detalle y respeto por los tiempos acordados.",
  },
  {
    icon: MessageSquare,
    title: "Asesoramiento Técnico",
    description:
      "Te guiamos en la elección de materiales, medidas, vidrios y herrajes. Soluciones técnicas para cada proyecto.",
  },
]

export function Services() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">Nuestros Servicios</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Soluciones integrales en carpintería de aluminio para tu hogar o negocio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-strong rounded-2xl p-8 hover:shadow-xl transition-shadow"
          >
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <service.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
