"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { productos } from "@/lib/productos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { motion } from "framer-motion"

const categorias = [
  { value: "all", label: "Todos" },
  { value: "ventanas", label: "Ventanas" },
  { value: "puertas", label: "Puertas" },
  { value: "frentes", label: "Frentes" },
  { value: "accesorios", label: "Accesorios" },
]

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = productos.filter((producto) => {
    const matchesSearch =
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || producto.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">Productos Estándar</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nuestra línea de productos listos para comprar con precios predefinidos
        </p>
      </div>

      {/* Filters */}
      <div className="glass-strong rounded-2xl p-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categorias.map((categoria) => (
              <Button
                key={categoria.value}
                variant={selectedCategory === categoria.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(categoria.value)}
                className={selectedCategory === categoria.value ? "bg-primary" : "glass bg-transparent"}
              >
                {categoria.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">No se encontraron productos</h3>
          <p className="text-muted-foreground">Intenta con otros términos de búsqueda o filtros</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/productos/${producto.id}`}>
                <div className="glass-strong rounded-2xl overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={producto.imagen || "/placeholder.svg"}
                      alt={producto.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {producto.categoria}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">{producto.nombre}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{producto.descripcion}</p>
                    {producto.medidas && <p className="text-sm text-aluminum mb-3">Medidas: {producto.medidas}</p>}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">
                        ${producto.precio.toLocaleString("es-AR")}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary-dark">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
