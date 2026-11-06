"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AmbientVideoProps {
  /** MP4 source. */
  src: string
  /** Optional smaller MP4 for phone-width screens. */
  mobileSrc?: string
  className?: string
  /** Wait for the window load event, so the video never competes with first paint. */
  deferUntilLoad?: boolean
}

type ConnectionHint = { saveData?: boolean; effectiveType?: string }

function shouldSkipVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  const { connection } = navigator as Navigator & { connection?: ConnectionHint }
  return Boolean(connection?.saveData) || /2g|3g/.test(connection?.effectiveType ?? "")
}

/**
 * Silent decorative loop that costs nothing until it is needed. It downloads only
 * when near the viewport, pauses when off screen, and stays invisible until it is
 * really playing. Put a poster <Image> underneath: visitors with reduced motion,
 * Save-Data or a slow connection simply keep seeing that image.
 */
export function AmbientVideo({ src, mobileSrc, className, deferUntilLoad = false }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || shouldSkipVideo()) return

    // React sets `muted` as a property, not an attribute, and browsers only allow
    // autoplay when muted, so make sure of it before the first play().
    video.muted = true

    let armed = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause()
          return
        }
        if (!armed) {
          armed = true
          const isPhone = window.matchMedia("(max-width: 767px)").matches
          video.src = isPhone && mobileSrc ? mobileSrc : src
        }
        // Rejected when the browser blocks autoplay. The poster stays in place.
        video.play().catch(() => undefined)
      },
      { rootMargin: "200px" }
    )

    const start = () => observer.observe(video)
    if (deferUntilLoad && document.readyState !== "complete") {
      window.addEventListener("load", start, { once: true })
    } else {
      start()
    }

    return () => {
      window.removeEventListener("load", start)
      observer.disconnect()
    }
  }, [src, mobileSrc, deferUntilLoad])

  return (
    <video
      ref={ref}
      className={cn(className, !playing && "opacity-0")}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
    />
  )
}
