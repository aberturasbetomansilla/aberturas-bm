import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-white/70 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
              <Image
                src="/fotodeperfilweb.png"
                alt="BM Carpintería"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-primary">ABERTURAS BM</div>
                <div className="text-xs text-aluminum uppercase">Carpintería de aluminio</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fabricamos e instalamos aberturas de aluminio a medida con calidad profesional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/productos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/presupuesto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Presupuesto
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+5491112345678" className="hover:text-primary transition-colors">+54 9 11 1234-5678</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@aberturabm.com" className="hover:text-primary transition-colors">info@aberturabm.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="glass p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-10 w-10 text-blue-600" />
              </a>
              <a href="#" aria-label="Instagram" className="glass p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-10 w-10 text-blue-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile layout with accordions */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/fotodeperfilweb.png" alt="BM Carpintería" width={44} height={44} className="rounded-full" />
              <div>
                <div className="font-bold">ABERTURAS BM</div>
                <div className="text-xs text-aluminum uppercase">Carpintería de aluminio</div>
              </div>
            </Link>
            <div className="flex gap-2">
              <a href="#" aria-label="Facebook" className="glass p-2 rounded-full text-blue-600"><Facebook className="h-8 w-8" /></a>
              <a href="#" aria-label="Instagram" className="glass p-2 rounded-full text-blue-600"><Instagram className="h-8 w-8" /></a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Fabricamos e instalamos aberturas de aluminio a medida con calidad profesional.
          </p>

          <Accordion type="multiple" className="divide-y divide-border rounded-xl border border-border bg-white/60">
            <AccordionItem value="links">
              <AccordionTrigger className="px-4">Enlaces Rápidos</AccordionTrigger>
              <AccordionContent className="px-4">
                <ul className="space-y-2">
                  <li><Link href="/productos" className="block py-1 text-sm text-muted-foreground hover:text-primary">Productos</Link></li>
                  <li><Link href="/proyectos" className="block py-1 text-sm text-muted-foreground hover:text-primary">Proyectos</Link></li>
                  <li><Link href="/presupuesto" className="block py-1 text-sm text-muted-foreground hover:text-primary">Presupuesto</Link></li>
                  <li><Link href="/nosotros" className="block py-1 text-sm text-muted-foreground hover:text-primary">Sobre Nosotros</Link></li>
                  <li><Link href="/contacto" className="block py-1 text-sm text-muted-foreground hover:text-primary">Contacto</Link></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contacto">
              <AccordionTrigger className="px-4">Contacto</AccordionTrigger>
              <AccordionContent className="px-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+5491112345678" className="hover:text-primary transition-colors">+54 9 11 1234-5678</a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:info@aberturabm.com" className="hover:text-primary transition-colors">info@aberturabm.com</a>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Buenos Aires, Argentina</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BM Carpintería de Aluminio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
