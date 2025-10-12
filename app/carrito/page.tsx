"use client"

import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="glass-strong rounded-2xl p-12">
            <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-sans font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">Agrega productos para comenzar tu compra</p>
            <Link href="/productos">
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/productos">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Seguir Comprando
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-sans font-bold">Carrito de Compras</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-strong rounded-2xl p-6"
            >
              <div className="flex gap-6">
                {/* Image */}
                <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image src={item.imagen || "/placeholder.svg"} alt={item.nombre} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{item.nombre}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">${item.precio.toLocaleString("es-AR")}</p>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-12 text-center">{item.cantidad}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">${(item.precio * item.cantidad).toLocaleString("es-AR")}</span>
              </div>
            </motion.div>
          ))}

          {/* Clear Cart */}
          <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Vaciar Carrito
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-2xl p-8 sticky top-24">
            <h2 className="text-2xl font-sans font-bold mb-6">Resumen del Pedido</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${total.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-semibold">A calcular</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instalación</span>
                <span className="font-semibold">Opcional</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-bold text-primary">${total.toLocaleString("es-AR")}</span>
              </div>
            </div>

            <Button size="lg" className="w-full bg-primary hover:bg-primary-dark text-white mb-4">
              Finalizar Compra
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              El costo de envío e instalación se calculará según tu ubicación
            </p>

            {/* TODO: Integrate with payment gateway */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                Próximamente: Integración con pasarela de pagos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
