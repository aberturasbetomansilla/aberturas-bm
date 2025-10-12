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
  description?: string
}

const media: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "/ventiluz.webp",
    title: "Ventiluz",
    category: "Interior",
    description: "Ventiluz de aluminio a medida para baños y cocinas. Aporta ventilación controlada y luminosidad."
  },
  {
    id: "2",
    type: "image",
    src: "/frentedelocales.webp",
    title: "Frente Comercial",
    category: "Frentes",
    description: "Frente vidriado de alta resistencia, ideal para locales comerciales con perfilería de línea comercial."
  },
  {
    id: "3",
    type: "image",
    src: "/postigo.webp",
    title: "Postigos",
    category: "Ventanas",
    description: "Postigos de aluminio con terminación premium para control solar y seguridad."
  },
  {
    id: "4",
    type: "image",
    src: "/puertasparanichos.webp",
    title: "Puertas para nichos",
    category: "Puertas",
    description: "Puertas de aluminio para nichos y placares, corredizas o batientes, optimizadas para espacios reducidos."
  },
  {
    id: "5",
    type: "image",
    src: "/ventanas.webp",
    title: "Ventanas",
    category: "Ventanas",
    description: "Ventanas de aluminio a medida con distintos sistemas de apertura según la necesidad del proyecto."
  },
  {
    id: "6",
    type: "image",
    src: "/ventanascorredizas.webp",
    title: "Ventanas Corredizas",
    category: "Ventanas / puerta",
    description: "Sistema corredizo suave y hermético para optimizar el espacio y facilitar el mantenimiento."
  },
  {
    id: "7",
    type: "image",
    src: "/vestidores.webp",
    title: "Vestidores",
    category: "Interior",
    description: "Frentes de placard y vestidores en aluminio con paneles a elección para una estética moderna."
  },
  {
    id: "8",
    type: "image",
    src: "/puertasdeingreso.webp",
    title: "Puertas de Ingresos",
    category: "Puertas",
    description: "Puertas de ingreso robustas con cerraduras de seguridad y acabados de alta durabilidad."
  },
  {
    id: "9",
    type: "image",
    src: "/cerramientodequinchos.webp",
    title: "Cerramiento de Quinchos",
    category: "Ventanas / puerta",
    description: "Cerramientos integrales en aluminio y vidrio para espacios semicubiertos, mejorando confort y protección."
  },
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
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


