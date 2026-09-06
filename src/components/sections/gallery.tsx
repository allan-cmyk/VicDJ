"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import {
  gallery,
  GALLERY_FILTERS,
  type GalleryCategory,
  type GalleryTile,
} from "@/data/gallery"
import { HIGHLIGHT_LABELS } from "@/data/highlights"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { EASING } from "@/lib/motion-config"
import { cn } from "@/lib/utils"

type Filter = GalleryCategory | "all"

/**
 * Masonry gallery with duotone-default → full color on hover/focus, mixed
 * image + silent-loop video tiles, category filters, and a keyboard-friendly
 * lightbox. Uses CSS `column-count` masonry (no JS layout math).
 */
export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const tiles = filter === "all" ? gallery : gallery.filter((t) => t.category === filter)

  const countFor = (value: Filter) =>
    value === "all" ? gallery.length : gallery.filter((t) => t.category === value).length

  const openLightbox = useCallback((index: number) => {
    lastTrigger.current = document.activeElement as HTMLElement | null
    setLightbox(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    lastTrigger.current?.focus?.()
  }, [])

  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightbox((i) => (i === null ? i : (i + dir + tiles.length) % tiles.length))
    },
    [tiles.length]
  )

  return (
    <Section id="gallery" tone="ink">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <EyebrowLabel className="mb-4">Behind the decks</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory"
          >
            Rooms lit, floors moving, <em className="font-light italic text-champagne">moments made.</em>
          </TextMaskReveal>
        </Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/50">
          Tap a tile to see it big
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-12 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter gallery by category">
        {GALLERY_FILTERS.map((f) => {
          const active = filter === f.value
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                active
                  ? "border-champagne bg-champagne text-ink"
                  : "border-ivory/15 text-ivory/60 hover:border-ivory/35 hover:text-ivory"
              )}
            >
              {f.label}
              <span className={cn("text-[9px]", active ? "text-ink/60" : "text-ivory/35")}>
                {countFor(f.value)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Masonry — keyed by filter so tiles re-stagger in on every switch */}
      <motion.div
        key={filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASING.smooth }}
        className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]"
      >
        {tiles.map((tile, i) => (
          <GalleryTileView key={tile.src} tile={tile} index={i} onOpen={() => openLightbox(i)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {lightbox !== null && tiles[lightbox] ? (
          <Lightbox
            tiles={tiles}
            index={lightbox}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  )
}

function GalleryTileView({
  tile,
  index,
  onOpen,
}: {
  tile: GalleryTile
  index: number
  onOpen: () => void
}) {
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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: (index % 3) * 0.08 }}
      className="mb-5 break-inside-avoid"
    >
      <motion.figure
        style={reduced ? undefined : { y }}
        className={cn(
          "group relative overflow-hidden rounded-sm bg-ivory/5",
          "ring-1 ring-ivory/5 transition-[box-shadow,ring] duration-500 hover:ring-champagne/40"
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
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />

          {tile.type === "video" ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-ink/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-champagne backdrop-blur-sm">
              <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-champagne" />
              Reel
            </span>
          ) : null}

          {/* expand hint */}
          <span
            aria-hidden
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 bg-ink/50 text-ivory/80 opacity-0 backdrop-blur-sm transition-opacity duration-400 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <Maximize2 size={13} strokeWidth={1.6} />
          </span>

          {tile.caption ? (
            <figcaption className="absolute bottom-4 left-5 right-5 translate-y-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/85 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              {tile.caption}
            </figcaption>
          ) : null}

          {/* click target — kept as a real button for keyboard + SR users */}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Expand — ${tile.caption ?? tile.alt}`}
            className="absolute inset-0 z-10 cursor-zoom-in focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-inset"
          />
        </div>
      </motion.figure>
    </motion.div>
  )
}

function Lightbox({
  tiles,
  index,
  onClose,
  onNav,
}: {
  tiles: readonly GalleryTile[]
  index: number
  onClose: () => void
  onNav: (dir: 1 | -1) => void
}) {
  const tile = tiles[index]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNav(1)
      if (e.key === "ArrowLeft") onNav(-1)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onNav])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={tile.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASING.reveal }}
        className="relative flex w-full max-w-5xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[68svh] w-full md:h-[76svh]">
          {tile.type === "image" ? (
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          ) : (
            <video
              key={tile.src}
              className="h-full w-full object-contain"
              src={tile.src}
              poster={tile.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={tile.alt}
            />
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            {tile.caption ? (
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.24em] text-ivory/85">
                {tile.caption}
              </p>
            ) : null}
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/45">
              {HIGHLIGHT_LABELS[tile.category]} · {String(index + 1).padStart(2, "0")} /{" "}
              {String(tiles.length).padStart(2, "0")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => onNav(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNav(1)}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-2 right-0 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-champagne/60 hover:text-champagne"
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  )
}
