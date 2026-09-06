"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { testimonials } from "@/data/testimonials"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Testimonial carousel — autoplaying Embla loop, ready for the day Victor's
 * real quotes land in data/testimonials.ts. Still gated behind
 * siteConfig.features.enableTestimonials until then.
 */
export function Testimonials() {
  const reduced = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onReInit = () => {
      setSnaps(emblaApi.scrollSnapList())
      onSelect()
    }
    onReInit()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onReInit)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onReInit)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !reduced) return
    emblaApi.plugins().autoplay?.stop()
  }, [emblaApi, reduced])

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <Section id="testimonials" tone="ink-soft">
      <Reveal className="max-w-3xl">
        <EyebrowLabel className="mb-4">Word from the room</EyebrowLabel>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory">
          <em className="font-light italic text-champagne">&ldquo;</em> He ran the room. We kept booking him back.{" "}
          <em className="font-light italic text-champagne">&rdquo;</em>
        </h2>
      </Reveal>

      <div className="mt-16 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="relative mr-6 min-w-0 flex-[0_0_100%] rounded-sm border border-ivory/8 bg-ivory/[0.02] p-8 md:flex-[0_0_48%] md:p-10 lg:flex-[0_0_31.5%]"
            >
              <span
                aria-hidden
                className="absolute -top-6 left-8 font-display text-7xl leading-none text-champagne/70"
              >
                &ldquo;
              </span>
              <blockquote className="leading-relaxed text-ivory/80">{t.quote}</blockquote>
              <figcaption className="mt-8 space-y-1">
                <p className="font-display text-base text-ivory">{t.name}</p>
                <p className="text-xs text-ivory/50">
                  {t.role} · <span className="text-champagne/80">{t.venue}</span>
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === selected ? "w-10 bg-champagne" : "w-5 bg-ivory/15 hover:bg-ivory/30"
            )}
          />
        ))}
      </div>
    </Section>
  )
}
