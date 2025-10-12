"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { motion } from "framer-motion"

export function CallToAction() {
  return (
    <section className="container mx-auto px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0, 51, 255) 1px, transparent 0)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6">¿Listo para tu proyecto?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y recibe un presupuesto personalizado sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg">
                Solicitar Presupuesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="glass px-8 py-6 text-lg bg-transparent">
                <Phone className="mr-2 h-5 w-5" />
                Contactar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
