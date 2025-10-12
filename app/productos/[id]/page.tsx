"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { productos } from "@/lib/productos"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { ShoppingCart, ArrowLeft, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const producto = productos.find((p) => p.id === Number.parseInt(resolvedParams.id))
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  if (!producto) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Related products (same category, excluding current)
  const relatedProducts = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/productos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Productos
        </Button>
      </Link>

      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          <div className="relative aspect-square">
            <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 self-start">
            {producto.categoria}
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">{producto.nombre}</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{producto.descripcion}</p>

          {producto.medidas && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Medidas</h3>
              <p className="text-muted-foreground">{producto.medidas}</p>
            </div>
          )}

          {producto.caracteristicas && producto.caracteristicas.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Características</h3>
              <ul className="space-y-3">
                {producto.caracteristicas.map((caracteristica, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{caracteristica}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Precio</div>
                <div className="text-4xl font-bold text-primary">${producto.precio.toLocaleString("es-AR")}</div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary-dark text-white py-6 text-lg"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Agregado al Carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al Carrito
                </>
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center mt-4">
              Envío e instalación disponibles. Consultar en el carrito.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-sans font-bold mb-8">Productos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/productos/${related.id}`}>
                <div className="glass-strong rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={related.imagen || "/placeholder.svg"}
                      alt={related.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{related.nombre}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{related.descripcion}</p>
                    <div className="text-xl font-bold text-primary">${related.precio.toLocaleString("es-AR")}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
