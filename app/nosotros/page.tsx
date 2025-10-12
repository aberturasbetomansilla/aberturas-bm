"use client"

import Image from "next/image"
import { Award, Users, Clock, Target } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: Award,
    title: "Calidad Profesional",
    description:
      "Utilizamos materiales de primera calidad y técnicas de fabricación precisas para garantizar durabilidad.",
  },
  {
    icon: Users,
    title: "Equipo Experimentado",
    description: "Más de 20 años de experiencia en carpintería de aluminio respaldan cada proyecto que realizamos.",
  },
  {
    icon: Clock,
    title: "Cumplimiento de Plazos",
    description: "Respetamos los tiempos acordados y mantenemos comunicación constante durante todo el proceso.",
  },
  {
    icon: Target,
    title: "Soluciones a Medida",
    description: "Cada proyecto es único. Adaptamos nuestros productos a tus necesidades específicas.",
  },
]

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-sans font-bold mb-6">Sobre BM Carpintería</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Más de dos décadas transformando espacios con aberturas de aluminio de calidad profesional
        </p>
      </motion.div>

      {/* Story */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 lg:h-auto rounded-3xl overflow-hidden"
        >
          <Image src="/aluminum-workshop-craftsman.jpg" alt="Taller BM" fill className="object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">Nuestra Historia</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              BM Carpintería de Aluminio nació hace más de 20 años con una visión clara: ofrecer aberturas de aluminio
              de la más alta calidad, combinando artesanía tradicional con tecnología moderna.
            </p>
            <p>
              Comenzamos como un pequeño taller familiar y, gracias a la confianza de nuestros clientes y nuestro
              compromiso con la excelencia, hemos crecido hasta convertirnos en un referente en la fabricación e
              instalación de aberturas de aluminio.
            </p>
            <p>
              Hoy, seguimos manteniendo los mismos valores que nos fundaron: atención personalizada, calidad sin
              compromisos y respeto por los tiempos de cada proyecto.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">Nuestros Valores</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Los principios que guían cada proyecto que realizamos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-strong rounded-2xl p-6 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-sans font-bold mb-6">Nuestro Equipo</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Contamos con un equipo de profesionales especializados en diseño, fabricación e instalación de aberturas de
          aluminio. Cada miembro aporta su experiencia y dedicación para garantizar resultados excepcionales.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image src="/aluminum-craftsman-measuring.jpg" alt="Equipo BM" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image src="/aluminum-installation-team.jpg" alt="Equipo BM" fill className="object-cover" />
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image src="/aluminum-workshop-team.jpg" alt="Equipo BM" fill className="object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
