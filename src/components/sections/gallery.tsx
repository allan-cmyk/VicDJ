"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { gallery, type GalleryTile } from "@/data/gallery"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/**
 * Masonry gallery with duotone-default → full color on hover/focus, mixed
 * image + silent-loop video tiles, and a gentle per-tile parallax drift.
 *
 * Uses CSS `column-count` masonry (works everywhere, no JS layout math).
 */
export function Gallery() {
  return (
    <Section id="gallery" tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <Reveal>
          <EyebrowLabel className="mb-4">Behind the decks</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory max-w-2xl"
          >
            Rooms lit, floors moving, <em className="italic font-light text-champagne">moments made.</em>
          </TextMaskReveal>
        </Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/50">
          Hover a tile to bring it to life
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {gallery.map((tile, i) => (
          <GalleryTileView key={tile.src} tile={tile} index={i} />
        ))}
      </div>
    </Section>
  )
}

function GalleryTileView({ tile, index }: { tile: GalleryTile; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  // Alternate drift direction per tile so the grid feels alive, not uniform.
  const drift = index % 2 === 0 ? -14 : 14
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  const aspect = `${tile.width} / ${tile.height}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: (index % 3) * 0.08 }}
      className="mb-5 break-inside-avoid"
    >
      <motion.figure
        style={reduced ? undefined : { y }}
        className={cn(
          "group relative overflow-hidden rounded-sm bg-ivory/5",
          "ring-1 ring-ivory/5 hover:ring-champagne/40 transition-[box-shadow,ring] duration-500"
        )}
      >
        <div className="relative w-full" style={{ aspectRatio: aspect }}>
          {tile.type === "image" ? (
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={cn(
                "object-cover transition-[filter,transform] duration-[900ms] ease-out",
                // Duotone-ish default via saturation + warm tint; restored on hover/focus.
                "saturate-[.15] brightness-[.85] contrast-[1.05]",
                "group-hover:saturate-100 group-hover:brightness-100",
                "group-focus-within:saturate-100 group-focus-within:brightness-100",
                "group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              )}
            />
          ) : (
            <video
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[900ms] ease-out",
                "saturate-[.15] brightness-[.85] contrast-[1.05]",
                "group-hover:saturate-100 group-hover:brightness-100",
                "group-focus-within:saturate-100 group-focus-within:brightness-100",
                "group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
              )}
              src={tile.src}
              poster={tile.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={tile.alt}
            />
          )}

          {/* warm overlay that lifts on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/55 via-[color:var(--champagne)]/5 to-ink/70 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
          />
          {/* bottom scrim for caption legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />

          {tile.type === "video" ? (
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-ink/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-champagne backdrop-blur-sm">
              <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-champagne" />
              Reel
            </span>
          ) : null}

          {tile.caption ? (
            <figcaption className="absolute bottom-4 left-5 right-5 font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/85 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 ease-out">
              {tile.caption}
            </figcaption>
          ) : null}
        </div>
      </motion.figure>
    </motion.div>
  )
}
