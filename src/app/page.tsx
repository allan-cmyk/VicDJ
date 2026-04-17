import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { ClientMarquee } from "@/components/sections/client-marquee"
import { MarqueeBand } from "@/components/sections/marquee-band"
import { Gallery } from "@/components/sections/gallery"
import { Testimonials } from "@/components/sections/testimonials"
import { Mixes } from "@/components/sections/mixes"
import { About } from "@/components/sections/about"
import { Booking } from "@/components/sections/booking"
import { siteConfig } from "@/lib/site-config"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <ClientMarquee />
        <MarqueeBand />
        <Gallery />
        {siteConfig.features.enableTestimonials ? <Testimonials /> : null}
        {siteConfig.features.enableMixes ? <Mixes /> : null}
        <About />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
