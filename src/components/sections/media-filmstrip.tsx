"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { galleryImages } from "@/data/gallery"
import { cn } from "@/lib/utils"

interface MediaFilmstripProps {
  className?: string
}

/** Tile heights in px. Keep in step with the h-40 / md:h-52 classes below. */
const TILE_HEIGHT = { mobile: 160, desktop: 208 }

/**
 * Decorative full-bleed filmstrip — two continuously scrolling rows of event
 * photography running in opposite directions, tilted a hair for editorial
 * energy. Pure CSS marquee (same technique as the client marquee), pauses on
 * hover, honors reduced motion. Purely visual texture: the same media appears
 * with full alt text in the gallery, so this whole band is aria-hidden.
 *
 * The rows are added in the browser as the band nears the viewport. They hold 52
 * <img> tags with no search value, which used to be most of the page's HTML.
 */
export function MediaFilmstrip({ className }: MediaFilmstripProps) {
  const ref = useRef<HTMLElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShow(true)
        observer.disconnect()
      },
      { rootMargin: "400px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const rowA = galleryImages
  const rowB = [...galleryImages].reverse()

  return (
    <section
      ref={ref}
      aria-hidden
      className={cn(
        "relative overflow-hidden border-y border-champagne/10 bg-ink py-12 md:py-16",
        className
      )}
    >
      <div className="-mx-[3%] min-h-[336px] rotate-[-1.4deg] space-y-4 md:min-h-[436px] md:space-y-5">
        {show ? (
          <>
            <FilmstripRow images={rowA} duration="74s" />
            <FilmstripRow images={rowB} duration="92s" reverse />
          </>
        ) : null}
      </div>
    </section>
  )
}

function FilmstripRow({
  images,
  duration,
  reverse = false,
}: {
  images: typeof galleryImages
  duration: string
  reverse?: boolean
}) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <FilmstripTrack images={images} duration={duration} reverse={reverse} />
      <FilmstripTrack images={images} duration={duration} reverse={reverse} />
    </div>
  )
}

function FilmstripTrack({
  images,
  duration,
  reverse,
}: {
  images: typeof galleryImages
  duration: string
  reverse: boolean
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5",
        // reduced-motion is handled globally: globals.css forces animation-duration
        // to 0.01ms with !important, which also neutralizes this inline animation.
        "group-hover:[animation-play-state:paused]"
      )}
      style={{
        animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration} linear infinite`,
      }}
    >
      {images.map((img) => {
        const ratio = img.width / img.height
        return (
          <div
            key={img.src}
            className="relative h-40 shrink-0 overflow-hidden rounded-sm ring-1 ring-ivory/10 md:h-52"
            style={{ aspectRatio: `${img.width} / ${img.height}` }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes={`(min-width: 768px) ${Math.round(TILE_HEIGHT.desktop * ratio)}px, ${Math.round(TILE_HEIGHT.mobile * ratio)}px`}
              quality={50}
              className="object-cover saturate-[.35] brightness-[.9] transition-[filter] duration-700 hover:saturate-100 hover:brightness-100"
            />
            {/* warm wash to keep the strip ambient rather than loud */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/40 via-transparent to-ink/50 mix-blend-multiply" />
          </div>
        )
      })}
    </div>
  )
}
