"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type MediaItem = {
  id: string
  type: "image" | "video"
  src: string
  alt?: string
  title?: string
  category?: string
}

const media: MediaItem[] = [
  { id: "1", type: "image", src: "/modern-aluminum-windows-residential-building.jpg", title: "Residencial", category: "Ventanas" },
  { id: "2", type: "image", src: "/modern-aluminum-storefront.jpg", title: "Frente Comercial", category: "Frentes" },
  { id: "3", type: "image", src: "/luxury-aluminum-doors-entrance.jpg", title: "Puertas Premium", category: "Puertas" },
  // Ejemplo de video (reemplazar src con tu MP4/URL)
  // { id: "4", type: "video", src: "/videos/instalacion-ventanas.mp4", title: "Instalación", category: "Proceso" },
]

export default function ProyectosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-sans font-bold mb-4">Proyectos Realizados</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Galería de trabajos: imágenes y videos de nuestras instalaciones y frentes
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass-strong rounded-2xl overflow-hidden group"
          >
            {item.type === "image" ? (
              <div className="relative aspect-[4/3]">
                <Image src={item.src} alt={item.alt || item.title || "Proyecto"} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ) : (
              <div className="relative aspect-[4/3] bg-black">
                <video controls preload="metadata" className="w-full h-full object-cover">
                  <source src={item.src} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="p-4">
              {item.category && (
                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-block mb-2">
                  {item.category}
                </div>
              )}
              {item.title && <h3 className="text-lg font-semibold">{item.title}</h3>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


