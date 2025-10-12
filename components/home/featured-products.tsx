"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { productos } from "@/lib/productos"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturedProducts() {
  const featured = productos.slice(0, 3)

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">Productos Destacados</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nuestra línea de productos estándar listos para comprar
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {featured.map((producto, index) => (
          <motion.div
            key={producto.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/productos/${producto.id}`}>
              <div className="glass-strong rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={producto.imagen || "/placeholder.svg"}
                    alt={producto.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${producto.precio.toLocaleString("es-AR")}</span>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/productos">
          <Button size="lg" variant="outline" className="glass-strong bg-transparent">
            Ver Todos los Productos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
