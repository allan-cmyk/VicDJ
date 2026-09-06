import Image from "next/image"
import { galleryImages } from "@/data/gallery"
import { cn } from "@/lib/utils"

interface MediaFilmstripProps {
  className?: string
}

/**
 * Decorative full-bleed filmstrip — two continuously scrolling rows of event
 * photography running in opposite directions, tilted a hair for editorial
 * energy. Pure CSS marquee (same technique as the client marquee), pauses on
 * hover, honors reduced motion. Purely visual texture: the same media appears
 * with full alt text in the gallery, so this whole band is aria-hidden.
 */
export function MediaFilmstrip({ className }: MediaFilmstripProps) {
  const rowA = galleryImages
  const rowB = [...galleryImages].reverse()

  return (
    <section
      aria-hidden
      className={cn(
        "relative overflow-hidden border-y border-champagne/10 bg-ink py-12 md:py-16",
        className
      )}
    >
      <div className="-mx-[3%] rotate-[-1.4deg] space-y-4 md:space-y-5">
        <FilmstripRow images={rowA} duration="74s" />
        <FilmstripRow images={rowB} duration="92s" reverse />
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
      {images.map((img) => (
        <div
          key={img.src}
          className="relative h-40 shrink-0 overflow-hidden rounded-sm ring-1 ring-ivory/10 md:h-52"
          style={{ aspectRatio: `${img.width} / ${img.height}` }}
        >
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 768px) 340px, 260px"
            className="object-cover saturate-[.35] brightness-[.9] transition-[filter] duration-700 hover:saturate-100 hover:brightness-100"
          />
          {/* warm wash to keep the strip ambient rather than loud */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/40 via-transparent to-ink/50 mix-blend-multiply" />
        </div>
      ))}
    </div>
  )
}
