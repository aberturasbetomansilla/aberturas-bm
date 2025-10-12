"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const works = [
  {
    title: "Proyecto Residencial",
    image: "/modern-aluminum-windows-residential-building.jpg",
    category: "Ventanas",
  },
  {
    title: "Frente Comercial",
    image: "/modern-aluminum-storefront-commercial-building.jpg",
    category: "Frentes",
  },
  {
    title: "Puertas Premium",
    image: "/luxury-aluminum-doors-entrance.jpg",
    category: "Puertas",
  },
  {
    title: "Obra Nueva",
    image: "/aluminum-windows-construction-site.jpg",
    category: "Construcción",
  },
]

export function WorkGallery() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">Trabajos Realizados</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Proyectos que demuestran nuestra calidad y experiencia
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {works.map((work, index) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={work.image || "/placeholder.svg"}
              alt={work.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-sm font-medium text-primary-light mb-2">{work.category}</div>
              <h3 className="text-2xl font-semibold">{work.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/proyectos"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border glass-strong bg-transparent hover:shadow-md transition-shadow"
        >
          Ver todos los trabajos
        </a>
      </div>
    </section>
  )
}
