"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { AmbientVideo } from "@/components/ui/ambient-video"
import {
  gallery,
  GALLERY_FILTERS,
  type GalleryCategory,
  type GalleryTile,
} from "@/data/gallery"
import { HIGHLIGHT_LABELS } from "@/data/highlights"
import { cn } from "@/lib/utils"

type Filter = GalleryCategory | "all"

const TILE_SIZES = "(min-width: 1320px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

const TILE_MEDIA_CLASSES = cn(
  // Duotone-ish default via saturation + warm tint; restored on hover/focus.
  "saturate-[.15] brightness-[.85] contrast-[1.05]",
  "group-hover:saturate-100 group-hover:brightness-100",
  "group-focus-within:saturate-100 group-focus-within:brightness-100",
  "group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
)

/**
 * Masonry gallery with duotone-default → full color on hover/focus, mixed
 * image + silent-loop video tiles, category filters, and a keyboard-friendly
 * lightbox. Uses CSS `column-count` masonry (no JS layout math).
 */
export function GalleryBrowser() {
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
    <>
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
      <div
        key={filter}
        className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance] animate-[fade-in_0.4s_ease]"
      >
        {tiles.map((tile, i) => (
          <GalleryTileView key={tile.src} tile={tile} index={i} onOpen={() => openLightbox(i)} />
        ))}
      </div>

      {lightbox !== null && tiles[lightbox] ? (
        <Lightbox tiles={tiles} index={lightbox} onClose={closeLightbox} onNav={navLightbox} />
      ) : null}
    </>
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
  // Alternate drift direction per tile so the grid feels alive, not uniform.
  const drift = { "--drift": index % 2 === 0 ? "-14px" : "14px" } as CSSProperties

  const aspect = `${tile.width} / ${tile.height}`

  return (
    <Reveal amount={0.15} delay={(index % 3) * 0.08} className="mb-5 break-inside-avoid">
      <figure
        style={drift}
        className={cn(
          "tile-drift group relative overflow-hidden rounded-sm bg-ivory/5",
          "ring-1 ring-ivory/5 transition-[box-shadow,ring] duration-500 hover:ring-champagne/40"
        )}
      >
        <div className="relative w-full" style={{ aspectRatio: aspect }}>
          {tile.type === "image" ? (
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={TILE_SIZES}
              quality={60}
              className={cn("object-cover transition-[filter,transform] duration-[900ms] ease-out", TILE_MEDIA_CLASSES)}
            />
          ) : (
            <>
              {tile.poster ? (
                <Image
                  src={tile.poster}
                  alt={tile.alt}
                  fill
                  sizes={TILE_SIZES}
                  quality={60}
                  className={cn("object-cover transition-[filter,transform] duration-[900ms] ease-out", TILE_MEDIA_CLASSES)}
                />
              ) : null}
              <AmbientVideo
                src={tile.src}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-[filter,transform,opacity] duration-[900ms] ease-out",
                  TILE_MEDIA_CLASSES
                )}
              />
            </>
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
      </figure>
    </Reveal>
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tile.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-10 animate-[fade-in_0.3s_ease]"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col animate-[zoom-in_0.35s_var(--ease-reveal)]"
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
              loading="eager"
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
      </div>
    </div>
  )
}
