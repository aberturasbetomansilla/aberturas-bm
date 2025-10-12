// TODO: Replace with API call to fetch products from database
export interface Producto {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
  categoria: "ventanas" | "puertas" | "frentes" | "accesorios"
  medidas?: string
  caracteristicas?: string[]
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Ventana Corrediza Módena",
    precio: 120000,
    imagen: "/modern-aluminum-sliding-window.jpg",
    descripcion:
      "Ventana corrediza de aluminio línea Módena, ideal para espacios modernos. Sistema de apertura suave y cierre hermético.",
    categoria: "ventanas",
    medidas: "1.20m x 1.00m",
    caracteristicas: ["Aluminio anodizado", "Doble vidrio hermético (DVH)", "Cierre multipunto", "Garantía 5 años"],
  },
  {
    id: 2,
    nombre: "Puerta Balcón A30",
    precio: 210000,
    imagen: "/modern-aluminum-balcony-door.jpg",
    descripcion:
      "Puerta balcón de aluminio línea A30 con doble vidrio hermético. Excelente aislación térmica y acústica.",
    categoria: "puertas",
    medidas: "0.80m x 2.00m",
    caracteristicas: ["Perfil A30", "DVH 4+9+4", "Cerradura de seguridad", "Burletes de EPDM"],
  },
  {
    id: 3,
    nombre: "Mosquitero Fijo",
    precio: 40000,
    imagen: "/aluminum-mosquito-screen.jpg",
    descripcion: "Mosquitero fijo de aluminio con malla de fibra de vidrio. Fácil instalación y mantenimiento.",
    categoria: "accesorios",
    medidas: "A medida",
    caracteristicas: ["Marco de aluminio", "Malla fibra de vidrio", "Resistente a UV", "Fácil limpieza"],
  },
  {
    id: 4,
    nombre: "Ventana Banderola",
    precio: 95000,
    imagen: "/aluminum-awning-window.jpg",
    descripcion:
      "Ventana banderola con apertura superior, perfecta para baños y cocinas. Ventilación sin perder privacidad.",
    categoria: "ventanas",
    medidas: "0.60m x 0.40m",
    caracteristicas: ["Apertura superior", "Vidrio templado", "Brazo de empuje", "Cierre hermético"],
  },
  {
    id: 5,
    nombre: "Puerta Doble Hoja",
    precio: 380000,
    imagen: "/modern-double-aluminum-door.jpg",
    descripcion: "Puerta de doble hoja en aluminio, ideal para accesos principales. Diseño elegante y robusto.",
    categoria: "puertas",
    medidas: "1.60m x 2.10m",
    caracteristicas: ["Doble hoja", "Vidrio laminado", "Cerradura multipunto", "Bisagras reforzadas"],
  },
  {
    id: 6,
    nombre: "Frente Integral",
    precio: 850000,
    imagen: "/modern-aluminum-storefront.jpg",
    descripcion: "Frente integral de aluminio para comercios. Sistema modular adaptable a cualquier medida.",
    categoria: "frentes",
    medidas: "3.00m x 2.50m",
    caracteristicas: [
      "Sistema modular",
      "Vidrio templado 10mm",
      "Puerta de acceso incluida",
      "Instalación profesional",
    ],
  },
  {
    id: 7,
    nombre: "Ventana Proyectante",
    precio: 105000,
    imagen: "/aluminum-casement-window.jpg",
    descripcion: "Ventana proyectante con apertura hacia afuera. Excelente ventilación y protección contra lluvia.",
    categoria: "ventanas",
    medidas: "0.80m x 1.00m",
    caracteristicas: ["Apertura exterior", "Brazo de fricción", "DVH opcional", "Cierre de seguridad"],
  },
  {
    id: 8,
    nombre: "Kit de Herrajes Premium",
    precio: 25000,
    imagen: "/aluminum-window-hardware-kit.jpg",
    descripcion: "Kit completo de herrajes de alta calidad para ventanas y puertas de aluminio.",
    categoria: "accesorios",
    caracteristicas: ["Acero inoxidable", "Rodamientos de precisión", "Cerraduras de seguridad", "Fácil instalación"],
  },
]
