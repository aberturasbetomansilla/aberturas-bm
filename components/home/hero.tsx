"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Ruler, Wrench } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const heroImages = [
  "/modern-aluminum-windows-residential-building.jpg",
  "/modern-aluminum-storefront.jpg",
  "/luxury-aluminum-doors-entrance.jpg",
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="relative min-h-[75vh] pt-[40px] flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt="Proyectos de aberturas de aluminio"
                fill
                className="object-cover"
                priority={i === 0}
              />
            </motion.div>
          ))}
        </div>
        {/* Light overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/50" />
        {/* Subtle pattern on top */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0, 51, 255, 0.08) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-7xl font-bold text-balance mb-6">
              Fabricamos e instalamos <span className="text-primary">aberturas de aluminio</span> a medida
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-card-foreground italic mb-12 leading-relaxed"
          >
            Con calidad profesional y más de 20 años de experiencia en proyectos residenciales y comerciales
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/presupuesto">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg group cursor-pointer">
                <Ruler className="mr-2 h-5 w-5" />
                Presupuesto Personalizado
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/productos">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg glass-strong bg-transparent cursor-pointer">
                <Wrench className="mr-2 h-5 w-5" />
                Ver Productos Estándar
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Proyectos realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Satisfacción garantizada</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
