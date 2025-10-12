"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "María González",
    role: "Cliente Residencial",
    content:
      "Excelente trabajo. Las ventanas quedaron perfectas y la instalación fue impecable. Muy profesionales en todo momento.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Arquitecto",
    content:
      "Trabajo con BM en varios proyectos. Siempre cumplen con los tiempos y la calidad es excepcional. Muy recomendables.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    role: "Propietaria de Local",
    content:
      "El frente de mi local quedó hermoso. Me asesoraron en todo y el resultado superó mis expectativas. Gracias BM!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-sans font-bold mb-4">Lo Que Dicen Nuestros Clientes</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          La satisfacción de nuestros clientes es nuestra mejor carta de presentación
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
            <div>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
