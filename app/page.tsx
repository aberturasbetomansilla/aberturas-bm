import { Hero } from "@/components/home/hero"
import { Services } from "@/components/home/services"
import { FeaturedProducts } from "@/components/home/featured-products"
import { WorkGallery } from "@/components/home/work-gallery"
import { Testimonials } from "@/components/home/testimonials"
import { CallToAction } from "@/components/home/call-to-action"

export default function HomePage() {
  return (
    <div className="space-y-20">
      <Hero />
      <Services />
      <FeaturedProducts />
      <WorkGallery />
      <Testimonials />
      <CallToAction />
    </div>
  )
}