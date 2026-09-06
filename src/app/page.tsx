import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { MediaFilmstrip } from "@/components/sections/media-filmstrip"
import { Services } from "@/components/sections/services"
import { ClientMarquee } from "@/components/sections/client-marquee"
import { HighlightsCarousel } from "@/components/sections/highlights-carousel"
import { MarqueeBand } from "@/components/sections/marquee-band"
import { Gallery } from "@/components/sections/gallery"
import { InstagramBand } from "@/components/sections/instagram-band"
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
        <MediaFilmstrip />
        <Services />
        <ClientMarquee />
        <HighlightsCarousel />
        <MarqueeBand />
        <Gallery />
        <InstagramBand />
        {siteConfig.features.enableTestimonials ? <Testimonials /> : null}
        {siteConfig.features.enableMixes ? <Mixes /> : null}
        <About />
        <MarqueeBand reverse />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
