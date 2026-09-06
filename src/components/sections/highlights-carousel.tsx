"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import {
  highlights,
  HIGHLIGHT_ACCENTS,
  HIGHLIGHT_LABELS,
  type Highlight,
} from "@/data/highlights"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Highlight reel — autoplaying, draggable Embla carousel of the big rooms.
 * Autoplay pauses on hover and stops entirely under reduced motion; the
 * carousel stays fully draggable/clickable either way.
 */
export function HighlightsCarousel() {
  const reduced = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true }),
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

  // Reduced motion: kill autoplay but keep manual control.
  useEffect(() => {
    if (!emblaApi || !reduced) return
    emblaApi.plugins().autoplay?.stop()
  }, [emblaApi, reduced])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <Section id="highlights" tone="ink-soft" container={false} className="py-28 lg:py-36">
      <div className="mx-auto mb-12 flex w-full max-w-[1320px] flex-wrap items-end justify-between gap-6 px-6 md:px-10 lg:px-14">
        <Reveal>
          <EyebrowLabel className="mb-4">Highlight reel</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory"
          >
            Big rooms. Small hours. <em className="font-light italic text-champagne">Full floors.</em>
          </TextMaskReveal>
        </Reveal>
        <div className="flex items-center gap-6">
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/50 sm:block">
            Drag · or let it ride
          </p>
          <div className="flex items-center gap-3">
            <CarouselArrow direction="prev" onClick={scrollPrev} />
            <CarouselArrow direction="next" onClick={scrollNext} />
          </div>
        </div>
      </div>

      {/* Full-bleed track, padded so the first slide aligns with the container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y pl-6 md:pl-10 lg:pl-[max(3.5rem,calc((100vw-1320px)/2+3.5rem))]">
          {highlights.map((h, i) => (
            <HighlightCard key={h.title} highlight={h} index={i} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[1320px] items-center gap-2 px-6 md:px-10 lg:px-14">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to highlight ${i + 1}`}
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

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: () => void
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous highlight" : "Next highlight"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne"
    >
      <Icon size={18} strokeWidth={1.5} />
    </button>
  )
}

function HighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const accent = HIGHLIGHT_ACCENTS[highlight.category]
  return (
    <article className="min-w-0 flex-[0_0_82%] pr-5 sm:flex-[0_0_56%] lg:flex-[0_0_36%]">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-ivory/8 transition-shadow duration-500 hover:ring-champagne/40">
        {highlight.media.type === "image" ? (
          <Image
            src={highlight.media.src}
            alt={highlight.media.alt}
            fill
            sizes="(min-width: 1024px) 36vw, (min-width: 640px) 56vw, 82vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            src={highlight.media.src}
            poster={highlight.media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={highlight.media.alt}
          />
        )}

        {/* scrims */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/20" />

        {/* category chip */}
        <div
          className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ink/60 px-3 py-1.5 backdrop-blur-md"
          style={{ boxShadow: `0 0 24px -8px ${accent}` }}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory">
            {HIGHLIGHT_LABELS[highlight.category]}
          </span>
        </div>

        {/* index */}
        <span
          aria-hidden
          className="absolute right-5 top-4 font-display text-2xl italic text-ivory/30"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* caption */}
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="font-display text-2xl leading-tight text-ivory md:text-[1.7rem]">
            {highlight.title}
          </h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/60">
            {highlight.detail}
          </p>
        </div>
      </div>
    </article>
  )
}
